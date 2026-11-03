ENGINE.visual('p01', (P) => {
  const t0 = P.c(0);

  P.img('assets/mascot/scenes/p01-window-rain-v3.png', 0, 0, 1080, 1920, {
    fit: 'cover', r: 0, border: false, shadow: false, at: 0,
  });

  P.canvas(0, 0, 1080, 1920, (ctx) => {
    ctx.clearRect(0, 0, 1080, 1920);
    ctx.fillStyle = 'rgba(233,222,205,.10)';
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
  P.text('EP.08', {
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

  P.text('EP.08 · RAINY DAY', {
    x: 540, y: 142, w: 900, align: 'c', size: 26, color: 'soft', weight: 700, at: t0, mode: 'fade',
  });
  P.text("Momo's Rainy Day", {
    x: 540, y: 195, w: 940, align: 'c', size: 64, color: 'ink', weight: 700, at: t0 + 0.05, cps: 8,
  });
  P.text('下雨天', {
    x: 540, y: 288, w: 900, align: 'c', size: 44, color: 'red', weight: 700, at: t0 + 0.2, mode: 'fade',
  });
  P.text('Momo wants to go out.', {
    x: 540, y: 370, w: 900, align: 'c', size: 30, color: 'ink', weight: 600, at: t0 + 0.35, mode: 'fade',
  });
  P.text("But it's raining.", {
    x: 540, y: 414, w: 900, align: 'c', size: 30, color: 'ink', weight: 600, at: t0 + 0.45, mode: 'fade',
  });
  P.text('5 words · 60 seconds', {
    x: 540, y: 490, w: 900, align: 'c', size: 22, color: 'soft', weight: 600, at: t0 + 0.6, mode: 'fade',
  });

  P.text('SINOFIELDNOTES · 下雨天', {
    x: 540, y: 1844, w: 900, align: 'c', size: 22, color: 'soft', weight: 700, at: 0, mode: 'fade',
  });
});
