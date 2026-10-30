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

    const rr = (ctx, x, y, w, h, r) => {
      ctx.beginPath();
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
    };

    P.img(data.scene, 0, 0, 1080, 1920, { fit: 'cover', at: 0 });

    // Small corner watermark; keep it out of the character's face.
    P.canvas(720, 1738, 310, 36, (ctx) => {
      ctx.clearRect(0, 0, 310, 36);
      ctx.globalAlpha = 0.32;
      ctx.fillStyle = '#22304A';
      ctx.font = '700 18px Arial';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText('SINOFIELDNOTES', 300, 18);
      ctx.globalAlpha = 1;
    });

    // Top and bottom channel strips.
    P.canvas(0, 0, 1080, 106, (ctx) => {
      ctx.clearRect(0, 0, 1080, 106);
      ctx.fillStyle = 'rgba(244,233,216,.94)';
      ctx.fillRect(0, 0, 1080, 106);
      ctx.fillStyle = 'rgba(34,48,74,.12)';
      ctx.fillRect(0, 103, 1080, 3);
    });
    P.canvas(0, 1810, 1080, 110, (ctx) => {
      ctx.clearRect(0, 0, 1080, 110);
      ctx.fillStyle = 'rgba(244,233,216,.94)';
      ctx.fillRect(0, 0, 1080, 110);
      ctx.fillStyle = 'rgba(34,48,74,.12)';
      ctx.fillRect(0, 0, 1080, 3);
    });

    P.text('SINOFIELDNOTES', {
      x: 64, y: 34, w: 620, align: 'l', size: 30, color: 'ink', weight: 700, at: t0,
    });
    P.text('EP.01', {
      x: 1016, y: 44, w: 160, align: 'r', size: 22, color: 'soft', at: t0,
    });
    P.canvas(600, 30, 280, 46, (ctx) => {
      ctx.clearRect(0, 0, 280, 46);
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(22 + i * 50, 23, 8, 0, Math.PI * 2);
        ctx.fillStyle = i < data.index ? '#C95845' : '#F4E9D8';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#B9AA96';
        ctx.stroke();
      }
    });

    // Irregular eraser block behind word + pinyin + English.
    P.canvas(30, 110, 1020, 490, (ctx) => {
      ctx.clearRect(0, 0, 1020, 490);
      const pts = [
        [44, 62], [170, 36], [320, 48], [468, 26], [616, 40], [760, 28],
        [896, 44], [966, 72], [952, 168], [966, 280], [944, 418],
        [824, 440], [666, 428], [514, 446], [360, 434], [214, 446],
        [72, 430], [44, 334], [58, 200],
      ];
      ctx.save();
      ctx.filter = 'blur(10px)';
      ctx.fillStyle = 'rgba(244,233,216,.80)';
      ctx.strokeStyle = 'rgba(244,233,216,.80)';
      ctx.lineWidth = 34;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // A few eraser streaks with softer edges.
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = '#F4E9D8';
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';
      ctx.filter = 'blur(6px)';
      for (const [x1, y1, x2, y2] of [
        [76, 74, 210, 52], [842, 58, 936, 86], [78, 412, 206, 426],
        [826, 420, 926, 398], [60, 220, 82, 300],
      ]) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.restore();
    });

    P.text(data.hanzi, {
      x: 520, y: 238, w: 860, align: 'c', size: 180, color: 'ink', weight: 700, at: t0, cps: 8,
    });
    P.text(data.pinyin, {
      x: 520, y: 446, w: 860, align: 'c', size: 62, color: 'red', weight: 600, at: t0 + 0.15, cps: 8,
    });
    P.text(data.meaning, {
      x: 520, y: 526, w: 860, align: 'c', size: 40, color: 'ink', weight: 600, at: t0 + 0.3, mode: 'fade',
    });
    if (data.note) {
      P.text(data.note, {
        x: 520, y: 574, w: 860, align: 'c', size: 22, color: 'red', weight: 600, at: t1, mode: 'fade',
      });
    }

    // Opaque bubble mat + bubble; the mat kills any background line at the edge.
    P.canvas(560, 620, 500, 280, (ctx, lt) => {
      ctx.clearRect(0, 0, 500, 280);
      if (lt < t1 + 0.15) return;
      const k = Math.min(1, (lt - (t1 + 0.15)) / 0.25);
      ctx.globalAlpha = k;
      ctx.fillStyle = '#FFF9EF';
      ctx.strokeStyle = '#22304A';
      ctx.lineWidth = 6;
      rr(ctx, 38, -6, 452, 246, 30);
      ctx.fill();
      rr(ctx, 50, 0, 430, 232, 24);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(50, 92);
      ctx.lineTo(10, 118);
      ctx.lineTo(50, 144);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.globalAlpha = 1;
    });
    P.text(data.question, {
      x: 825, y: 690, w: 430, align: 'c', size: 43, color: 'ink', weight: 600, at: t1 + 0.4, cps: 10,
    });
    P.text(data.questionPinyin, {
      x: 825, y: 754, w: 430, align: 'c', size: 24, color: 'red', weight: 600, at: t1 + 0.5, mode: 'fade',
    });

    // Frosted-glass answer card, bottom centre; same width as the word block.
    const glass = document.createElement('div');
    Object.assign(glass.style, {
      position: 'absolute',
      left: '74px',
      top: '1320px',
      width: '932px',
      height: '290px',
      borderRadius: '26px',
      background: 'rgba(255,249,239,.52)',
      backdropFilter: 'blur(12px) saturate(1.08)',
      WebkitBackdropFilter: 'blur(12px) saturate(1.08)',
      border: '1.5px solid rgba(255,255,255,.75)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.9), 0 18px 42px rgba(34,48,74,.16)',
      pointerEvents: 'none',
    });
    P.html.appendChild(glass);

    if (data.blankAnswer) {
      P.canvas(300, 1350, 480, 100, (ctx, lt) => {
        ctx.clearRect(0, 0, 480, 100);
        if (lt < t1 + 0.35 || lt > t2) return;
        const a = Math.min(1, (lt - (t1 + 0.35)) / 0.25);
        ctx.globalAlpha = a;
        ctx.strokeStyle = '#22304A';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(40, 62);
        ctx.lineTo(430, 62);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(445, 62, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#22304A';
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    } else {
      const blankA = P.text(data.answerLine, {
        x: 540, y: 1352, w: 900, align: 'c', size: 96, color: 'ink', weight: 800, at: t1 + 0.4, cps: 10,
      });
      const blankP = P.text(data.answerPinyinBlank, {
        x: 540, y: 1470, w: 900, align: 'c', size: 38, color: 'red', weight: 600, at: t1 + 0.5, mode: 'fade',
      });
      blankA.hide(t2, 0.18);
      blankP.hide(t2, 0.18);
    }
    P.text(data.fullAnswer, {
      x: 540, y: 1352, w: 900, align: 'c', size: 96, color: 'ink', weight: 800, at: t2, cps: 10,
    });
    P.text(data.answerPinyin, {
      x: 540, y: 1470, w: 900, align: 'c', size: 38, color: 'red', weight: 600, at: t2 + 0.08, mode: 'fade',
    });

    const qEnd = P.ce(1);
    const aStart = P.c(2);
    P.canvas(890, 1110, 190, 190, (ctx, lt) => {
      ctx.clearRect(0, 0, 190, 190);
      if (lt < qEnd || lt > aStart) return;
      const total = Math.max(0.01, aStart - qEnd);
      const remain = Math.max(0, aStart - lt);
      const frac = clamp(1 - remain / total);
      ctx.lineWidth = 11;
      ctx.strokeStyle = '#D8CBB8';
      ctx.beginPath();
      ctx.arc(95, 95, 72, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#C94C3B';
      ctx.beginPath();
      ctx.arc(95, 95, 72, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * frac);
      ctx.stroke();
      ctx.fillStyle = '#1F2A44';
      ctx.font = '700 76px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(Math.ceil(remain)), 95, 99);
    });

    if (data.reward) {
      P.canvas(690, 1550, 330, 140, (ctx, lt) => {
        ctx.clearRect(0, 0, 330, 140);
        const k = PV.K(lt, t3, 0.32);
        if (k <= 0) return;
        const s = 0.68 + 0.32 * k;
        ctx.save();
        ctx.translate(165, 70);
        ctx.rotate((-5 * Math.PI) / 180);
        ctx.scale(s, s);
        ctx.globalAlpha = Math.min(1, k * 1.6);
        ctx.shadowColor = 'rgba(34,48,74,.22)';
        ctx.shadowBlur = 14;
        ctx.shadowOffsetY = 9;
        ctx.fillStyle = 'rgba(255,249,239,.95)';
        ctx.strokeStyle = '#C95845';
        ctx.lineWidth = 5;
        rr(ctx, -150, -52, 300, 104, 18);
        ctx.fill();
        ctx.stroke();
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = 'rgba(201,88,69,.45)';
        ctx.lineWidth = 2;
        rr(ctx, -141, -43, 282, 86, 14);
        ctx.stroke();
        ctx.fillStyle = '#C95845';
        ctx.font = '700 34px "Microsoft YaHei", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('★ ' + data.reward, 0, 4);
        ctx.restore();
      });
    }

    P.text('SINOFIELDNOTES · 奶茶点单', {
      x: 540, y: 1844, w: 900, align: 'c', size: 22, color: 'soft', at: 0, mode: 'fade',
    });
  };

})(typeof window !== 'undefined' ? window : globalThis);
