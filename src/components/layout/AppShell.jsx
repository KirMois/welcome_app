import { Outlet } from 'react-router-dom';
import { useRef } from 'react';
import { Navigation } from './Navigation';
import { NavBottom } from './NavBottom';
import { BackFab } from '../ui/BackFab';
import './AppShell.css';

/**
 * Оболочка: fixed top nav + контент + нижнее меню (Услуги, Подобрать, FAQ, Контакты).
 */
export function AppShell() {
  const mainRef = useRef(null);
  return (
    <div className="app-shell">
      <Navigation />
      <main ref={mainRef} className="app-shell__main" role="main">
        <Outlet />
      </main>
      <NavBottom />
      <BackFab scrollContainerRef={mainRef} />
    </div>
  );
}
