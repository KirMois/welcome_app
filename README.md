# Welcome App VLC — Telegram Mini App

Минималистичное мини-приложение для Telegram: услуги и сбор заявок (лидов).

## Две версии

| Версия | Описание |
|--------|----------|
| **React (SPA)** | Текущая сборка: Vite + React, компоненты, 90s–2000s визуал, тема Telegram. Запуск: `npm install` → `npm run dev` или `npm run build`. Точка входа: `index.html` → `src/main.jsx`. |
| **Vanilla** | Классическая версия без фреймворка: `index.vanilla.html`, `js/app.js`, `js/data.js`, `css/styles.css`. Откройте `index.vanilla.html` или переименуйте в `index.html` и отдавайте статику. |

## Структура проекта (React)

- **ARCHITECTURE.md** / **UX.md** — карта экранов, потоки, данные заявок.
- **src/** — исходники React:
  - **components/layout/** — AppShell, Navigation.
  - **components/ui/** — PrimaryButton, SecondaryButton, ServiceCard, FormField, QuizStep, FAQItem.
  - **screens/** — HomeScreen, ServicesScreen, QuizScreen, FAQScreen, ContactScreen, LeadFormScreen, ThankYouScreen.
  - **hooks/useTelegram.js** — тема, username, sendData().
  - **data/appData.js** — все тексты на русском (услуги, квиз, FAQ, контакты).
- **src/index.css** — глобальные стили, переменные темы, ретро-акцент (teal).
- **index.html** — точка входа для Vite (React).

## Экраны

| Экраны | Описание |
|--------|----------|
| Домой | Заголовок, подзаголовок, CTA «Подобрать решение» / «Посмотреть услуги» / «Оставить заявку» |
| Услуги | Категории и карточки услуг с ценами «от X €», кнопка «Оставить заявку» → форма с предвыбранной услугой |
| Подобрать | Квиз 4 шага (прогресс «Шаг N из 4») + форма контактов → «Спасибо» |
| FAQ | Вопросы и ответы (аккордеон) |
| Контакты | Обо мне, ссылки, кнопка «Оставить заявку» |
| Оставить заявку | Прямая форма (имя, @username, задача, опционально услуга и время) |
| Спасибо | Сообщение после отправки заявки/квиза |

## Запуск (React)

```bash
npm install
npm run dev    # разработка
npm run build  # сборка в dist/
npm run preview # просмотр сборки
```

В Telegram укажите URL собранного приложения (HTTPS). Для разработки можно использовать туннель (ngrok, Cloudflare Tunnel) с HTTPS.

## Подключение backend для заявок

Данные отправляются в бота через `Telegram.WebApp.sendData(JSON.stringify(payload))`. Дополнительно можно слать тот же payload на свой API:

- В **src/hooks/useTelegram.js** в функции `sendData` раскомментируйте и настройте `fetch('/api/leads', ...)`.
- Или в **src/screens/LeadFormScreen.jsx** и **src/screens/QuizScreen.jsx** после вызова `sendData(payload)` добавьте вызов вашего API.

Формат payload: см. **UX.md** (раздел «Данные при отправке»).

## Тема (светлая / тёмная)

React-версия подхватывает `themeParams` из Telegram и применяет их к CSS-переменным; при тёмной теме добавляется `data-theme="dark"` для градиентов и теней. Акцентный цвет — teal (#0d9488), в духе бренда.

## Токен бота

Храните в `.env` (см. `.env.example`), не коммитьте. В самом Mini App токен не нужен; он используется на backend бота для приёма `sendData`.
