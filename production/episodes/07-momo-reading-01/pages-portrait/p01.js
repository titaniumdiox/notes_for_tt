ENGINE.visual('p01', (P) => {
  const t0 = P.c(0);

  P.img('assets/mascot/scenes/p01-reading-nook-v2.png', 0, 0, 1080, 1920, {
    fit: 'cover', r: 0, border: false, shadow: false, at: 0,
  });

  P.canvas(0, 0, 1080, 1920, (ctx) => {
    ctx.clearRect(0, 0, 1080, 1920);
    ctx.fillStyle = 'rgba(232,230,223,.12)';
    ctx.fillRect(0, 0, 1080, 1920);
  });

  P.canvas(0, 0, 1080, 106, (ctx) => {
    ctx.clearRect(0, 0, 1080, 106);
    ctx.fillStyle = 'rgba(232,230,223,.94)';
    ctx.fillRect(0, 0, 1080, 106);
    ctx.fillStyle = 'rgba(43,52,64,.12)';
    ctx.fillRect(0, 103, 1080, 3);
  });
  P.canvas(0, 1810, 1080, 110, (ctx) => {
    ctx.clearRect(0, 0, 1080, 110);
    ctx.fillStyle = 'rgba(232,230,223,.94)';
    ctx.fillRect(0, 0, 1080, 110);
    ctx.fillStyle = 'rgba(43,52,64,.12)';
    ctx.fillRect(0, 0, 1080, 3);
  });

  P.text('SINOFIELDNOTES', {
    x: 64, y: 34, w: 620, align: 'l', size: 31, color: 'ink', weight: 800, at: t0,
  });
  P.text('EP.07', {
    x: 1016, y: 44, w: 160, align: 'r', size: 22, color: 'soft', weight: 700, at: t0,
  });
  P.canvas(600, 30, 280, 46, (ctx) => {
    ctx.clearRect(0, 0, 280, 46);
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(22 + i * 50, 23, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#E8E6DF';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#B9AA96';
      ctx.stroke();
    }
  });

  P.text('READING 01 · 静夜思', {
    x: 540, y: 142, w: 900, align: 'c', size: 26, color: 'soft', weight: 700, at: t0, mode: 'fade',
  });
  P.text("Momo's Afternoon", {
    x: 540, y: 182, w: 960, align: 'c', size: 54, color: 'ink', weight: 700, at: t0 + 0.05, cps: 8,
  });
  P.text('Reading', {
    x: 540, y: 242, w: 960, align: 'c', size: 54, color: 'red', weight: 700,
    font: 'latin', at: t0 + 0.2, mode: 'fade',
  });
  P.text('Momo的午后阅读时间', {
    x: 540, y: 318, w: 900, align: 'c', size: 36, color: 'ink', weight: 700, at: t0 + 0.35, mode: 'fade',
  });
  P.text('静夜思', {
    x: 540, y: 372, w: 900, align: 'c', size: 58, color: 'red', weight: 700, at: t0 + 0.5, mode: 'fade',
  });
  P.text('Quiet Night Thoughts', {
    x: 540, y: 434, w: 900, align: 'c', size: 24, color: 'soft', weight: 600,
    font: 'latin', at: t0 + 0.65, mode: 'fade',
  });
  P.text('唐 · 李白', {
    x: 540, y: 480, w: 900, align: 'c', size: 38, color: 'ink', weight: 700, at: t0 + 0.75, mode: 'fade',
  });
  P.text('LiBai from Tang Dynasty', {
    x: 540, y: 532, w: 900, align: 'c', size: 22, color: 'soft', weight: 600,
    font: 'latin', at: t0 + 0.9, mode: 'fade',
  });
  P.text('A little poem, a little peace.', {
    x: 540, y: 580, w: 900, align: 'c', size: 20, color: 'soft', weight: 600,
    font: 'latin', at: t0 + 1.0, mode: 'fade',
  });

  P.text('SINOFIELDNOTES · 静夜思', {
    x: 540, y: 1844, w: 900, align: 'c', size: 20, color: 'soft', weight: 700, at: 0, mode: 'fade',
  });
});
