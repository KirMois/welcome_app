export const LEAD_CHAT_ID = 675015988; // @yatakoikirill

/**
 * В dev-режиме используется Vite proxy: /api/send-lead → localhost:5000.
 * В prod укажи полный URL в VITE_LEAD_API_URL.
 */
export const LEAD_API_URL = (() => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_LEAD_API_URL) {
    return import.meta.env.VITE_LEAD_API_URL;
  }
  return '/api/send-lead';
})();
