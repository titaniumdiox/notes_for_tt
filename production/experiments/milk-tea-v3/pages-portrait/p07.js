ENGINE.visual('p07', (P) => {
  const t0 = P.c(0);

  // Scene as a soft, low-contrast backdrop.
  const bg = P.img('assets/mascot/scenes/p07-v1.png', 0, 0, 1080, 1920, {
    fit: 'cover', r: 0, border: false, shadow: false, at: 0,
  });
  if (bg && bg.el) bg.el.style.filter = 'blur(10px) saturate(.9)';

  // Warm paper veil over the blurred scene.
  P.canvas(0, 0, 1080, 1920, (ctx) => {
    ctx.clearRect(0, 0, 1080, 1920);
    ctx.fillStyle = 'rgba(244,233,216,.42)';
    ctx.fillRect(0, 0, 1080, 1920);
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
      ctx.fillStyle = '#C95845';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#B9AA96';
      ctx.stroke();
    }
  });

  // Frosted sentence card.
  const glass = document.createElement('div');
  Object.assign(glass.style, {
    position: 'absolute',
    left: '70px',
    top: '360px',
    width: '940px',
    height: '760px',
    borderRadius: '32px',
    background: 'rgba(255,249,239,.40)',
    backdropFilter: 'blur(14px) saturate(1.05)',
    WebkitBackdropFilter: 'blur(14px) saturate(1.05)',
    border: '1.5px solid rgba(255,255,255,.72)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,.9), 0 20px 55px rgba(34,48,74,.18)',
    pointerEvents: 'none',
  });
  P.html.appendChild(glass);

  P.text('PUT IT TOGETHER', {
    x: 540, y: 390, w: 900, align: 'c', size: 32, color: 'soft', weight: 600, at: t0, mode: 'fade',
  });
  P.text('一杯奶茶，半糖少冰，', {
    x: 540, y: 455, w: 900, align: 'c', size: 66, color: 'ink', weight: 700, at: t0 + 0.1, cps: 8,
  });
  P.text('yì bēi nǎichá, bàntáng shǎo bīng,', {
    x: 540, y: 535, w: 900, align: 'c', size: 28, color: 'red', weight: 600, at: t0 + 0.3, mode: 'fade',
  });
  P.text('打包，谢谢。', {
    x: 540, y: 615, w: 900, align: 'c', size: 66, color: 'red', weight: 700, at: t0 + 0.55, cps: 8,
  });
  P.text('dǎbāo, xièxie.', {
    x: 540, y: 695, w: 900, align: 'c', size: 28, color: 'red', weight: 600, at: t0 + 0.75, mode: 'fade',
  });
  P.text('One milk tea, half sugar, less ice, to go, thanks.', {
    x: 540, y: 780, w: 900, align: 'c', size: 29, color: 'ink', weight: 600, at: t0 + 1.0, mode: 'fade',
  });
  P.text('✓', {
    x: 540, y: 880, w: 900, align: 'c', size: 92, color: 'green', weight: 700, at: t0 + 1.5, mode: 'fade',
  });
  P.text('You can say it now.', {
    x: 540, y: 990, w: 900, align: 'c', size: 32, color: 'green', weight: 600, at: t0 + 1.7, mode: 'fade',
  });

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
  P.text('SINOFIELDNOTES · 奶茶点单', {
    x: 540, y: 1844, w: 900, align: 'c', size: 22, color: 'soft', at: 0, mode: 'fade',
  });
});
