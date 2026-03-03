/**
 * Контент приложения (все тексты на русском).
 * Novacode VLC — студия (мы).
 */

export const APP_DATA = {
  home: {
    headline: 'Цифровые решения для бизнеса',
    subheadline: 'Novacode VLC создаёт ботов, мини‑приложения и веб‑системы: от приёма заявок до автоматизации и единого окна для сообщений.',
    ctaPrimary: 'Подобрать решение',
    ctaSecondary: 'Посмотреть услуги',
    ctaLead: 'Оставить заявку',
    helperText: 'Обычно отвечаем в течение 2 часов. Работаем с малым и средним бизнесом в ЕС и СНГ.',
  },

  services: {
    title: 'Услуги',
    subtitle: 'Решения для бизнеса',
    cardButtonText: 'Обсудить',
    categories: [
      { id: 'bots', title: 'Боты для бизнеса', smallText: 'Подходит для малого и среднего бизнеса', items: [
        { name: 'Mini Bot', price: 120, description: 'Автоответы, приём заявок, кнопки, простая логика' },
        { name: 'Standard Bot', price: 350, description: 'Запись на услуги, фильтрация заявок, интеграции, уведомления' },
        { name: 'Advanced Bot', price: 700, description: 'Сложная логика, CRM-сценарии, мультиязычность, автоматизация процессов' },
      ]},
      { id: 'miniapps', title: 'Мини-приложения (Telegram / Web)', smallText: 'Подходит для бизнеса, которому нужна система управления', items: [
        { name: 'Mini App', price: 400, description: 'Формы, калькуляторы, внутренние инструменты, обработка заявок' },
        { name: 'Business App', price: 900, description: 'Админ-панель, управление клиентами, аналитика, роли сотрудников' },
      ]},
      { id: 'omni', title: 'Omni Inbox — единое окно сообщений', smallText: 'Не теряйте клиентов из разных каналов', items: [
        { name: 'Omni Inbox Basic', price: 250, description: 'Telegram + Instagram + WhatsApp в одном окне, уведомления' },
        { name: 'Omni Inbox Pro', price: 450, description: 'Facebook, аналитика скорости ответа, фильтры по статусу' },
      ]},
      { id: 'smart-intake', title: 'Smart Intake — фильтр лидов', smallText: 'Только серьёзные заявки доходят до менеджера', items: [
        { name: 'Lead Filter Basic', price: 300, description: 'Автосценарии вопросов, квалификация по бюджету, Google Sheets' },
        { name: 'Smart Intake Pro', price: 550, description: 'VIP приоритеты, автоответы, интеграция с CRM/Telegram' },
      ]},
      { id: 'reputation', title: 'Reputation Automation — отзывы', smallText: 'Больше отзывов — больше доверия клиентов', items: [
        { name: 'Review Bot', price: 150, description: 'Автозапрос Google Reviews, статистика рейтинга' },
        { name: 'Reputation Pro', price: 250, description: 'Уведомления о негативных отзывах, Facebook/TripAdvisor' },
      ]},
      { id: 'web-support', title: 'Веб-приложения + Поддержка', smallText: 'Надёжные системы и постоянная поддержка', items: [
        { name: 'Web App MVP', price: 1500, description: 'Веб-приложения под ключ' },
        { name: 'Техподдержка', price: 50, priceSuffix: ' / месяц', description: 'Поддержка и обновления' },
      ]},
      { id: 'cabinet', title: 'Cabinet — кабинет заказчика', smallText: '', description: 'Клиент и заказчик создают комнату, в которой хранится весь прогресс по сделке: документы, фото, статусы, комментарии и история изменений — всё в одном месте.', items: [
        { name: 'Cabinet Basic', priceLabel: 'от 250 €', description: 'документы + статусы' },
        { name: 'Cabinet Pro', priceLabel: 'от 450 €', description: 'файлы, история, роли, напоминания' },
      ]},
    ],
  },

  leadForm: {
    title: 'Оставить заявку',
    helperText: 'Опишите задачу коротко — мы свяжемся и уточним детали.',
    nameLabel: 'Имя',
    namePlaceholder: 'Как к вам обращаться',
    emailLabel: 'Email',
    emailPlaceholder: 'например, name@company.com',
    usernameLabel: 'Telegram username',
    usernamePlaceholder: 'например, @username',
    taskLabel: 'Кратко опишите задачу',
    taskPlaceholder: 'Например: нужен бот для записи клиентов и уведомлений в Telegram.',
    taskRows: 3,
    serviceLabel: 'Интересует услуга',
    servicePlaceholder: 'Выберите или оставьте пустым',
    contactTimeLabel: 'Удобное время для связи',
    contactTimeOptions: [
      { value: 'утро', label: 'Утро' },
      { value: 'день', label: 'День' },
      { value: 'вечер', label: 'Вечер' },
    ],
    submitButton: 'Отправить заявку',
    thankYouMessage: 'Спасибо! Мы свяжемся с вами в ближайшее время. Обычно это занимает не больше 2 часов.',
    backToHome: 'На главную',
  },

  solutionPicker: {
    title: 'Подобрать решение',
    progressTemplate: 'Шаг {current} из {total}',
    step1: { question: 'Что вам нужно?', multi: true, options: ['Бот для бизнеса', 'Мини-приложение', 'Omni Inbox (единое окно сообщений)', 'Фильтр лидов (Smart Intake)', 'Отзывы и репутация', 'Веб-приложение / индивидуальное решение'] },
    step2: { question: 'На каком вы сейчас этапе?', multi: false, options: ['Только изучаю варианты', 'Есть проблема, хочу решение', 'Уже есть бот / система, нужно улучшить', 'Ищу подрядчика под конкретный проект'] },
    step3: { question: 'Бюджет (ориентировочно)?', multi: false, options: ['До 300 €', '300–700 €', '700–1500 €', '1500+ €'] },
    step4: {
      title: 'Как с вами связаться?',
      nameLabel: 'Имя', namePlaceholder: 'Как к вам обращаться',
      emailLabel: 'Email', emailPlaceholder: 'например, name@company.com',
      usernameLabel: 'Telegram username', usernamePlaceholder: 'например, @username',
      taskLabel: 'Кратко опишите задачу', taskPlaceholder: 'Например: нужен бот для записи клиентов и уведомлений в Telegram.', taskRows: 3,
      serviceLabel: 'Интересует услуга', servicePlaceholder: 'Выберите или оставьте пустым',
      contactTimeLabel: 'Удобное время для связи',
      contactTimeOptions: [{ value: 'утро', label: 'Утро' }, { value: 'день', label: 'День' }, { value: 'вечер', label: 'Вечер' }],
      submitButton: 'Отправить и подобрать решение',
    },
    thankYouMessage: 'Спасибо! Мы свяжемся с вами в ближайшее время. Обычно это занимает не больше 2 часов.',
    backToHome: 'На главную',
  },

  faq: {
    title: 'FAQ',
    subtitle: 'Как мы работаем',
    items: [
      { q: 'С кем вы работаете: только с малым бизнесом?', a: 'В основном с малым и средним бизнесом: салоны, клиники, агентства, локальные сервисы. Крупным компаниям тоже можем предложить отдельные решения — напишите, обсудим задачу.' },
      { q: 'Как быстро вы отвечаете на заявки?', a: 'Обычно в течение 2 часов в рабочее время. Если заявка пришла вечером или в выходной, ответим в начале следующего рабочего дня.' },
      { q: 'Можно ли начать с маленького решения и потом масштабировать?', a: 'Да. Часто логичнее начать с простого бота или мини-приложения, проверить идею и поток клиентов, а потом добавить интеграции, админку или новые каналы. Подскажем, как лучше спланировать этапы.' },
      { q: 'Делаете ли вы поддержку после запуска?', a: 'Да. Предлагаем техподдержку и доработки: от разовых правок до ежемесячного сопровождения. Удобно, когда одна команда и запускает, и поддерживает систему.' },
      { q: 'Работаете ли вы с клиентами не из Испании?', a: 'Да. Работаем с бизнесом в ЕС и СНГ. Связь по Telegram и видеозвонкам, оплата по договору — географически не ограничены.' },
      { q: 'Можно ли интегрировать решения с моей текущей CRM/телефонией?', a: 'Часто да. Зависит от конкретной системы: многие сервисы дают API или вебхуки. Напишите, чем пользуетесь — проверим возможность интеграции и подскажем варианты.' },
    ],
  },

  contacts: {
    title: 'Контакты',
    subtitle: 'О нас',
    aboutText: 'Novacode VLC — студия разработки цифровых решений для бизнеса. Создаём ботов, мини-приложения и веб‑системы. Помогаем компаниям автоматизировать процессы и не терять лиды — без лишней сложности.',
    telegramButton: 'Написать в Telegram',
    telegramUrl: 'https://t.me/novacodevlc',
    websiteLabel: 'Сайт',
    websiteUrl: 'https://www.novacodevlc.com',
    ctaLead: 'Оставить заявку',
  },

  nav: {
    home: 'Домой',
    services: 'Услуги',
    'solution-picker': 'Подобрать',
    faq: 'FAQ',
    contacts: 'Контакты',
  },
};

const list = [];
(APP_DATA.services.categories || []).forEach((cat) => {
  (cat.items || []).forEach((item) => {
    const label = `${cat.title} — ${item.name}`;
    list.push({ value: label, label });
  });
});
export const serviceOptions = list;
