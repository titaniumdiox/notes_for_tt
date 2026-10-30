(function (root) {
  root.renderWordPage = function (P, data) {
    const t0 = P.c(0);
    const t1 = P.c(1);
    const t2 = P.c(2);
    const t3 = P.c(3);
    const { clamp } = PV;

    // Header + progress.
    P.text('MILK TEA · ' + data.index + '/5', {
      x: 540, y: 95, w: 700, align: 'c', size: 27, color: 'soft', at: t0,
    });
    for (let i = 0; i < 5; i++) {
      P.circle(390 + i * 75, 152, 20, {
        fill: i < data.index ? 'red' : 'softF', color: 'soft', sw: 1.4, at: t0,
      });
    }

    // Word block.
    P.text(data.hanzi, {
      x: 540, y: 225, w: 900, align: 'c', size: 210, color: 'ink', weight: 700, at: t0, cps: 8,
    });
    P.text(data.pinyin, {
      x: 540, y: 545, w: 900, align: 'c', size: 64, color: 'red', weight: 600, at: t0 + 0.15, cps: 8,
    });
    P.text(data.meaning, {
      x: 540, y: 635, w: 900, align: 'c', size: 42, color: 'ink', weight: 600, at: t0 + 0.3, mode: 'fade',
    });
    if (data.note) {
      P.text(data.note, {
        x: 540, y: 682, w: 900, align: 'c', size: 22, color: 'red', at: t1, mode: 'fade',
      });
    }

    // Placeholder cat, sliding in from the left edge on every word.
    const cat = P.layer();
    cat.line(52, 930, 120, 1010, { color: 'muted', sw: 10 });
    cat.box(-52, 885, 104, 150, { fill: 'softF', color: 'muted', r: 38, sw: 3, at: t1 });
    cat.path('M-62 790 L-78 720 L-20 748 Z', { fill: 'softF', color: 'muted', sw: 3, at: t1 });
    cat.path('M62 790 L78 720 L20 748 Z', { fill: 'softF', color: 'muted', sw: 3, at: t1 });
    cat.circle(0, 835, 88, { fill: 'softF', color: 'muted', sw: 3, at: t1 });
    cat.circle(-18, 825, 10, { fill: 'muted', at: t1 + 0.1 });
    cat.circle(18, 825, 10, { fill: 'muted', at: t1 + 0.1 });
    cat.text('MOMO', { x: 0, y: 1030, w: 120, align: 'c', size: 18, color: 'muted', at: t1 + 0.2 });
    cat.text('PLACEHOLDER', { x: 0, y: 1058, w: 140, align: 'c', size: 12, color: 'muted', at: t1 + 0.2 });
    P.move(cat, (lt) => ({ x: -280 + 430 * clamp((lt - t1) / 0.28), y: 0, s: 1, op: 1 }));

    // Question bubble from the cat/clerk.
    P.box(300, 790, 660, 200, {
      fill: 'paper', color: 'ink', r: 24, sw: 3, at: t1 + 0.2, dur: 0.4,
    });
    P.path('M300 880 l-36 24 l36 24', { color: 'ink', at: t1 + 0.3, dur: 0.2, sw: 3 });
    P.text(data.question, {
      x: 630, y: 850, w: 560, align: 'c', size: 32, color: 'ink', at: t1 + 0.4, cps: 10,
    });

    // Answer line, separate from the question.
    P.text('你', { x: 94, y: 1082, w: 64, align: 'c', size: 26, color: 'green', weight: 700, at: t1 + 0.4, mode: 'fade' });
    P.text(data.answerLine, {
      x: 240, y: 1080, w: 700, align: 'l', size: 36, color: 'ink', at: t1 + 0.5, cps: 10,
    });

    // Countdown.
    const qEnd = P.ce(1);
    const aStart = P.c(2);
    P.canvas(440, 1190, 200, 200, (ctx, lt) => {
      ctx.clearRect(0, 0, 200, 200);
      if (lt < qEnd || lt > aStart) return;
      const total = Math.max(0.01, aStart - qEnd);
      const remain = Math.max(0, aStart - lt);
      const frac = clamp(1 - remain / total);
      ctx.lineWidth = 12;
      ctx.strokeStyle = '#D8CBB8';
      ctx.beginPath();
      ctx.arc(100, 100, 78, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#C94C3B';
      ctx.beginPath();
      ctx.arc(100, 100, 78, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * frac);
      ctx.stroke();
      ctx.fillStyle = '#1F2A44';
      ctx.font = '700 82px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(Math.ceil(remain)), 100, 104);
    });

    // Answer + reward.
    P.text(data.answer, {
      x: 540, y: 1400, w: 900, align: 'c', size: 82, color: 'green', weight: 700, at: t2, cps: 8,
    });
    P.text('say it', {
      x: 540, y: 1490, w: 900, align: 'c', size: 27, color: 'soft', at: t2 + 0.2, mode: 'fade',
    });
    if (data.reward) {
      P.text('★', {
        x: 430, y: 1540, w: 60, align: 'c', size: 30, color: 'orange', at: t3, mode: 'fade',
      });
      P.text(data.reward, {
        x: 590, y: 1540, w: 360, align: 'c', size: 30, color: 'red', weight: 700, at: t3, mode: 'fade',
      });
    }

    // Paper wipe is intentionally deferred: the in-page flash sat above the
    // cat layer and produced a blank frame. It will be post-processed later.
  };

  root.renderSceneWordPage = function (P, data) {
    const t0 = P.c(0);
    const t1 = P.c(1);
    const t2 = P.c(2);
    const t3 = P.c(3);
    const { clamp } = PV;

    // Full-bleed AI scene; text overlays sit in the clean right/top areas.
    P.img(data.scene, 0, 0, 1080, 1920, { fit: 'cover', at: 0 });

    P.canvas(650, 84, 340, 52, (ctx) => {
      ctx.clearRect(0, 0, 340, 52);
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(24 + i * 58, 26, 9, 0, Math.PI * 2);
        ctx.fillStyle = i < data.index ? '#C95845' : '#F4E9D8';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#B9AA96';
        ctx.stroke();
      }
    });

    P.text('MILK TEA · ' + data.index + '/5', {
      x: 820, y: 66, w: 360, align: 'c', size: 27, color: 'soft', at: t0,
    });

    P.text(data.hanzi, {
      x: 520, y: 205, w: 860, align: 'c', size: 180, color: 'ink', weight: 700, at: t0, cps: 8,
    });
    P.text(data.pinyin, {
      x: 520, y: 430, w: 860, align: 'c', size: 62, color: 'red', weight: 600, at: t0 + 0.15, cps: 8,
    });
    P.text(data.meaning, {
      x: 520, y: 510, w: 860, align: 'c', size: 40, color: 'ink', weight: 600, at: t0 + 0.3, mode: 'fade',
    });

    // Question bubble in the right-hand clean area. Drawn on a canvas, because
    // P.img lives in the HTML layer and would cover an SVG P.box.
    P.canvas(580, 680, 460, 220, (ctx, lt) => {
      ctx.clearRect(0, 0, 460, 220);
      if (lt < t1 + 0.15) return;
      const k = Math.min(1, (lt - (t1 + 0.15)) / 0.25);
      ctx.globalAlpha = k;
      ctx.fillStyle = '#FFF9EF';
      ctx.strokeStyle = '#22304A';
      ctx.lineWidth = 6;
      ctx.beginPath();
      const x = 50, y = 0, w = 410, h = 190, r = 24;
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(50, 78);
      ctx.lineTo(10, 105);
      ctx.lineTo(50, 132);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.globalAlpha = 1;
    });
    P.text(data.question, {
      x: 835, y: 785, w: 350, align: 'c', size: 31, color: 'ink', at: t1 + 0.4, cps: 10,
    });

    P.text(data.answerLine, {
      x: 660, y: 930, w: 380, align: 'l', size: 34, color: 'ink', at: t1 + 0.4, cps: 10,
    });

    const qEnd = P.ce(1);
    const aStart = P.c(2);
    P.canvas(870, 1080, 180, 180, (ctx, lt) => {
      ctx.clearRect(0, 0, 180, 180);
      if (lt < qEnd || lt > aStart) return;
      const total = Math.max(0.01, aStart - qEnd);
      const remain = Math.max(0, aStart - lt);
      const frac = clamp(1 - remain / total);
      ctx.lineWidth = 11;
      ctx.strokeStyle = '#D8CBB8';
      ctx.beginPath();
      ctx.arc(90, 90, 70, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#C94C3B';
      ctx.beginPath();
      ctx.arc(90, 90, 70, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * frac);
      ctx.stroke();
      ctx.fillStyle = '#1F2A44';
      ctx.font = '700 74px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(Math.ceil(remain)), 90, 94);
    });

    P.text(data.answer, {
      x: 840, y: 1275, w: 360, align: 'c', size: 92, color: 'green', weight: 700, at: t2, cps: 8,
    });
    P.text('say it', {
      x: 840, y: 1375, w: 360, align: 'c', size: 27, color: 'soft', at: t2 + 0.2, mode: 'fade',
    });
    if (data.reward) {
      P.text('★', {
        x: 728, y: 1460, w: 54, align: 'c', size: 28, color: 'orange', at: t3, mode: 'fade',
      });
      P.text(data.reward, {
        x: 860, y: 1460, w: 290, align: 'c', size: 29, color: 'red', weight: 700, at: t3, mode: 'fade',
      });
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
