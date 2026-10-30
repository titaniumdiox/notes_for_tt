ENGINE.visual('p01', (P) => {
  const t0 = P.c(0);

  // Keep the blurred Momo/cover atmosphere from the old intro.
  const bg = P.img('assets/mascot/cover.png', 0, 0, 1080, 1920, {
    fit: 'cover', r: 0, border: false, shadow: false, at: 0,
  });
  if (bg && bg.el) bg.el.style.filter = 'blur(26px) saturate(.82)';

  P.canvas(0, 0, 1080, 1920, (ctx) => {
    ctx.clearRect(0, 0, 1080, 1920);
    ctx.fillStyle = 'rgba(244,233,216,.72)';
    ctx.fillRect(0, 0, 1080, 1920);
  });

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
    x: 64, y: 34, w: 620, align: 'l', size: 31, color: 'ink', weight: 800, at: t0,
  });
  P.text('EP.01', {
    x: 1016, y: 44, w: 160, align: 'r', size: 22, color: 'soft', weight: 700, at: t0,
  });
  P.canvas(600, 30, 280, 46, (ctx) => {
    ctx.clearRect(0, 0, 280, 46);
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(22 + i * 50, 23, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#F4E9D8';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#B9AA96';
      ctx.stroke();
    }
  });

  P.text('EP.01 · MILK TEA SHOP', {
    x: 540, y: 146, w: 900, align: 'c', size: 27, color: 'soft', weight: 700, at: t0, mode: 'fade',
  });
  P.text('5 个词，', {
    x: 540, y: 188, w: 900, align: 'c', size: 110, color: 'red', weight: 800, at: t0 + 0.05, cps: 8,
  });
  P.text('60 秒', {
    x: 540, y: 304, w: 900, align: 'c', size: 110, color: 'ink', weight: 800, at: t0 + 0.1, cps: 8,
  });
  P.text('在奶茶店开口说中文', {
    x: 540, y: 430, w: 900, align: 'c', size: 46, color: 'ink', weight: 700, at: t0 + 0.2, mode: 'fade',
  });
  P.text('You want milk tea in China.', {
    x: 540, y: 508, w: 940, align: 'c', size: 38, color: 'ink', weight: 700, at: t0 + 0.3, mode: 'fade',
  });
  P.text('But how do you order it?', {
    x: 540, y: 556, w: 940, align: 'c', size: 38, color: 'ink', weight: 700, at: t0 + 0.38, mode: 'fade',
  });
  P.text('你想喝奶茶，但不知道怎么点？', {
    x: 540, y: 632, w: 940, align: 'c', size: 26, color: 'soft', weight: 600, at: t0 + 0.46, mode: 'fade',
  });

  P.canvas(70, 690, 940, 3, (ctx) => {
    ctx.clearRect(0, 0, 940, 3);
    ctx.fillStyle = 'rgba(201,88,69,.55)';
    ctx.fillRect(0, 0, 940, 3);
  });

  // Sharp thinking Momo in the lower cream area.
  P.img('assets/mascot/scenes/p01-thinking-cutout.png', 325, 1050, 430, 621, {
    fit: 'contain', r: 0, border: false, shadow: false, at: t0 + 0.05,
  });

  // Small thought bubble above Momo's head.
  P.canvas(700, 930, 170, 130, (ctx, lt) => {
    ctx.clearRect(0, 0, 170, 130);
    const k = PV.K(lt, t0 + 0.55, 0.25);
    if (k <= 0) return;
    ctx.globalAlpha = k;
    ctx.fillStyle = '#FFF9EF';
    ctx.strokeStyle = '#22304A';
    ctx.lineWidth = 5;
    for (const [x, y, r] of [[70, 55, 42], [108, 42, 30], [44, 38, 26]]) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(54, 84);
    ctx.lineTo(24, 112);
    ctx.lineTo(70, 92);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#C95845';
    ctx.font = '700 56px "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('?', 72, 54);
    ctx.globalAlpha = 1;
  });

  P.text('SINOFIELDNOTES · 奶茶点单', {
    x: 540, y: 1844, w: 900, align: 'c', size: 22, color: 'soft', weight: 700, at: 0, mode: 'fade',
  });
});
