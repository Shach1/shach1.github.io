/* ============================================================
   Какой ты студент РГГУ — логика приложения
   ============================================================ */
(function () {
  'use strict';

  var DATA = window.TEST_DATA;
  var app = document.getElementById('app');
  var tg = (window.Telegram && window.Telegram.WebApp) || null;

  var state = {
    screen: 'cover',
    q: 0,
    answers: new Array(DATA.total).fill(null),
    result: null
  };

  var loadingTimer = null;

  /* ---------- утилиты ---------- */

  function icon(id, extra) {
    return '<svg class="icon' + (extra ? ' ' + extra : '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#' + id + '"></use></svg>';
  }

  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function plainName(name) {
    return name.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '').trim();
  }

  function haptic(kind) {
    if (!tg || !tg.HapticFeedback) return;
    try {
      if (kind === 'select') tg.HapticFeedback.selectionChanged();
      else if (kind === 'success' || kind === 'warning' || kind === 'error') tg.HapticFeedback.notificationOccurred(kind);
      else tg.HapticFeedback.impactOccurred(kind || 'light');
    } catch (e) { /* no-op */ }
  }

  function notify(text) {
    if (tg && typeof tg.showAlert === 'function') {
      try { tg.showAlert(text); return; } catch (e) { /* no-op */ }
    }
    window.alert(text);
  }

  function download(blob) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'rggu-' + state.result + '.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
  }

  /* ---------- экраны ---------- */

  function renderCover() {
    return '' +
      '<section class="screen screen--cover" aria-label="Обложка">' +
        '<span class="decor cover-decor-1"></span>' +
        '<span class="decor cover-decor-2"></span>' +
        '<span class="decor cover-decor-3"></span>' +
        '<img class="cover-logo" src="assets/img/logo.svg" alt="РГГУ" width="50" height="50">' +
        '<h1 class="cover-title">Какой ты<br>студент РГГУ?</h1>' +
        '<span class="cover-spark" aria-hidden="true">✧</span>' +
        '<p class="cover-sub">Узнай свою<br>студенческую<br>личность</p>' +
        '<div class="cover-art" aria-hidden="true">' +
          icon('i-star', 'cover-star') +
          '<img class="cover-blob" src="assets/img/cover/blob.svg" alt="">' +
          '<img class="cover-statue" src="assets/img/cover/statue.webp" alt="">' +
        '</div>' +
        '<div class="cover-actions">' +
          '<button class="btn btn--primary" type="button" data-action="start">Пройти тест</button>' +
          '<p class="cover-note">15&nbsp;вопросов&nbsp; • около&nbsp;3&nbsp;минут</p>' +
        '</div>' +
      '</section>';
  }

  function renderHow() {
    var steps = [
      ['01', 'Отвечай честно', 'Выбирай вариант, который ближе именно тебе.'],
      ['02', 'Не ищи правильный ответ', 'Здесь нет оценок и не бывает ошибок.'],
      ['03', 'Получи свой результат', 'Узнай основной тип и свои дополнительные черты.']
    ];
    var items = steps.map(function (s) {
      return '<div class="step">' +
        '<span class="step__num">' + s[0] + '</span>' +
        '<div>' +
          '<h2 class="step__title">' + s[1] + '</h2>' +
          '<p class="step__text">' + s[2] + '</p>' +
        '</div>' +
      '</div>';
    }).join('');

    return '' +
      '<section class="screen screen--how" aria-label="Как это работает">' +
        '<span class="decor how-decor-1"></span>' +
        '<span class="decor how-decor-2"></span>' +
        '<span class="decor how-decor-3"></span>' +
        '<div class="topbar">' +
          '<button class="icon-btn" type="button" data-action="back" aria-label="Назад">' + icon('i-arrow-left') + '</button>' +
          '<span class="badge">Перед&nbsp;стартом</span>' +
        '</div>' +
        '<h1 class="how-title">Как&nbsp;это&nbsp;работает?</h1>' +
        '<div class="how-steps">' + items + '</div>' +
        '<div class="how-actions">' +
          '<button class="btn btn--primary" type="button" data-action="begin">Начать тест</button>' +
          '<p class="how-note">15&nbsp;вопросов&nbsp; • около&nbsp;3&nbsp;минут</p>' +
        '</div>' +
      '</section>';
  }

  function renderQuestion() {
    var q = DATA.questions[state.q];
    var selected = state.answers[state.q];
    var last = state.q === DATA.total - 1;
    var pct = ((state.q + 1) / DATA.total) * 100;

    var cards = q.answers.map(function (a) {
      return '<button class="answer" type="button" role="radio" aria-checked="' + (selected === a.letter) + '" data-action="answer" data-letter="' + a.letter + '">' +
        '<span class="answer__media">' +
          '<img class="answer__img" src="' + a.image + '" alt="" width="276" height="152" decoding="async">' +
          '<span class="answer__letter">' + a.letter + '</span>' +
        '</span>' +
        '<span class="answer__text">' + a.text + '</span>' +
      '</button>';
    }).join('');

    return '' +
      '<section class="screen screen--question" aria-label="Вопрос ' + q.n + ' из ' + DATA.total + '">' +
        '<div class="q-top">' +
          '<button class="icon-btn" type="button" data-action="back" aria-label="Назад">' + icon('i-arrow-left') + '</button>' +
          '<span class="q-count">' + q.n + ' / ' + DATA.total + '</span>' +
        '</div>' +
        '<div class="progress" role="progressbar" aria-valuemin="1" aria-valuemax="' + DATA.total + '" aria-valuenow="' + q.n + '" aria-label="Прогресс теста"><span style="width:' + pct + '%"></span></div>' +
        '<span class="badge q-badge">ВОПРОС&nbsp;' + pad2(q.n) + '</span>' +
        '<h1 class="q-title">' + q.title + '</h1>' +
        '<p class="q-hint">Выбери один вариант ответа</p>' +
        '<div class="answers" role="radiogroup" aria-label="Варианты ответа">' + cards + '</div>' +
        '<div class="q-actions">' +
          '<button class="link-back" type="button" data-action="back">' + icon('i-arrow-left') + 'Назад</button>' +
          '<button class="btn btn--primary" type="button" data-action="next"' + (selected ? '' : ' disabled') + '>' +
            (last ? 'Узнать результат' : 'Далее&nbsp;&nbsp;→') +
          '</button>' +
        '</div>' +
      '</section>';
  }

  function renderLoading() {
    return '' +
      '<section class="screen screen--loading" aria-label="Считаем результат">' +
        '<span class="decor loading-decor-1"></span>' +
        '<span class="decor loading-decor-2"></span>' +
        '<img class="loading-art" src="assets/img/loading.webp" alt="" width="326" height="217">' +
        '<h1 class="loading-title">Анализируем<br>твои ответы…</h1>' +
        '<p class="loading-sub">Почти готово!</p>' +
        '<div class="progress loading-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="12" aria-label="Обработка ответов"><span></span></div>' +
      '</section>';
  }

  function renderResult() {
    var t = DATA.types[state.result];
    return '' +
      '<section class="screen screen--result" aria-label="Результат">' +
        '<span class="decor result-decor-1"></span>' +
        '<span class="decor result-decor-2"></span>' +
        '<span class="decor result-decor-3"></span>' +
        '<button class="icon-btn result-back" type="button" data-action="back" aria-label="Назад">' + icon('i-arrow-left') + '</button>' +
        '<span class="badge badge--outline result-badge">ТВОЙ ТИП</span>' +
        '<div class="result-art"><img src="' + t.image + '" alt="' + plainName(t.name) + '" width="' + t.imgW + '" height="' + t.imgH + '"></div>' +
        '<h1 class="result-name">' + t.name + '</h1>' +
        '<p class="result-desc">' + t.desc + '</p>' +
        '<div class="superpower">' +
          icon('i-star', 'superpower__star') +
          '<div class="superpower__label">ТВОЯ СУПЕРСИЛА</div>' +
          '<p class="superpower__text">' + t.superpower + '</p>' +
        '</div>' +
        '<div class="result-actions">' +
          '<button class="btn btn--primary btn--download" type="button" data-action="card">Скачать карточку ' + icon('i-download') + '</button>' +
        '</div>' +
      '</section>';
  }

  function renderCard() {
    var t = DATA.types[state.result];
    return '' +
      '<section class="screen screen--card" aria-label="Карточка">' +
        '<div class="topbar">' +
          '<button class="icon-btn" type="button" data-action="back" aria-label="Назад">' + icon('i-arrow-left') + '</button>' +
          '<span class="topbar__title">Готово!</span>' +
        '</div>' +
        '<h1 class="card-lead">Сохрани свою карточку<br>и поделись с друзьями</h1>' +
        '<div class="share-card">' +
          '<div class="share-card__inner">' +
            '<span class="badge share-card__badge">МОЙ ТИП</span>' +
            '<div class="share-card__name">' + t.name + '</div>' +
            '<img class="share-card__img" src="' + t.imageCard + '" alt="' + plainName(t.name) + '" width="' + t.cardImgW + '" height="' + t.cardImgH + '" style="width:' + t.cardImgW + 'px;height:' + t.cardImgH + 'px">' +
            '<div class="share-card__power">' +
              '<div class="share-card__power-label">' + icon('i-star') + 'МОЯ СУПЕРСИЛА</div>' +
              '<p class="share-card__power-text">' + (t.cardSuperpower || t.superpower) + '</p>' +
            '</div>' +
            '<div class="share-card__foot">Какой ты студент РГГУ →</div>' +
          '</div>' +
        '</div>' +
        '<div class="card-actions">' +
          '<button class="btn btn--primary" type="button" data-action="share">Поделиться ' + icon('i-share') + '</button>' +
          '<button class="btn btn--outline" type="button" data-action="exit">Выйти</button>' +
        '</div>' +
      '</section>';
  }

  var renderers = {
    cover: renderCover,
    how: renderHow,
    question: renderQuestion,
    loading: renderLoading,
    result: renderResult,
    card: renderCard
  };

  /* ---------- навигация ---------- */

  function setScreen(name, direction) {
    if (loadingTimer) {
      clearTimeout(loadingTimer);
      loadingTimer = null;
    }

    state.screen = name;
    app.innerHTML = renderers[name]();
    window.scrollTo(0, 0);

    var screenEl = app.firstElementChild;
    if (screenEl && direction < 0) screenEl.classList.add('is-back');

    updateBackButton();

    if (name === 'loading') startLoading();
    if (name === 'result') haptic('success');
    if (name === 'card') haptic('light');
  }

  function updateBackButton() {
    if (!tg || !tg.BackButton) return;
    try {
      if (state.screen === 'cover') tg.BackButton.hide();
      else tg.BackButton.show();
    } catch (e) { /* no-op */ }
  }

  function back() {
    haptic('light');
    switch (state.screen) {
      case 'how':
        setScreen('cover', -1);
        break;
      case 'question':
        if (state.q > 0) {
          state.q -= 1;
          setScreen('question', -1);
        } else {
          setScreen('how', -1);
        }
        break;
      case 'loading':
        setScreen('question', -1);
        break;
      case 'result':
        state.q = DATA.total - 1;
        setScreen('question', -1);
        break;
      case 'card':
        setScreen('result', -1);
        break;
      default:
        if (tg && typeof tg.close === 'function') tg.close();
    }
  }

  function pickAnswer(letter) {
    if (!DATA.questions[state.q].answers.some(function (a) { return a.letter === letter; })) return;
    state.answers[state.q] = letter;
    haptic('select');

    var cards = app.querySelectorAll('.answer');
    for (var i = 0; i < cards.length; i++) {
      cards[i].setAttribute('aria-checked', String(cards[i].getAttribute('data-letter') === letter));
    }

    var nextBtn = app.querySelector('[data-action="next"]');
    if (nextBtn) nextBtn.disabled = false;
  }

  function nextQuestion() {
    if (!state.answers[state.q]) return;
    haptic('light');
    if (state.q < DATA.total - 1) {
      state.q += 1;
      setScreen('question');
    } else {
      setScreen('loading');
    }
  }

  function computeResult() {
    var scores = {};
    DATA.priority.forEach(function (key) { scores[key] = 0; });

    state.answers.forEach(function (letter, index) {
      if (!letter) return;
      var answer = DATA.questions[index].answers.filter(function (a) { return a.letter === letter; })[0];
      if (!answer) return;
      answer.types.forEach(function (type) { scores[type] += 1; });
    });

    var best = DATA.priority[0];
    DATA.priority.forEach(function (key) {
      if (scores[key] > scores[best]) best = key;
    });
    return best;
  }

  function startLoading() {
    state.result = computeResult();

    var preload = new Image();
    preload.src = DATA.types[state.result].image;

    var bar = app.querySelector('.loading-bar > span');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (bar) bar.style.width = '100%';
      });
    });

    loadingTimer = setTimeout(function () {
      loadingTimer = null;
      setScreen('result');
    }, 1850);
  }

  function beginTest() {
    state.answers = new Array(DATA.total).fill(null);
    state.q = 0;
    state.result = null;
    setScreen('question');
  }

  function exitTest() {
    state.answers = new Array(DATA.total).fill(null);
    state.q = 0;
    state.result = null;
    setScreen('cover', -1);
  }

  /* ---------- карточка ---------- */

  function shareCard() {
    haptic('light');
    var btn = app.querySelector('[data-action="share"]');
    if (btn) btn.disabled = true;

    window.buildCardBlob(state.result).then(function (blob) {
      var name = 'rggu-' + state.result + '.png';
      var file = null;
      try {
        file = new File([blob], name, { type: 'image/png' });
      } catch (e) { /* старые WebView */ }

      if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
        return navigator.share({
          files: [file],
          text: 'Какой ты студент РГГУ? Мой тип — ' + DATA.types[state.result].name
        }).catch(function (err) {
          if (!err || err.name !== 'AbortError') download(blob);
        });
      }

      download(blob);
    }).catch(function (err) {
      console.error(err);
      notify('Не удалось собрать карточку. Попробуй ещё раз.');
    }).then(function () {
      if (btn) btn.disabled = false;
    });
  }

  /* ---------- события ---------- */

  app.addEventListener('click', function (event) {
    var el = event.target.closest ? event.target.closest('[data-action]') : null;
    if (!el || !app.contains(el)) return;

    var action = el.getAttribute('data-action');
    if (action === 'start') {
      haptic('light');
      setScreen('how');
    } else if (action === 'begin') {
      haptic('light');
      beginTest();
    } else if (action === 'answer') {
      pickAnswer(el.getAttribute('data-letter'));
    } else if (action === 'next') {
      nextQuestion();
    } else if (action === 'back') {
      back();
    } else if (action === 'card') {
      haptic('light');
      setScreen('card');
    } else if (action === 'share') {
      shareCard();
    } else if (action === 'exit') {
      haptic('light');
      exitTest();
    }
  });

  /* ---------- Telegram ---------- */

  function initTelegram() {
    if (!tg) return;
    try {
      tg.ready();
      tg.expand();
      if (typeof tg.setHeaderColor === 'function') tg.setHeaderColor('#fffcf7');
      if (typeof tg.setBackgroundColor === 'function') tg.setBackgroundColor('#fffcf7');
      if (typeof tg.disableVerticalSwipes === 'function') tg.disableVerticalSwipes();
      if (tg.BackButton && typeof tg.BackButton.onClick === 'function') {
        tg.BackButton.onClick(back);
      }
    } catch (e) {
      console.warn('Telegram WebApp API:', e);
    }
  }

  initTelegram();
  setScreen('cover');
})();
