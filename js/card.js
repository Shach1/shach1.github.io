/* ============================================================
   Рендер карточки результата в PNG (canvas).
   Метрики повторяют фрейм «Карточка …» из макета:
   карточка 306 × 472, внутренняя область 282 × 448.
   ============================================================ */
(function () {
  'use strict';

  var DATA = window.TEST_DATA;
  var SCALE = 3;
  var W = 306;
  var H = 472;

  var COLORS = {
    card: '#ffffff',
    cardLine: '#dcd5f0',
    inner: '#f8f4ff',
    accent: '#5e39bf',
    accentSoft: '#e9e1ff',
    ink: '#302647',
    inkStrong: '#332b46',
    lineSoft: '#e8e1f0'
  };

  var EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu;

  /* ---------- загрузка ресурсов ---------- */

  function loadFonts(text) {
    if (!document.fonts || typeof document.fonts.load !== 'function') return Promise.resolve();
    return Promise.all([
      document.fonts.load('800 24px Nunito', text),
      document.fonts.load('700 12px Inter', text),
      document.fonts.load('600 10px Inter', text),
      document.fonts.load('500 10px Inter', text)
    ]).then(function () {
      return document.fonts.ready;
    }).catch(function () {
      /* если шрифты не подгрузились — рисуем системными */
    });
  }

  function loadImage(src) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = function () { reject(new Error('Не удалось загрузить ' + src)); };
      img.src = src;
    });
  }

  /* ---------- рисование ---------- */

  function roundRect(ctx, x, y, w, h, r) {
    var rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.lineTo(x + w - rr, y);
    ctx.arcTo(x + w, y, x + w, y + rr, rr);
    ctx.lineTo(x + w, y + h - rr);
    ctx.arcTo(x + w, y + h, x + w - rr, y + h, rr);
    ctx.lineTo(x + rr, y + h);
    ctx.arcTo(x, y + h, x, y + h - rr, rr);
    ctx.lineTo(x, y + rr);
    ctx.arcTo(x, y, x + rr, y, rr);
    ctx.closePath();
  }

  function drawStar(ctx, x, y, size) {
    var s = size / 24;
    var points = [
      [12, 0], [14.04, 9.96], [24, 12], [14.04, 14.04],
      [12, 24], [9.96, 14.04], [0, 12], [9.96, 9.96]
    ];
    ctx.beginPath();
    for (var i = 0; i < points.length; i++) {
      var px = x + points[i][0] * s;
      var py = y + points[i][1] * s;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  }

  function setFont(ctx, weight, size, family, letterSpacing) {
    ctx.font = weight + ' ' + size + 'px ' + family;
    if ('letterSpacing' in ctx) ctx.letterSpacing = letterSpacing || '0px';
  }

  function fitFont(ctx, text, weight, maxWidth, startSize, family, minSize) {
    var size = startSize;
    setFont(ctx, weight, size, family);
    while (ctx.measureText(text).width > maxWidth && size > (minSize || 14)) {
      size -= 0.5;
      setFont(ctx, weight, size, family);
    }
    return size;
  }

  function wrapLines(ctx, text, maxWidth, maxLines) {
    var words = String(text).split(/\s+/);
    var lines = [];
    var i = 0;

    while (i < words.length && lines.length < maxLines) {
      var line = words[i];
      i += 1;
      while (i < words.length) {
        var test = line + ' ' + words[i];
        if (ctx.measureText(test).width <= maxWidth) {
          line = test;
          i += 1;
        } else {
          break;
        }
      }
      lines.push(line);
    }

    /* если текст не поместился — обрезаем последнюю строку */
    if (i < words.length && lines.length) {
      var last = lines[lines.length - 1];
      while (last.length > 1 && ctx.measureText(last + '…').width > maxWidth) {
        last = last.slice(0, -1);
      }
      lines[lines.length - 1] = last.replace(/[\s,.;:!?-]+$/, '') + '…';
    }

    return lines;
  }

  function drawCard(ctx, type, image) {
    ctx.clearRect(0, 0, W, H);

    /* корпус карточки */
    roundRect(ctx, 0, 0, W, H, 26);
    ctx.fillStyle = COLORS.card;
    ctx.fill();

    roundRect(ctx, 0.5, 0.5, W - 1, H - 1, 25.5);
    ctx.lineWidth = 1;
    ctx.strokeStyle = COLORS.cardLine;
    ctx.stroke();

    /* внутреннее поле */
    roundRect(ctx, 12, 12, 282, 448, 22);
    ctx.fillStyle = COLORS.inner;
    ctx.fill();

    /* бейдж «МОЙ ТИП» */
    roundRect(ctx, 97, 24, 102, 30, 14);
    ctx.fillStyle = COLORS.accentSoft;
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = COLORS.accent;
    setFont(ctx, 600, 10, 'Inter', '0.4px');
    ctx.fillText('МОЙ ТИП', W / 2, 39);

    /* имя типа */
    var name = type.name.replace(/\s+/g, ' ').replace(/\s+([\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}])/gu, '  $1');
    fitFont(ctx, name, 800, 226, 24, 'Nunito', 17);
    ctx.fillStyle = COLORS.ink;
    ctx.textAlign = 'center';
    ctx.fillText(name, W / 2, 81);

    /* иллюстрация */
    if (image) {
      var iw = type.cardImgW;
      var ih = type.cardImgH;
      ctx.drawImage(image, Math.round((W - iw) / 2), 104, iw, ih);
    }

    /* блок суперсилы */
    roundRect(ctx, 39, 345, 228, 64, 16);
    ctx.fillStyle = COLORS.card;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = COLORS.lineSoft;
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = COLORS.accent;
    setFont(ctx, 700, 10, 'Inter', '0.2px');
    var label = 'МОЯ СУПЕРСИЛА';
    var labelWidth = ctx.measureText(label).width;
    ctx.fillText(label, 51, 361);
    drawStar(ctx, 51 + labelWidth + 4.4, 355, 12);

    ctx.fillStyle = COLORS.inkStrong;
    setFont(ctx, 500, 10, 'Inter', '0px');
    var lines = wrapLines(ctx, type.cardSuperpower || type.superpower, 204, 2);
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], 51, 371 + 7 + i * 14);
    }

    /* футер */
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = COLORS.accent;
    setFont(ctx, 600, 12, 'Inter', '0px');
    ctx.fillText('Какой ты студент РГГУ →', W / 2, 434.5);
  }

  /* ---------- публичный API ---------- */

  window.buildCardBlob = function (typeKey) {
    var type = DATA.types[typeKey];
    if (!type) return Promise.reject(new Error('Неизвестный тип: ' + typeKey));

    var fontSample = type.name.replace(EMOJI, '') + ' ' + type.superpower + ' МОЙ ТИП МОЯ СУПЕРСИЛА Какой ты студент РГГУ 0123456789';

    return Promise.all([
      loadFonts(fontSample),
      loadImage(type.imageCard)
    ]).then(function (res) {
      var image = res[1];
      var canvas = document.createElement('canvas');
      canvas.width = W * SCALE;
      canvas.height = H * SCALE;

      var ctx = canvas.getContext('2d');
      ctx.scale(SCALE, SCALE);
      ctx.imageSmoothingEnabled = true;
      if ('imageSmoothingQuality' in ctx) ctx.imageSmoothingQuality = 'high';

      drawCard(ctx, type, image);

      return new Promise(function (resolve, reject) {
        if (typeof canvas.toBlob === 'function') {
          canvas.toBlob(function (blob) {
            if (blob) resolve(blob);
            else reject(new Error('canvas.toBlob вернул null'));
          }, 'image/png');
        } else {
          reject(new Error('canvas.toBlob не поддерживается'));
        }
      });
    });
  };
})();
