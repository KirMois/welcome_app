import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTelegram } from './hooks/useTelegram';
import { AppShell } from './components/layout/AppShell';
import { HomeScreen } from './screens/HomeScreen';
import { ServicesScreen } from './screens/ServicesScreen';
import { QuizScreen } from './screens/QuizScreen';
import { FAQScreen } from './screens/FAQScreen';
import { ContactScreen } from './screens/ContactScreen';
import { LeadFormScreen } from './screens/LeadFormScreen';
import { ThankYouScreen } from './screens/ThankYouScreen';
import './index.css';

function App() {
  const { isDark } = useTelegram();

  useEffect(() => {
    // Telegram fullscreen — first thing
    window.Telegram?.WebApp?.expand();

    // theme attribute for CSS selectors
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'dark'); // always dark

    // Prevent bounce scroll on iOS inside Telegram
    document.body.style.overscrollBehavior = 'none';
  }, [isDark]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<HomeScreen />} />
          <Route path="services" element={<ServicesScreen />} />
          <Route path="solution-picker" element={<QuizScreen />} />
          <Route path="faq" element={<FAQScreen />} />
          <Route path="contacts" element={<ContactScreen />} />
          <Route path="lead-form" element={<LeadFormScreen />} />
          <Route path="thank-you" element={<ThankYouScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
