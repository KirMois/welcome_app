import { useEffect, useState } from 'react';
import { sendLeadToBackend } from '../services/leadApi';

/**
 * Полная интеграция Telegram WebApp:
 * — expand() / ready() первым делом
 * — все themeParams → CSS-переменные (--tg-*)
 * — данные пользователя (id, username, first_name)
 * — sendLead(formData): backend (chat 675015988) + sendData боту
 */
export function useTelegram() {
  const [themeReady, setThemeReady] = useState(false);
  const [userData, setUserData] = useState({ id: null, username: '', first_name: '' });

  const tg = typeof window !== 'undefined' && window.Telegram?.WebApp
    ? window.Telegram.WebApp
    : null;

  useEffect(() => {
    if (!tg) {
      setThemeReady(true);
      return;
    }

    // Полноэкранный режим — первым делом
    tg.expand();
    tg.ready();

    // Применяем все themeParams как CSS-переменные --tg-*
    const applyTheme = (params) => {
      if (!params) return;
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          const cssKey = `--tg-${key.replace(/_/g, '-')}`;
          document.documentElement.style.setProperty(cssKey, value);
        }
      });
      // Legacy aliases (для обратной совместимости)
      const doc = document.documentElement.style;
      if (params.bg_color) {
        doc.setProperty('--tg-bg-color', params.bg_color);
        doc.setProperty('--tg-theme-bg-color', params.bg_color);
      }
      if (params.text_color) {
        doc.setProperty('--tg-text-color', params.text_color);
        doc.setProperty('--tg-theme-text-color', params.text_color);
      }
      if (params.header_bg_color) doc.setProperty('--tg-header-bg-color', params.header_bg_color);
      const sb = params.section_bg_color || params.bg_color;
      if (sb) doc.setProperty('--tg-section-bg-color', sb);
      if (params.hint_color) doc.setProperty('--tg-subtle-color', params.hint_color);
      if (params.link_color) doc.setProperty('--tg-link-color', params.link_color);
      if (params.button_color) doc.setProperty('--tg-theme-button-color', params.button_color);
      if (params.button_text_color) doc.setProperty('--tg-theme-button-text-color', params.button_text_color);
    };

    applyTheme(tg.themeParams || {});
    setThemeReady(true);

    // Данные пользователя
    const user = tg.initDataUnsafe?.user;
    if (user) {
      setUserData({
        id: user.id ?? null,
        username: user.username ?? '',
        first_name: user.first_name ?? '',
      });
    }

    tg.onEvent('themeChanged', () => applyTheme(tg.themeParams || {}));
    return () => {
      try { tg.offEvent('themeChanged'); } catch (_) {}
    };
  }, [tg]);

  const username = (() => {
    if (!userData.username) return '';
    const u = userData.username;
    return u.startsWith('@') ? u : `@${u}`;
  })();

  const sendData = (payload) => {
    if (tg?.sendData) {
      try { tg.sendData(JSON.stringify(payload)); } catch (_) {}
    }
  };

  const sendLead = async (formData) => {
    const ok = await sendLeadToBackend(formData);
    if (!ok) console.warn('[useTelegram] Backend send failed; trying sendData fallback');
    sendData(formData);
    return ok;
  };

  return {
    tg,
    themeReady,
    userData,
    username,
    sendData,
    sendLead,
    isDark: tg?.colorScheme === 'dark',
  };
}
