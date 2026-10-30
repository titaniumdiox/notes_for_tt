// p01 asset: p01-thinking-cutout (v2 regen, dot eyes, diagonal)
ENGINE.visual('p01', (P) => {
  const t0 = P.c(0);
  const t1 = t0 + 1.35;

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

  P.text('MILK TEA SHOP', {
    x: 540, y: 210, w: 900, align: 'c', size: 32, color: 'soft', weight: 700, at: t0, mode: 'fade',
  });
  P.text('MILK TEA', {
    x: 540, y: 330, w: 900, align: 'c', size: 96, color: 'red', weight: 700, at: t0 + 0.08, cps: 7,
  });
  P.text('When you walk into a milk tea shop,', {
    x: 540, y: 540, w: 940, align: 'c', size: 44, color: 'ink', weight: 700, at: t0 + 0.25, mode: 'fade',
  });
  P.text('how do you order in Chinese?', {
    x: 540, y: 615, w: 940, align: 'c', size: 44, color: 'ink', weight: 700, at: t0 + 0.38, mode: 'fade',
  });
  P.text('当你走进一家奶茶店，', {
    x: 540, y: 805, w: 940, align: 'c', size: 40, color: 'red', weight: 700, at: t1, mode: 'fade',
  });
  P.text('如何使用汉语点单？', {
    x: 540, y: 878, w: 940, align: 'c', size: 40, color: 'red', weight: 700, at: t1 + 0.15, mode: 'fade',
  });
  P.text('EN → 中文', {
    x: 540, y: 1005, w: 940, align: 'c', size: 27, color: 'soft', weight: 700, at: t1 + 0.3, mode: 'fade',
  });

  P.img('assets/mascot/scenes/p01-thinking-cutout.png', 325, 1080, 430, 621, {
    fit: 'contain', r: 0, border: false, shadow: false, at: t0 + 0.05,
  });

  P.text('SINOFIELDNOTES · 奶茶点单', {
    x: 540, y: 1844, w: 900, align: 'c', size: 22, color: 'soft', weight: 700, at: 0, mode: 'fade',
  });
});
