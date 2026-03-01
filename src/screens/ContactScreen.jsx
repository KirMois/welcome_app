import { useNavigate } from 'react-router-dom';
import {
  PaperAirplaneIcon,
  GlobeAltIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { APP_DATA } from '../data/appData';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import './ContactScreen.css';

export function ContactScreen() {
  const c = APP_DATA.contacts;
  const navigate = useNavigate();

  return (
    <section className="screen contact-screen">
      <h2 className="screen-headline">{c.title}</h2>
      <p className="screen-subheadline">{c.subtitle}</p>

      <div className="contact-about">
        <p>{c.aboutText}</p>
      </div>

      <div className="contact-links">
        <a
          href={c.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          <span className="contact-link__icon-wrap contact-link__icon-wrap--blue">
            <PaperAirplaneIcon className="contact-link__icon" aria-hidden="true" />
          </span>
          <span className="contact-link__label">{c.telegramButton}</span>
          <ArrowRightIcon className="contact-link__arrow" aria-hidden="true" />
        </a>

        <a
          href={c.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          <span className="contact-link__icon-wrap contact-link__icon-wrap--purple">
            <GlobeAltIcon className="contact-link__icon" aria-hidden="true" />
          </span>
          <span className="contact-link__label">{c.websiteLabel}</span>
          <ArrowRightIcon className="contact-link__arrow" aria-hidden="true" />
        </a>
      </div>

      <PrimaryButton type="button" onClick={() => navigate('/lead-form')}>
        {c.ctaLead}
      </PrimaryButton>
    </section>
  );
}
