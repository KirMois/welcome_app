import { LEAD_API_URL } from '../config';

/**
 * Формирует payload строго по формату Novacode VLC.
 * services — массив строк, description — задача, timestamp — ISO.
 */
export function buildPayload(formData) {
  const services = [];
  if (Array.isArray(formData.need) && formData.need.length) {
    services.push(...formData.need);
  } else if (formData.service) {
    services.push(formData.service);
  }

  return {
    name: formData.name || '',
    username: (formData.username || '').replace(/^@/, ''),
    services,
    budget: formData.budget || formData.stage || '',
    description: formData.task || formData.description || '',
    timestamp: new Date().toISOString(),
    source: formData.source || 'form',
  };
}

/**
 * Отправить заявку на backend → /api/send-lead → Telegram chat 675015988 (@yatakoikirill).
 * Backend строит сообщение и шлёт его через Bot API.
 * @returns {Promise<boolean>}
 */
export async function sendLeadToBackend(formData) {
  const payload = buildPayload(formData);
  const url = LEAD_API_URL;

  console.log('[leadApi] Sending lead to', url, payload);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '1',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('[leadApi] HTTP error', res.status, text);
      return false;
    }

    const data = await res.json().catch(() => ({}));
    console.log('[leadApi] Success:', data);
    return true;
  } catch (e) {
    console.error('[leadApi] Network error:', e);
    return false;
  }
}
