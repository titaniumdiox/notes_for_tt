ENGINE.visual('p08', (P) => {
  const t0 = P.c(0);

  P.img('assets/mascot/scenes/p08-close-book-v2.png', 0, 0, 1080, 1920, {
    fit: 'cover', r: 0, border: false, shadow: false, at: 0,
  });

  P.canvas(0, 0, 1080, 1920, (ctx) => {
    ctx.clearRect(0, 0, 1080, 1920);
    ctx.fillStyle = 'rgba(232,230,223,.36)';
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

  P.text('SINOFIELDNOTES', { x: 64, y: 34, w: 620, align: 'l', size: 30, color: 'ink', weight: 700, at: t0 });
  P.text('EP.07', { x: 1016, y: 44, w: 160, align: 'r', size: 22, color: 'soft', at: t0 });

  P.text('A little poem,', {
    x: 540, y: 235, w: 900, align: 'c', size: 54, color: 'ink', weight: 700,
    font: 'latin', at: t0 + 0.1, mode: 'fade',
  });
  P.text('a little peace.', {
    x: 540, y: 305, w: 900, align: 'c', size: 54, color: 'red', weight: 700,
    font: 'latin', at: t0 + 0.35, mode: 'fade',
  });
  P.text("Momo's Afternoon Reading · 01", {
    x: 540, y: 390, w: 900, align: 'c', size: 22, color: 'soft', weight: 600,
    font: 'latin', at: t0 + 0.6, mode: 'fade',
  });

  P.text('SINOFIELDNOTES · 静夜思', { x: 540, y: 1844, w: 900, align: 'c', size: 20, color: 'soft', at: 0, mode: 'fade' });
});
