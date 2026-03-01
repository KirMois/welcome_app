/**
 * Контент и данные приложения (все тексты на русском).
 * Структура для экранов: услуги, квиз, прямая форма заявки, FAQ, контакты.
 */

const APP_DATA = {
  home: {
    headline: 'Цифровые решения, которые экономят время и приводят клиентов',
    subheadline: 'Создаю ботов, мини‑приложения и веб‑системы под бизнес: от приёма заявок до автоматизации и единого окна для сообщений.',
    ctaPrimary: 'Подобрать решение',
    ctaSecondary: 'Посмотреть услуги',
    ctaLead: 'Оставить заявку',
    helperText: 'Обычно отвечаю в течение 2 часов. Работаю с малым и средним бизнесом в ЕС и СНГ.',
  },

  services: {
    title: 'Услуги',
    subtitle: 'Решения для бизнеса',
    cardButtonText: 'Оставить заявку',
    categories: [
      {
        id: 'bots',
        title: 'Боты для бизнеса',
        smallText: 'Подходит для малого и среднего бизнеса',
        items: [
          { name: 'Mini Bot', price: 120, description: 'Автоответы, приём заявок, кнопки, простая логика' },
          { name: 'Standard Bot', price: 350, description: 'Запись на услуги, фильтрация заявок, интеграции, уведомления' },
          { name: 'Advanced Bot', price: 700, description: 'Сложная логика, CRM-сценарии, мультиязычность, автоматизация процессов' },
        ],
      },
      {
        id: 'miniapps',
        title: 'Мини-приложения (Telegram / Web)',
        smallText: 'Подходит для бизнеса, которому нужна система управления',
        items: [
          { name: 'Mini App', price: 400, description: 'Формы, калькуляторы, внутренние инструменты, обработка заявок' },
          { name: 'Business App', price: 900, description: 'Админ-панель, управление клиентами, аналитика, роли сотрудников' },
        ],
      },
      {
        id: 'omni',
        title: 'Omni Inbox — единое окно сообщений',
        smallText: 'Не теряйте клиентов из разных каналов',
        items: [
          { name: 'Omni Inbox Basic', price: 250, description: 'Telegram + Instagram + WhatsApp в одном окне, уведомления' },
          { name: 'Omni Inbox Pro', price: 450, description: 'Facebook, аналитика скорости ответа, фильтры по статусу' },
        ],
      },
      {
        id: 'smart-intake',
        title: 'Smart Intake — фильтр лидов',
        smallText: 'Только серьёзные заявки доходят до менеджера',
        items: [
          { name: 'Lead Filter Basic', price: 300, description: 'Автосценарии вопросов, квалификация по бюджету, Google Sheets' },
          { name: 'Smart Intake Pro', price: 550, description: 'VIP приоритеты, автоответы, интеграция с CRM/Telegram' },
        ],
      },
      {
        id: 'reputation',
        title: 'Reputation Automation — отзывы',
        smallText: 'Больше отзывов — больше доверия клиентов',
        items: [
          { name: 'Review Bot', price: 150, description: 'Автозапрос Google Reviews, статистика рейтинга' },
          { name: 'Reputation Pro', price: 250, description: 'Уведомления о негативных отзывах, Facebook/TripAdvisor' },
        ],
      },
      {
        id: 'web-support',
        title: 'Веб-приложения + Поддержка',
        smallText: 'Надёжные системы и постоянная поддержка',
        items: [
          { name: 'Web App MVP', price: 1500, description: 'Веб-приложения под ключ' },
          { name: 'Техподдержка', price: 50, priceSuffix: ' / месяц', description: 'Поддержка и обновления' },
        ],
      },
      {
        id: 'cabinet',
        title: 'Cabinet — кабинет заказчика',
        smallText: '',
        description: 'Клиент и заказчик создают комнату, в которой хранится весь прогресс по сделке: документы, фото, статусы, комментарии и история изменений — всё в одном месте.',
        items: [
          { name: 'Cabinet Basic', priceLabel: 'от XXX €', description: 'документы + статусы' },
          { name: 'Cabinet Pro', priceLabel: 'от YYY €', description: 'файлы, история, роли, напоминания' },
        ],
      },
    ],
  },

  // Прямая форма заявки (один экран)
  leadForm: {
    title: 'Оставить заявку',
    helperText: 'Опишите задачу коротко — я свяжусь и уточню детали.',
    nameLabel: 'Имя',
    namePlaceholder: 'Как к вам обращаться',
    usernameLabel: 'Telegram @username',
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
    thankYouMessage: 'Спасибо! Я свяжусь с вами в ближайшее время. Обычно это занимает не больше 2 часов.',
    backToHome: 'На главную',
  },

  solutionPicker: {
    title: 'Подобрать решение',
    progressTemplate: 'Шаг {current} из {total}',
    step1: {
      question: 'Что вам нужно?',
      multi: true,
      options: [
        'Бот для бизнеса',
        'Мини-приложение',
        'Omni Inbox (единое окно сообщений)',
        'Фильтр лидов (Smart Intake)',
        'Отзывы и репутация',
        'Веб-приложение / индивидуальное решение',
      ],
    },
    step2: {
      question: 'На каком вы сейчас этапе?',
      multi: false,
      options: [
        'Только изучаю варианты',
        'Есть проблема, хочу решение',
        'Уже есть бот / система, нужно улучшить',
        'Ищу подрядчика под конкретный проект',
      ],
    },
    step3: {
      question: 'Бюджет (ориентировочно)?',
      multi: false,
      options: [
        'До 300 €',
        '300–700 €',
        '700–1500 €',
        '1500+ €',
      ],
    },
    step4: {
      title: 'Как с вами связаться?',
      nameLabel: 'Имя',
      namePlaceholder: 'Как к вам обращаться',
      usernameLabel: 'Telegram @username',
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
      submitButton: 'Отправить и подобрать решение',
    },
    thankYouMessage: 'Спасибо! Я свяжусь с вами в ближайшее время. Обычно это занимает не больше 2 часов.',
    backToHome: 'На главную',
  },

  faq: {
    title: 'FAQ',
    subtitle: 'Как мы работаем',
    items: [
      {
        q: 'С кем вы работаете: только с малым бизнесом?',
        a: 'В основном с малым и средним бизнесом: салоны, клиники, агентства, локальные сервисы. Крупным компаниям тоже могу предложить отдельные решения — напишите, обсудим задачу.',
      },
      {
        q: 'Как быстро вы отвечаете на заявки?',
        a: 'Обычно в течение 2 часов в рабочее время. Если заявка пришла вечером или в выходной, отвечу в начале следующего рабочего дня.',
      },
      {
        q: 'Можно ли начать с маленького решения и потом масштабировать?',
        a: 'Да. Часто логичнее начать с простого бота или мини-приложения, проверить идею и поток клиентов, а потом добавить интеграции, админку или новые каналы. Подскажу, как лучше спланировать этапы.',
      },
      {
        q: 'Делаете ли вы поддержку после запуска?',
        a: 'Да. Предлагаю техподдержку и доработки: от разовых правок до ежемесячного сопровождения. Удобно, когда одна команда и запускает, и поддерживает систему.',
      },
      {
        q: 'Работаете ли вы с клиентами не из Испании?',
        a: 'Да. Работаю с бизнесом в ЕС и СНГ. Связь по Telegram и видеозвонкам, оплата по договору — географически не ограничен.',
      },
      {
        q: 'Можно ли интегрировать решения с моей текущей CRM/телефонией?',
        a: 'Часто да. Зависит от конкретной системы: многие сервисы дают API или вебхуки. Напишите, чем пользуетесь — проверю возможность интеграции и подскажу варианты.',
      },
    ],
  },

  contacts: {
    title: 'Контакты',
    subtitle: 'Обо мне',
    aboutText: 'Привет, я [Имя], разработчик решений для бизнеса: боты, мини-приложения и веб‑системы. Помогаю компаниям автоматизировать процессы и не терять лиды — без лишней сложности.',
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

  // Список услуг для выпадающего списка (опциональное поле в формах)
  serviceOptions: [],
};

// Построение списка услуг для селекта: все категории и названия товаров
(function buildServiceOptions() {
  const list = [];
  (APP_DATA.services.categories || []).forEach(function (cat) {
    (cat.items || []).forEach(function (item) {
      list.push({ value: item.name, label: cat.title + ' — ' + item.name });
    });
  });
  APP_DATA.serviceOptions = list;
})();
