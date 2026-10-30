(function (root) {
  root.renderWordPage = function (P, data) {
    const t0 = P.c(0);
    const t1 = P.c(1);
    const t2 = P.c(2);
    const { clamp } = PV;

    // Header + progress dots.
    P.text('MILK TEA · ' + data.index + '/5', {
      x: 540, y: 105, w: 700, align: 'c', size: 24, color: 'muted', at: t0,
    });
    for (let i = 0; i < 5; i++) {
      P.circle(390 + i * 75, 165, 20, {
        fill: i < data.index ? 'red' : 'softF',
        color: 'soft', sw: 1.4, at: t0,
      });
    }

    // Word, pinyin, meaning.
    P.text(data.hanzi, {
      x: 540, y: 300, w: 900, align: 'c', size: 240, color: 'ink', weight: 700, at: t0, cps: 8,
    });
    P.text(data.pinyin, {
      x: 540, y: 625, w: 900, align: 'c', size: 58, color: 'red', at: t0 + 0.15, cps: 8,
    });
    P.text(data.meaning, {
      x: 540, y: 720, w: 900, align: 'c', size: 38, color: 'muted', at: t0 + 0.3, cps: 10,
    });

    // Question with a blank.
    P.text(data.question, {
      x: 540, y: 930, w: 920, align: 'c', size: 40, color: 'ink', at: t1, cps: 10,
    });

    // Countdown between question audio end and answer start.
    const qEnd = P.ce(1);
    const aStart = P.c(2);
    P.canvas(440, 1030, 200, 200, (ctx, lt) => {
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

    // Answer reveal.
    P.text(data.answer, {
      x: 540, y: 1310, w: 900, align: 'c', size: 96, color: 'green', weight: 700, at: t2, cps: 8,
    });
    P.text('say it', {
      x: 540, y: 1440, w: 900, align: 'c', size: 24, color: 'muted', at: t2 + 0.2, cps: 10,
    });
  };
})(typeof window !== 'undefined' ? window : globalThis);
