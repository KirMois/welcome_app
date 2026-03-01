# 🚀 Запуск Novacode VLC Mini App

## Структура терминалов (4 вкладки)

### Terminal 1 — Backend (Flask)
```bash
cd "d:\DEVs_projects\Welcome_app VLC"
pip install -r requirements.txt
# Убедись что в .env есть BOT_TOKEN
python main.py
# → http://localhost:5000
# Проверка: http://localhost:5000/health
```

### Terminal 2 — Frontend (Vite)
```bash
cd "d:\DEVs_projects\Welcome_app VLC"
npm install
npm run dev
# → http://localhost:3000
```

### Terminal 3 — ngrok Backend (порт 5000)
```bash
ngrok http 5000
# Скопируй URL вида: https://xxxx.ngrok-free.app
# Вставь в .env: BOT_TOKEN=... (уже есть)
# Backend URL для Frontend: https://xxxx.ngrok-free.app/api/send-lead
```

### Terminal 4 — ngrok Frontend (порт 3000)
```bash
ngrok http 3000
# Скопируй URL вида: https://yyyy.ngrok-free.app
# Этот URL → BotFather → Web App URL
```

---

## Конфигурация .env

```env
BOT_TOKEN=ваш_токен_бота_от_BotFather
VITE_LEAD_API_URL=https://xxxx.ngrok-free.app/api/send-lead
PORT=5000
FLASK_DEBUG=1
```

После изменения `.env` перезапусти оба сервера.

---

## ✅ Чек-лист тестирования

1. **Health check:** `GET https://xxxx.ngrok-free.app/health` → `{"status":"ok","bot_configured":true}`
2. **Test lead (curl):**
   ```bash
   curl -X POST https://xxxx.ngrok-free.app/api/send-lead \
     -H "Content-Type: application/json" \
     -d "{\"name\":\"Test User\",\"username\":\"testuser\",\"services\":[\"Mini Bot\"],\"budget\":\"300-700€\",\"description\":\"Тест заявки\",\"timestamp\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"}"
   ```
3. **Проверь @yatakoikirill** — должно прийти сообщение от бота.
4. **Открой Mini App** в Telegram → заполни форму → Submit → проверь чат 675015988.

---

## Формат сообщения в Telegram

```
🆕 НОВАЯ ЗАЯВКА Novacode VLC

👤 Имя: Ivan Petrov
🆔 Telegram: @ivanpetrov
🎯 Услуги: Mini Bot, Omni Inbox
💰 Бюджет: 300-700€
📝 Задача: Нужен бот для уведомлений
⏰ 26.02.2026 18:30
```

---

## Файлы

| Файл | Роль |
|------|------|
| `main.py` | Flask backend, `/api/send-lead`, chat_id 675015988 |
| `src/services/leadApi.js` | Frontend → backend, точный payload |
| `src/hooks/useTelegram.js` | expand(), themeParams, sendLead() |
| `src/components/ui/Logo.jsx` | Логотип PNG вместо текста |
| `vite.config.js` | CORS + proxy /api → backend |
| `public/logo.png` | Логотип Novacode VLC |
