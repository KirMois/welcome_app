import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { APP_DATA } from '../data/appData';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import './ThankYouScreen.css';

export function ThankYouScreen() {
  const navigate = useNavigate();
  const msg = APP_DATA.leadForm?.thankYouMessage || 'Мы свяжемся с вами в ближайшее время.';
  const backLabel = APP_DATA.leadForm?.backToHome || 'На главную';

  return (
    <section className="screen thank-you-screen">
      <div className="thank-you-card">
        <CheckCircleIcon className="thank-you-card__icon" aria-hidden="true" />
        <h2 className="thank-you-card__headline">Заявка отправлена!</h2>
        <p className="thank-you-card__body">{msg}</p>
        <PrimaryButton type="button" onClick={() => navigate('/')}>
          {backLabel}
        </PrimaryButton>
      </div>
    </section>
  );
}
