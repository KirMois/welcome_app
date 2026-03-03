import { useNavigate } from 'react-router-dom';
import {
  SparklesIcon,
  BriefcaseIcon,
  PencilSquareIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  CheckBadgeIcon,
  ClockIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { APP_DATA } from '../data/appData';
import './HomeScreen.css';

const QUICK_ACTIONS = [
  {
    key: 'quiz',
    label: 'Подобрать',
    path: '/solution-picker',
    Icon: SparklesIcon,
    tint: 'purple',
  },
  {
    key: 'services',
    label: 'Услуги',
    path: '/services',
    Icon: BriefcaseIcon,
    tint: 'green',
  },
  {
    key: 'lead',
    label: 'Заявка',
    path: '/lead-form',
    Icon: PencilSquareIcon,
    tint: 'pink',
  },
  {
    key: 'contacts',
    label: 'О нас',
    path: '/contacts',
    Icon: ChatBubbleLeftRightIcon,
    tint: 'orange',
  },
];

const STATS = [
  { Icon: CheckBadgeIcon, value: '7+', label: 'Решений' },
  { Icon: ClockIcon, value: '2ч', label: 'Ответ' },
  { Icon: GlobeAltIcon, value: 'EU', label: 'География' },
];

export function HomeScreen() {
  const h = APP_DATA.home;
  const navigate = useNavigate();

  return (
    <section className="screen home-screen">

      {/* ── Hero card ──────────────────────────────────────── */}
      <div className="hero-card">
        <h1 className="hero-card__headline">{h.headline}</h1>
        <p className="hero-card__sub">{h.subheadline}</p>

        <button
          className="hero-card__cta"
          onClick={() => navigate('/solution-picker')}
        >
          {h.ctaPrimary}
          <ChevronRightIcon className="hero-card__cta-icon" aria-hidden="true" />
        </button>
      </div>

      {/* ── Quick actions (like "Transfer / Top Up / Payment" row) ── */}
      <div className="section-header">
        <span className="section-header__title">Быстрые действия</span>
      </div>
      <div className="quick-actions">
        {QUICK_ACTIONS.map(({ key, label, path, Icon, tint }) => (
          <button
            key={key}
            type="button"
            className={`quick-action quick-action--${tint}`}
            onClick={() => navigate(path)}
          >
            <span className={`quick-action__icon-wrap quick-action__icon-wrap--${tint}`}>
              <Icon className="quick-action__icon" aria-hidden="true" />
            </span>
            <span className="quick-action__label">{label}</span>
          </button>
        ))}
      </div>

      {/* ── Stats row ──────────────────────────────────────── */}
      <div className="stats-row">
        {STATS.map(({ Icon, value, label }) => (
          <div key={label} className="stat-card">
            <Icon className="stat-card__icon" aria-hidden="true" />
            <span className="stat-card__value">{value}</span>
            <span className="stat-card__label">{label}</span>
          </div>
        ))}
      </div>

      <p className="screen-helper home-screen__helper">{h.helperText}</p>
    </section>
  );
}
