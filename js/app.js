/**
 * Welcome App VLC — роутер и компоненты экранов.
 * Telegram Mini App: инициализация темы, навигация, формы заявки и квиз.
 */

(function () {
  const D = APP_DATA;
  const CONTAINER = document.getElementById('screen-container');
  const NAV = document.getElementById('nav-bar');

  if (!CONTAINER || !NAV) return;

  const ROUTES = ['home', 'services', 'solution-picker', 'faq', 'contacts'];
  const ALL_SCREENS = ROUTES.concat(['lead-form']);
  var currentQuizStep = 1;

  function getTelegramUsername() {
    try {
      if (typeof Telegram !== 'undefined' && Telegram.WebApp && Telegram.WebApp.initDataUnsafe && Telegram.WebApp.initDataUnsafe.user) {
        var u = Telegram.WebApp.initDataUnsafe.user.username;
        return u ? (u.indexOf('@') === 0 ? u : '@' + u) : '';
      }
    } catch (e) {}
    return '';
  }

  // --- Инициализация Telegram WebApp и темы ---
  function initTelegram() {
    if (typeof Telegram === 'undefined' || !Telegram.WebApp) return;
    var tg = Telegram.WebApp;
    tg.ready();
    tg.expand();
    var theme = tg.themeParams || {};
    var doc = document.documentElement.style;
    if (theme.bg_color) doc.setProperty('--tg-theme-bg-color', theme.bg_color);
    if (theme.text_color) doc.setProperty('--tg-theme-text-color', theme.text_color);
    if (theme.hint_color) doc.setProperty('--tg-theme-hint-color', theme.hint_color);
    if (theme.link_color) doc.setProperty('--tg-theme-link-color', theme.link_color);
    if (theme.button_color) doc.setProperty('--tg-theme-button-color', theme.button_color);
    if (theme.button_text_color) doc.setProperty('--tg-theme-button-text-color', theme.button_text_color);
    if (theme.secondary_bg_color) doc.setProperty('--tg-theme-secondary-bg-color', theme.secondary_bg_color);
  }

  // --- Роутинг (hash) ---
  function getScreenId() {
    var hash = (window.location.hash || '#home').slice(1).toLowerCase();
    if (hash === 'lead-form') return 'lead-form';
    return ROUTES.indexOf(hash) >= 0 ? hash : 'home';
  }

  function navigateTo(screenId) {
    if (screenId === 'solution-picker') currentQuizStep = 1;
    if (screenId === 'lead-form' || ROUTES.indexOf(screenId) >= 0) {
      window.location.hash = screenId;
      render(screenId);
      updateNav(screenId);
    } else {
      window.location.hash = 'home';
      render('home');
      updateNav('home');
    }
  }

  function updateNav(activeId) {
    if (activeId === 'lead-form') activeId = '';
    NAV.innerHTML = ROUTES.map(function (id) {
      var label = D.nav[id] || id;
      var cls = id === activeId ? 'active' : '';
      return '<a href="#' + id + '" class="' + cls + '" data-screen="' + id + '">' + escapeHtml(label) + '</a>';
    }).join('');
    NAV.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        navigateTo(a.getAttribute('data-screen'));
      });
    });
  }

  function escapeHtml(s) {
    if (!s) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  // --- Общие поля контактов для прямой формы и шага 4 квиза ---
  function contactFieldsHtml(opts) {
    var namePlaceholder = opts.namePlaceholder || '';
    var usernamePlaceholder = opts.usernamePlaceholder || '';
    var usernameValue = opts.usernameValue || '';
    var taskPlaceholder = opts.taskPlaceholder || '';
    var taskRows = opts.taskRows || 3;
    var serviceLabel = opts.serviceLabel;
    var servicePlaceholder = opts.servicePlaceholder;
    var contactTimeLabel = opts.contactTimeLabel;
    var contactTimeOptions = opts.contactTimeOptions || [];
    var servicePreselected = opts.servicePreselected || '';

    var html = '';
    html += '<label>' + escapeHtml(opts.nameLabel) + ' <input type="text" name="name" required autocomplete="name" placeholder="' + escapeHtml(namePlaceholder) + '"></label>';
    html += '<label>' + escapeHtml(opts.usernameLabel) + ' <input type="text" name="username" required autocomplete="username" placeholder="' + escapeHtml(usernamePlaceholder) + '" value="' + escapeHtml(usernameValue) + '"></label>';
    html += '<label>' + escapeHtml(opts.taskLabel) + ' <textarea name="task" rows="' + taskRows + '" required placeholder="' + escapeHtml(taskPlaceholder) + '"></textarea></label>';

    if (serviceLabel && D.serviceOptions && D.serviceOptions.length) {
      html += '<label>' + escapeHtml(serviceLabel) + ' <select name="service"><option value="">' + escapeHtml(servicePlaceholder || '') + '</option>';
      D.serviceOptions.forEach(function (o) {
        var sel = o.value === servicePreselected || o.label === servicePreselected ? ' selected' : '';
        html += '<option value="' + escapeHtml(o.label) + '"' + sel + '>' + escapeHtml(o.label) + '</option>';
      });
      html += '</select></label>';
    }

    if (contactTimeLabel && contactTimeOptions.length) {
      html += '<fieldset class="lead-form-time"><legend>' + escapeHtml(contactTimeLabel) + '</legend>';
      contactTimeOptions.forEach(function (o) {
        html += '<label><input type="radio" name="contactTime" value="' + escapeHtml(o.value) + '"> ' + escapeHtml(o.label) + '</label>';
      });
      html += '</fieldset>';
    }
    return html;
  }

  // --- Компоненты экранов ---

  function HomeScreen() {
    var h = D.home;
    return (
      '<section class="screen active" id="screen-home" aria-labelledby="home-headline">' +
      '<h2 class="screen-headline" id="home-headline">' + escapeHtml(h.headline) + '</h2>' +
      '<p class="screen-subheadline">' + escapeHtml(h.subheadline) + '</p>' +
      '<div class="cta-block">' +
      '<a href="#solution-picker" class="btn" data-screen="solution-picker">' + escapeHtml(h.ctaPrimary) + '</a>' +
      '<a href="#services" class="btn btn-secondary" data-screen="services">' + escapeHtml(h.ctaSecondary) + '</a>' +
      '<a href="#lead-form" class="btn btn-secondary" data-screen="lead-form">' + escapeHtml(h.ctaLead) + '</a>' +
      '</div>' +
      '<p class="screen-helper">' + escapeHtml(h.helperText) + '</p>' +
      '</section>'
    );
  }

  function formatPrice(item) {
    if (item.priceLabel) return item.priceLabel;
    var suffix = item.priceSuffix || ' €';
    return 'от ' + item.price + suffix;
  }

  function ServiceCard(item, buttonText, categoryId, categoryTitle) {
    var price = formatPrice(item);
    var serviceLabel = (categoryTitle || '') + (categoryTitle && item.name ? ' — ' : '') + item.name;
    return (
      '<div class="service-card">' +
      '<h3 class="service-card-title">' + escapeHtml(item.name) + '</h3>' +
      '<p class="service-card-desc">' + escapeHtml(item.description) + '</p>' +
      '<p class="service-card-price">' + escapeHtml(price) + '</p>' +
      '<button type="button" class="btn" data-action="lead-from-card" data-category="' + escapeHtml(categoryId || '') + '" data-service="' + escapeHtml(serviceLabel) + '">' + escapeHtml(buttonText) + '</button>' +
      '</div>'
    );
  }

  function ServiceCategory(cat, cardButtonText) {
    var cards = (cat.items || []).map(function (item) {
      return ServiceCard(item, cardButtonText, cat.id, cat.title);
    }).join('');
    var small = cat.smallText
      ? '<p class="services-category-small">' + escapeHtml(cat.smallText) + '</p>'
      : '';
    if (cat.description) {
      cards = '<p class="screen-subheadline">' + escapeHtml(cat.description) + '</p>' + cards;
    }
    return (
      '<div class="services-category" data-category="' + escapeHtml(cat.id) + '">' +
      '<h2 class="services-category-title">' + escapeHtml(cat.title) + '</h2>' +
      small +
      '<div class="services-category-cards">' + cards + '</div>' +
      '</div>'
    );
  }

  function ServiceList() {
    var categories = (D.services.categories || []).map(function (cat) {
      return ServiceCategory(cat, D.services.cardButtonText || 'Оставить заявку');
    }).join('');
    return (
      '<section class="screen active" id="screen-services">' +
      '<h2 class="screen-headline">' + escapeHtml(D.services.title) + '</h2>' +
      '<p class="screen-subheadline">' + escapeHtml(D.services.subtitle) + '</p>' +
      '<div class="services-list">' + categories + '</div>' +
      '</section>'
    );
  }

  function QuizStepHtml(stepKey, stepIndex, totalSteps) {
    var step = D.solutionPicker[stepKey];
    if (!step || !step.options || !step.options.length) return '';
    var multi = step.multi;
    var type = multi ? 'checkbox' : 'radio';
    var name = 'quiz_' + stepIndex;
    var progress = (D.solutionPicker.progressTemplate || 'Шаг {current} из {total}')
      .replace('{current}', stepIndex).replace('{total}', totalSteps);
    var options = step.options.map(function (opt, i) {
      var id = name + '_' + i;
      return (
        '<li><label for="' + id + '">' +
        '<input type="' + type + '" name="' + name + '" id="' + id + '" value="' + escapeHtml(opt) + '">' +
        '<span>' + escapeHtml(opt) + '</span></label></li>'
      );
    }).join('');
    var nextBtn = stepIndex < 4
      ? '<button type="button" class="btn quiz-next" data-next="' + stepIndex + '">Далее</button>'
      : '';
    return (
      '<div class="quiz-step-wrapper" data-step="' + stepIndex + '">' +
      '<p class="quiz-progress">' + escapeHtml(progress) + '</p>' +
      '<div class="quiz-step">' +
      '<h3 class="quiz-step-title">' + escapeHtml(step.question) + '</h3>' +
      '<ul class="quiz-options">' + options + '</ul>' +
      nextBtn +
      '</div></div>'
    );
  }

  function QuizStep4Html() {
    var s4 = D.solutionPicker.step4;
    var progress = (D.solutionPicker.progressTemplate || 'Шаг {current} из {total}').replace('{current}', '4').replace('{total}', '4');
    var fields = contactFieldsHtml({
      nameLabel: s4.nameLabel,
      namePlaceholder: s4.namePlaceholder,
      usernameLabel: s4.usernameLabel,
      usernamePlaceholder: s4.usernamePlaceholder,
      usernameValue: getTelegramUsername(),
      taskLabel: s4.taskLabel,
      taskPlaceholder: s4.taskPlaceholder,
      taskRows: s4.taskRows || 3,
      serviceLabel: s4.serviceLabel,
      servicePlaceholder: s4.servicePlaceholder,
      contactTimeLabel: s4.contactTimeLabel,
      contactTimeOptions: s4.contactTimeOptions || [],
    });
    return (
      '<div class="quiz-step-wrapper" data-step="4">' +
      '<p class="quiz-progress">' + escapeHtml(progress) + '</p>' +
      '<h3 class="quiz-step-title">' + escapeHtml(s4.title) + '</h3>' +
      '<form class="lead-form" id="quiz-lead-form">' +
      fields +
      '<button type="submit" class="btn">' + escapeHtml(s4.submitButton) + '</button>' +
      '</form></div>'
    );
  }

  function SolutionPickerScreen() {
    var step1 = QuizStepHtml('step1', 1, 4);
    var step2 = QuizStepHtml('step2', 2, 4);
    var step3 = QuizStepHtml('step3', 3, 4);
    var step4 = QuizStep4Html();
    var allSteps = step1 + step2 + step3 + step4;
    return (
      '<section class="screen active" id="screen-solution-picker">' +
      '<h2 class="screen-headline">' + escapeHtml(D.solutionPicker.title) + '</h2>' +
      '<div id="quiz-steps-container">' + allSteps + '</div>' +
      '</section>'
    );
  }

  function LeadFormScreen() {
    var preselect = '';
    try {
      var raw = sessionStorage.getItem('preselectedService');
      if (raw) {
        var o = JSON.parse(raw);
        preselect = o && o.serviceLabel ? o.serviceLabel : (o && o.serviceName ? o.serviceName : '');
        sessionStorage.removeItem('preselectedService');
      }
    } catch (e) {}
    var L = D.leadForm;
    var fields = contactFieldsHtml({
      nameLabel: L.nameLabel,
      namePlaceholder: L.namePlaceholder,
      usernameLabel: L.usernameLabel,
      usernamePlaceholder: L.usernamePlaceholder,
      usernameValue: getTelegramUsername(),
      taskLabel: L.taskLabel,
      taskPlaceholder: L.taskPlaceholder,
      taskRows: L.taskRows || 3,
      serviceLabel: L.serviceLabel,
      servicePlaceholder: L.servicePlaceholder,
      servicePreselected: preselect,
      contactTimeLabel: L.contactTimeLabel,
      contactTimeOptions: L.contactTimeOptions || [],
    });
    return (
      '<section class="screen active" id="screen-lead-form">' +
      '<h2 class="screen-headline">' + escapeHtml(L.title) + '</h2>' +
      (L.helperText ? '<p class="screen-helper">' + escapeHtml(L.helperText) + '</p>' : '') +
      '<form class="lead-form" id="lead-form">' +
      fields +
      '<button type="submit" class="btn">' + escapeHtml(L.submitButton) + '</button>' +
      '</form>' +
      '<p><a href="#home" class="btn btn-secondary" data-screen="home">' + escapeHtml(L.backToHome) + '</a></p>' +
      '</section>'
    );
  }

  function ThankYouScreen(backLabel, backScreen) {
    var msg = (D.leadForm && D.leadForm.thankYouMessage) || (D.solutionPicker && D.solutionPicker.thankYouMessage) || 'Спасибо! Я свяжусь с вами в ближайшее время.';
    return (
      '<section class="screen active" id="screen-thankyou">' +
      '<p class="thank-you-message">' + escapeHtml(msg) + '</p>' +
      '<a href="#' + (backScreen || 'home') + '" class="btn btn-secondary" data-screen="' + (backScreen || 'home') + '">' + escapeHtml(backLabel || 'На главную') + '</a>' +
      '</section>'
    );
  }

  function FAQItem(item, index) {
    var q = escapeHtml(item.q);
    var a = escapeHtml(item.a || '');
    var id = 'faq-' + index;
    return (
      '<li class="faq-item">' +
      '<button type="button" class="faq-question" aria-expanded="false" aria-controls="' + id + '" id="faq-q-' + index + '">' + q + '</button>' +
      '<div class="faq-answer" id="' + id + '" role="region" aria-labelledby="faq-q-' + index + '">' + a + '</div>' +
      '</li>'
    );
  }

  function FAQList() {
    var items = (D.faq.items || []).map(FAQItem).join('');
    return (
      '<section class="screen active" id="screen-faq">' +
      '<h2 class="screen-headline">' + escapeHtml(D.faq.title) + '</h2>' +
      '<p class="screen-subheadline">' + escapeHtml(D.faq.subtitle) + '</p>' +
      '<ul class="faq-list">' + items + '</ul>' +
      '</section>'
    );
  }

  function ContactScreen() {
    var c = D.contacts;
    return (
      '<section class="screen active" id="screen-contacts">' +
      '<h2 class="screen-headline">' + escapeHtml(c.title) + '</h2>' +
      '<p class="screen-subheadline">' + escapeHtml(c.subtitle) + '</p>' +
      '<div class="contacts-about">' + escapeHtml(c.aboutText) + '</div>' +
      '<div class="contacts-links">' +
      '<a href="' + escapeHtml(c.telegramUrl || 'https://t.me/novacodevlc') + '" target="_blank" rel="noopener">' + escapeHtml(c.telegramButton) + '</a>' +
      '<a href="' + escapeHtml(c.websiteUrl) + '" target="_blank" rel="noopener">' + escapeHtml(c.websiteLabel) + '</a>' +
      '</div>' +
      (c.ctaLead ? '<p><a href="#lead-form" class="btn" data-screen="lead-form">' + escapeHtml(c.ctaLead) + '</a></p>' : '') +
      '</section>'
    );
  }

  function render(screenId) {
    var html = '';
    if (screenId === 'home') html = HomeScreen();
    else if (screenId === 'services') html = ServiceList();
    else if (screenId === 'solution-picker') html = SolutionPickerScreen();
    else if (screenId === 'faq') html = FAQList();
    else if (screenId === 'contacts') html = ContactScreen();
    else if (screenId === 'lead-form') html = LeadFormScreen();
    else html = HomeScreen();

    CONTAINER.innerHTML = html;

    // Quiz: показываем только текущий шаг
    var quizContainer = document.getElementById('quiz-steps-container');
    if (quizContainer) {
      var wrappers = quizContainer.querySelectorAll('.quiz-step-wrapper');
      wrappers.forEach(function (w) {
        var step = parseInt(w.getAttribute('data-step'), 10);
        w.classList.toggle('quiz-step-visible', step === currentQuizStep);
      });
      quizContainer.querySelectorAll('.quiz-next').forEach(function (btn) {
        btn.addEventListener('click', function () {
          currentQuizStep = parseInt(btn.getAttribute('data-next'), 10) + 1;
          wrappers.forEach(function (w) {
            var step = parseInt(w.getAttribute('data-step'), 10);
            w.classList.toggle('quiz-step-visible', step === currentQuizStep);
          });
        });
      });
    }

    // Клики: навигация и «Оставить заявку» с карточки
    CONTAINER.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-screen]');
      if (a) {
        e.preventDefault();
        navigateTo(a.getAttribute('data-screen'));
        return;
      }
      var btn = e.target.closest('button[data-action="lead-from-card"]');
      if (btn) {
        e.preventDefault();
        var cat = btn.getAttribute('data-category') || '';
        var serviceLabel = btn.getAttribute('data-service') || '';
        try {
          sessionStorage.setItem('preselectedService', JSON.stringify({ categoryId: cat, serviceLabel: serviceLabel }));
        } catch (err) {}
        navigateTo('lead-form');
      }
    });

    // Прямая форма заявки
    var form = document.getElementById('lead-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(form);
        var payload = {
          source: 'lead_form',
          name: fd.get('name') || '',
          username: fd.get('username') || '',
          task: fd.get('task') || '',
          service: fd.get('service') || undefined,
          contactTime: fd.get('contactTime') || undefined,
        };
        if (payload.service === '') delete payload.service;
        if (payload.contactTime === '') delete payload.contactTime;
        console.log('Lead payload:', payload);
        if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
          Telegram.WebApp.sendData(JSON.stringify(payload));
        }
        CONTAINER.innerHTML = ThankYouScreen(D.leadForm.backToHome, 'home');
        CONTAINER.querySelector('a[data-screen="home"]').addEventListener('click', function (ev) {
          ev.preventDefault();
          navigateTo('home');
        });
      });
    }

    // Квиз: отправка шага 4 (те же поля контактов)
    var quizForm = document.getElementById('quiz-lead-form');
    if (quizForm) {
      quizForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(quizForm);
        var need = [].slice.call(document.querySelectorAll('input[name="quiz_1"]:checked')).map(function (el) { return el.value; });
        var stageEl = document.querySelector('input[name="quiz_2"]:checked');
        var budgetEl = document.querySelector('input[name="quiz_3"]:checked');
        var payload = {
          source: 'quiz',
          need: need,
          stage: stageEl ? stageEl.value : '',
          budget: budgetEl ? budgetEl.value : '',
          name: fd.get('name') || '',
          username: fd.get('username') || '',
          task: fd.get('task') || '',
          service: fd.get('service') || undefined,
          contactTime: fd.get('contactTime') || undefined,
        };
        if (payload.service === '') delete payload.service;
        if (payload.contactTime === '') delete payload.contactTime;
        console.log('Quiz payload:', payload);
        if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
          Telegram.WebApp.sendData(JSON.stringify(payload));
        }
        CONTAINER.innerHTML = ThankYouScreen(D.solutionPicker.backToHome, 'home');
        CONTAINER.querySelector('a[data-screen="home"]').addEventListener('click', function (ev) {
          ev.preventDefault();
          navigateTo('home');
        });
      });
    }

    // FAQ: аккордеон
    CONTAINER.querySelectorAll('.faq-question').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var region = document.getElementById(btn.getAttribute('aria-controls'));
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
        if (region) region.style.display = expanded ? 'none' : 'block';
      });
    });
    CONTAINER.querySelectorAll('.faq-answer').forEach(function (el) {
      el.style.display = 'none';
    });
  }

  function init() {
    initTelegram();
    var screenId = getScreenId();
    render(screenId);
    updateNav(screenId);
    window.addEventListener('hashchange', function () {
      var id = getScreenId();
      if (id === 'solution-picker') currentQuizStep = 1;
      render(id);
      updateNav(id);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
