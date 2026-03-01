import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_DATA, serviceOptions } from '../data/appData';
import { useTelegram } from '../hooks/useTelegram';
import { QuizStep } from '../components/ui/QuizStep';
import { FormField } from '../components/ui/FormField';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import './QuizScreen.css';

const QUIZ = APP_DATA.solutionPicker;
const TOTAL_STEPS = 4;

export function QuizScreen() {
  const navigate = useNavigate();
  const { username, sendLead } = useTelegram();
  const [step, setStep] = useState(1);
  const formRef = useRef(null);

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    const fd = new FormData(formRef.current);
    const need = formRef.current.querySelectorAll('input[name="quiz_1"]:checked');
    const needArr = Array.from(need).map((el) => el.value);
    const stageEl = formRef.current.querySelector('input[name="quiz_2"]:checked');
    const budgetEl = formRef.current.querySelector('input[name="quiz_3"]:checked');

    // Payload format matching backend spec
    const payload = {
      source: 'quiz',
      name: fd.get('name') || '',
      username: (fd.get('username') || '').replace(/^@/, ''),
      services: needArr.length ? needArr : (fd.get('service') ? [fd.get('service')] : []),
      budget: budgetEl ? budgetEl.value : (stageEl ? stageEl.value : ''),
      description: fd.get('task') || '',
    };

    await sendLead(payload);
    navigate('/thank-you', { state: { from: 'quiz' } });
  };

  const s4 = QUIZ.step4;

  return (
    <section className="screen quiz-screen">
      <h2 className="screen-headline">{QUIZ.title}</h2>

      {step === 1 && (
        <QuizStep
          stepNumber={1}
          totalSteps={TOTAL_STEPS}
          question={QUIZ.step1.question}
          options={QUIZ.step1.options}
          multi={QUIZ.step1.multi}
          name="quiz_1"
          onNext={handleNext}
        />
      )}

      {step === 2 && (
        <QuizStep
          stepNumber={2}
          totalSteps={TOTAL_STEPS}
          question={QUIZ.step2.question}
          options={QUIZ.step2.options}
          multi={QUIZ.step2.multi}
          name="quiz_2"
          onNext={handleNext}
        />
      )}

      {step === 3 && (
        <QuizStep
          stepNumber={3}
          totalSteps={TOTAL_STEPS}
          question={QUIZ.step3.question}
          options={QUIZ.step3.options}
          multi={QUIZ.step3.multi}
          name="quiz_3"
          onNext={handleNext}
        />
      )}

      {step === 4 && (
        <div className="quiz-screen__step4">
          <p className="quiz-screen__progress">Шаг 4 из {TOTAL_STEPS}</p>
          <h3 className="quiz-screen__step4-title">{s4.title}</h3>
          <form ref={formRef} onSubmit={handleSubmit} className="quiz-screen__form">
            <FormField
              label={s4.nameLabel}
              name="name"
              placeholder={s4.namePlaceholder}
              required
            />
            <FormField
              label={s4.usernameLabel}
              name="username"
              placeholder={s4.usernamePlaceholder}
              defaultValue={username}
              required
            />
            <FormField
              type="textarea"
              label={s4.taskLabel}
              name="task"
              placeholder={s4.taskPlaceholder}
              rows={s4.taskRows}
              required
            />
            <FormField
              type="select"
              label={s4.serviceLabel}
              name="service"
              placeholder={s4.servicePlaceholder}
              options={serviceOptions}
            />
            <div className="form-field form-field--time">
              <span className="form-field__label">{s4.contactTimeLabel}</span>
              <div className="form-field__options">
                {s4.contactTimeOptions.map((o) => (
                  <label key={o.value}>
                    <input type="radio" name="contactTime" value={o.value} />
                    {o.label}
                  </label>
                ))}
              </div>
            </div>
            <PrimaryButton type="submit">{s4.submitButton}</PrimaryButton>
          </form>
        </div>
      )}
    </section>
  );
}
