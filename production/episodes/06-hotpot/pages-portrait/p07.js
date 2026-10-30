ENGINE.visual('p07', (P) => {
  const t0 = P.c(0);

  const bg = P.img('assets/mascot/scenes/p07-full-sentence-v1.png', 0, 0, 1080, 1920, {
    fit: 'cover', r: 0, border: false, shadow: false, at: 0,
  });
  if (bg && bg.el) bg.el.style.filter = 'blur(8px) saturate(.92)';

  P.canvas(0, 0, 1080, 1920, (ctx) => {
    ctx.clearRect(0, 0, 1080, 1920);
    ctx.fillStyle = 'rgba(233,222,205,.42)';
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
    x: 64, y: 34, w: 620, align: 'l', size: 30, color: 'ink', weight: 700, at: t0,
  });
  P.text('EP.06', {
    x: 1016, y: 44, w: 160, align: 'r', size: 22, color: 'soft', at: t0,
  });
  P.canvas(600, 30, 280, 46, (ctx) => {
    ctx.clearRect(0, 0, 280, 46);
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(22 + i * 50, 23, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#B85C4A';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#B9AA96';
      ctx.stroke();
    }
  });

  const glass = document.createElement('div');
  Object.assign(glass.style, {
    position: 'absolute', left: '70px', top: '320px', width: '940px', height: '820px',
    borderRadius: '32px', background: 'rgba(255,249,239,.46)',
    backdropFilter: 'blur(14px) saturate(1.05)', WebkitBackdropFilter: 'blur(14px) saturate(1.05)',
    border: '1.5px solid rgba(255,255,255,.72)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,.9), 0 20px 55px rgba(43,52,64,.18)',
    pointerEvents: 'none',
  });
  P.html.appendChild(glass);

  P.text('PUT IT TOGETHER', {
    x: 540, y: 360, w: 900, align: 'c', size: 30, color: 'soft', weight: 600, at: t0, mode: 'fade',
  });
  P.text('今天吃火锅，我要一个鸳鸯锅，', {
    x: 540, y: 400, w: 900, align: 'c', size: 48, color: 'ink', weight: 700, at: t0 + 0.1, cps: 8,
  });
  P.text('锅底一边辣、一边不辣，', {
    x: 540, y: 458, w: 900, align: 'c', size: 48, color: 'red', weight: 700, at: t0 + 0.5, cps: 8,
  });
  P.text('再来一盘牛肉和一份蘸料。', {
    x: 540, y: 516, w: 900, align: 'c', size: 48, color: 'red', weight: 700, at: t0 + 0.9, cps: 8,
  });
  P.text('Jīntiān chī huǒguō, wǒ yào yí ge yuānyāngguō,', {
    x: 540, y: 580, w: 900, align: 'c', size: 22, color: 'red', weight: 600, at: t0 + 0.3, mode: 'fade',
  });
  P.text('guōdǐ yì biān là, yì biān bú là,', {
    x: 540, y: 608, w: 900, align: 'c', size: 22, color: 'red', weight: 600, at: t0 + 0.7, mode: 'fade',
  });
  P.text('zài lái yì pán niúròu hé yí fèn zhànliào.', {
    x: 540, y: 636, w: 900, align: 'c', size: 22, color: 'red', weight: 600, at: t0 + 1.0, mode: 'fade',
  });
  P.text('Today I’m having hotpot: a split pot,', {
    x: 540, y: 680, w: 900, align: 'c', size: 23, color: 'ink', weight: 600, at: t0 + 1.2, mode: 'fade',
  });
  P.text('one spicy side, one mild side, beef, and dipping sauce.', {
    x: 540, y: 712, w: 900, align: 'c', size: 23, color: 'ink', weight: 600, at: t0 + 1.26, mode: 'fade',
  });
  P.text('✓', {
    x: 540, y: 765, w: 900, align: 'c', size: 64, color: 'green', weight: 700, at: t0 + 1.5, mode: 'fade',
  });
  P.text('You can order hotpot now.', {
    x: 540, y: 835, w: 900, align: 'c', size: 28, color: 'green', weight: 600, at: t0 + 1.7, mode: 'fade',
  });

  P.canvas(720, 1738, 310, 36, (ctx) => {
    ctx.clearRect(0, 0, 310, 36);
    ctx.globalAlpha = 0.32;
    ctx.fillStyle = '#2B3440';
    ctx.font = '700 18px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('SINOFIELDNOTES', 300, 18);
    ctx.globalAlpha = 1;
  });
  P.text('SINOFIELDNOTES · 中国火锅', {
    x: 540, y: 1844, w: 900, align: 'c', size: 22, color: 'soft', at: 0, mode: 'fade',
  });
});
