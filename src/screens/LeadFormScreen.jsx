import { useNavigate, useLocation } from 'react-router-dom';
import { useMemo, useRef, useState } from 'react';
import { APP_DATA, serviceOptions } from '../data/appData';
import { useTelegram } from '../hooks/useTelegram';
import { FormField } from '../components/ui/FormField';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SecondaryButton } from '../components/ui/SecondaryButton';
import { toBackendUsername, validateContactFields } from '../utils/leadValidation';
import './LeadFormScreen.css';

export function LeadFormScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, sendLead } = useTelegram();
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});

  const preselectedService = location.state?.preselectedService || '';
  const L = APP_DATA.leadForm;

  const contactHint = useMemo(
    () => 'Укажите email или Telegram username — достаточно одного контакта.',
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    const fd = new FormData(formRef.current);

    // Payload format matching backend spec exactly
    const serviceVal = fd.get('service') || '';
    const services = serviceVal ? [serviceVal] : [];

    const email = (fd.get('email') || '').toString();
    const telegram = (fd.get('telegram') || '').toString();

    const nextErrors = validateContactFields({ email, telegram });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      const el = formRef.current.querySelector(`[name="${first === 'telegram' ? 'telegram' : 'email'}"]`);
      if (el && typeof el.focus === 'function') el.focus();
      return;
    }

    const payload = {
      source: 'lead_form',
      name: fd.get('name') || '',
      username: toBackendUsername(telegram),
      email: email.trim(),
      services,
      budget: fd.get('contactTime') || '',
      description: fd.get('task') || '',
    };

    await sendLead(payload);
    navigate('/thank-you', { state: { from: 'lead_form' } });
  };

  return (
    <section className="screen lead-form-screen">
      <h2 className="screen-headline">{L.title}</h2>
      {L.helperText && <p className="screen-helper">{L.helperText}</p>}

      <form ref={formRef} onSubmit={handleSubmit} className="lead-form-screen__form">
        <FormField
          label={L.nameLabel}
          name="name"
          placeholder={L.namePlaceholder}
          required
        />
        <FormField
          label={L.emailLabel}
          name="email"
          type="email"
          placeholder={L.emailPlaceholder}
          error={errors.email}
        />
        <FormField
          label={L.usernameLabel}
          name="telegram"
          placeholder={L.usernamePlaceholder}
          defaultValue={username}
          error={errors.telegram}
        />
        <p className="lead-form-screen__hint" aria-live="polite">{contactHint}</p>
        <FormField
          type="textarea"
          label={L.taskLabel}
          name="task"
          placeholder={L.taskPlaceholder}
          rows={L.taskRows}
          required
        />
        <FormField
          type="select"
          label={L.serviceLabel}
          name="service"
          placeholder={L.servicePlaceholder}
          options={serviceOptions}
          defaultValue={preselectedService}
        />
        <div className="form-field form-field--time">
          <span className="form-field__label">{L.contactTimeLabel}</span>
          <div className="form-field__options">
            {L.contactTimeOptions.map((o) => (
              <label key={o.value}>
                <input type="radio" name="contactTime" value={o.value} />
                {o.label}
              </label>
            ))}
          </div>
        </div>
        <PrimaryButton type="submit">{L.submitButton}</PrimaryButton>
      </form>

      <p className="lead-form-screen__back">
        <SecondaryButton as="button" type="button" onClick={() => navigate('/')}>
          {L.backToHome}
        </SecondaryButton>
      </p>
    </section>
  );
}
