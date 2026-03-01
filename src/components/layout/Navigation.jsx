import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Logo } from '../ui/Logo';
import './Navigation.css';

export function Navigation() {
  const navigate = useNavigate();

  return (
    <header className="top-nav" role="banner">
      <div className="top-nav__inner">
        <button
          type="button"
          className="top-nav__logo-btn"
          onClick={() => navigate('/')}
          aria-label="Novacode VLC — На главную"
        >
          <Logo height={34} />
        </button>

        <button
          type="button"
          className="top-nav__cta"
          onClick={() => navigate('/lead-form')}
          aria-label="Оставить заявку"
        >
          <PencilSquareIcon className="top-nav__cta-icon" aria-hidden="true" />
          <span>Заявка</span>
        </button>
      </div>
    </header>
  );
}
