import { NavLink, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  BriefcaseIcon,
  SparklesIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  BriefcaseIcon as BriefcaseIconSolid,
  SparklesIcon as SparklesIconSolid,
  QuestionMarkCircleIcon as FAQIconSolid,
  UserCircleIcon as UserIconSolid,
} from '@heroicons/react/24/solid';
import './NavBottom.css';

const TABS = [
  { path: '/',                label: 'Главная',   Icon: HomeIcon,              IconActive: HomeIconSolid,    end: true },
  { path: '/services',        label: 'Услуги',    Icon: BriefcaseIcon,         IconActive: BriefcaseIconSolid },
  { path: '/solution-picker', label: 'Подобрать', Icon: SparklesIcon,          IconActive: SparklesIconSolid },
  { path: '/faq',             label: 'FAQ',        Icon: QuestionMarkCircleIcon, IconActive: FAQIconSolid },
  { path: '/contacts',        label: 'О нас',     Icon: UserCircleIcon,        IconActive: UserIconSolid },
];

export function NavBottom() {
  return (
    <nav className="nav-bottom" role="navigation" aria-label="Разделы">
      {TABS.map(({ path, label, Icon, IconActive, end }) => (
        <NavLink
          key={path}
          to={path}
          end={end}
          className={({ isActive }) =>
            `nav-bottom__tab ${isActive ? 'nav-bottom__tab--active' : ''}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive
                ? <IconActive className="nav-bottom__icon" aria-hidden="true" />
                : <Icon className="nav-bottom__icon" aria-hidden="true" />
              }
              <span className="nav-bottom__label">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
