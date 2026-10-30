ENGINE.visual('p01', (P) => {
  const t0 = P.c(0);

  P.img('assets/mascot/scenes/p01-hotpot-hook-v1.png', 0, 0, 1080, 1920, {
    fit: 'cover', r: 0, border: false, shadow: false, at: 0,
  });

  P.canvas(0, 0, 1080, 1920, (ctx) => {
    ctx.clearRect(0, 0, 1080, 1920);
    ctx.fillStyle = 'rgba(233,222,205,.14)';
    ctx.fillRect(0, 0, 1080, 1920);
  });

  P.canvas(0, 0, 1080, 106, (ctx) => {
    ctx.clearRect(0, 0, 1080, 106);
    ctx.fillStyle = 'rgba(233,222,205,.94)';
    ctx.fillRect(0, 0, 1080, 106);
    ctx.fillStyle = 'rgba(43,52,64,.12)';
    ctx.fillRect(0, 103, 1080, 3);
  });
  P.canvas(0, 1810, 1080, 110, (ctx) => {
    ctx.clearRect(0, 0, 1080, 110);
    ctx.fillStyle = 'rgba(233,222,205,.94)';
    ctx.fillRect(0, 0, 1080, 110);
    ctx.fillStyle = 'rgba(43,52,64,.12)';
    ctx.fillRect(0, 0, 1080, 3);
  });

  P.text('SINOFIELDNOTES', {
    x: 64, y: 34, w: 620, align: 'l', size: 31, color: 'ink', weight: 800, at: t0,
  });
  P.text('EP.06', {
    x: 1016, y: 44, w: 160, align: 'r', size: 22, color: 'soft', weight: 700, at: t0,
  });
  P.canvas(600, 30, 280, 46, (ctx) => {
    ctx.clearRect(0, 0, 280, 46);
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(22 + i * 50, 23, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#E9DECD';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#B9AA96';
      ctx.stroke();
    }
  });

  P.text('EP.06 · HOTPOT', {
    x: 540, y: 142, w: 900, align: 'c', size: 27, color: 'soft', weight: 700, at: t0, mode: 'fade',
  });
  P.text('Momo今天想吃火锅！', {
    x: 540, y: 200, w: 900, align: 'c', size: 84, color: 'red', weight: 800, at: t0 + 0.05, cps: 8,
  });
  P.text('Momo wants hotpot today.', {
    x: 540, y: 360, w: 940, align: 'c', size: 38, color: 'ink', weight: 700, at: t0 + 0.25, mode: 'fade',
  });
  P.text('Can you order it in Chinese?', {
    x: 540, y: 412, w: 940, align: 'c', size: 38, color: 'ink', weight: 700, at: t0 + 0.38, mode: 'fade',
  });
  P.text('在火锅店点一锅鸳鸯锅', {
    x: 540, y: 500, w: 940, align: 'c', size: 36, color: 'red', weight: 700, at: t0 + 0.5, mode: 'fade',
  });
  P.text('5 words · 1 sentence · 60 seconds', {
    x: 540, y: 565, w: 940, align: 'c', size: 22, color: 'soft', weight: 700, at: t0 + 0.65, mode: 'fade',
  });

  P.text('SINOFIELDNOTES · 中国火锅', {
    x: 540, y: 1844, w: 900, align: 'c', size: 22, color: 'soft', weight: 700, at: 0, mode: 'fade',
  });
});
