import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { NavBottom } from './NavBottom';
import './AppShell.css';

/**
 * Оболочка: fixed top nav + контент + нижнее меню (Услуги, Подобрать, FAQ, Контакты).
 */
export function AppShell() {
  return (
    <div className="app-shell">
      <Navigation />
      <main className="app-shell__main" role="main">
        <Outlet />
      </main>
      <NavBottom />
    </div>
  );
}
