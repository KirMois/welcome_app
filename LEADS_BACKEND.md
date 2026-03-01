# Backend для отправки заявок в Telegram (chat_id 675015988)

Mini App шлёт заявку на ваш backend по адресу `VITE_LEAD_API_URL`. Backend должен принять POST и отправить сообщение в Telegram.

## Контракт

**POST** `VITE_LEAD_API_URL`  
**Body (JSON):**
```json
{
  "chat_id": 675015988,
  "text": "🆕 НОВАЯ ЗАЯВКА\n\n👤 Имя: ...\n🆔 TG: @...\n...",
  "parse_mode": "HTML",
  "formData": { "source", "name", "username", "task", ... }
}
```

Ответ: **200 OK** при успехе.

## Пример (Node.js)

```javascript
// api/send-lead.js (Express или serverless)
const BOT_TOKEN = process.env.BOT_TOKEN;

export async function post(req, res) {
  const { chat_id, text } = req.body;
  if (!BOT_TOKEN || !chat_id || !text) {
    return res.status(400).json({ error: 'Missing chat_id or text' });
  }
  try {
    const r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text, parse_mode: 'HTML' }),
    });
    const data = await r.json();
    if (!data.ok) return res.status(502).json(data);
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Send failed' });
  }
}
```

Токен бота храните только в переменных окружения на сервере. Не используйте его во frontend.
