ENGINE.visual('p07', (P) => {
  const t0 = P.c(0);

  const bg = P.img('assets/mascot/scenes/p07-walk-in-rain-v1.png', 0, 0, 1080, 1920, {
    fit: 'cover', r: 0, border: false, shadow: false, at: 0,
  });
  if (bg && bg.el) bg.el.style.filter = 'blur(6px) saturate(.92)';

  P.canvas(0, 0, 1080, 1920, (ctx) => {
    ctx.clearRect(0, 0, 1080, 1920);
    ctx.fillStyle = 'rgba(233,222,205,.32)';
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

  P.text('SINOFIELDNOTES', { x: 64, y: 34, w: 620, align: 'l', size: 30, color: 'ink', weight: 700, at: t0 });
  P.text('EP.08', { x: 1016, y: 44, w: 160, align: 'r', size: 22, color: 'soft', at: t0 });

  const glass = document.createElement('div');
  Object.assign(glass.style, {
    position: 'absolute', left: '70px', top: '330px', width: '940px', height: '780px',
    borderRadius: '32px', background: 'rgba(255,249,239,.50)',
    backdropFilter: 'blur(14px) saturate(1.02)', WebkitBackdropFilter: 'blur(14px) saturate(1.02)',
    border: '1.5px solid rgba(255,255,255,.72)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,.9), 0 20px 55px rgba(43,52,64,.18)',
    pointerEvents: 'none',
  });
  P.html.appendChild(glass);

  P.text('ONE RAINY DAY', {
    x: 540, y: 360, w: 900, align: 'c', size: 30, color: 'soft', weight: 600, at: t0, mode: 'fade',
  });
  P.text('今天天气不好，下雨了。', {
    x: 540, y: 420, w: 900, align: 'c', size: 50, color: 'ink', weight: 700, at: t0 + 0.1, cps: 8,
  });
  P.text('我穿雨衣、带雨伞，', {
    x: 540, y: 484, w: 900, align: 'c', size: 50, color: 'ink', weight: 700, at: t0 + 0.5, cps: 8,
  });
  P.text('雨滴落在我的伞上。', {
    x: 540, y: 548, w: 900, align: 'c', size: 50, color: 'red', weight: 700, at: t0 + 0.9, cps: 8,
  });
  P.text('Jīntiān tiānqì bù hǎo, xiàyǔ le.', {
    x: 540, y: 602, w: 900, align: 'c', size: 21, color: 'red', weight: 600, at: t0 + 0.3, mode: 'fade',
  });
  P.text('Wǒ chuān yǔyī, dài yǔsǎn,', {
    x: 540, y: 630, w: 900, align: 'c', size: 21, color: 'red', weight: 600, at: t0 + 0.7, mode: 'fade',
  });
  P.text('yǔdī luò zài wǒ de sǎn shàng.', {
    x: 540, y: 658, w: 900, align: 'c', size: 21, color: 'red', weight: 600, at: t0 + 1.0, mode: 'fade',
  });
  P.text('The weather is bad today, and it’s raining.', {
    x: 540, y: 704, w: 900, align: 'c', size: 22, color: 'ink', weight: 600, at: t0 + 1.2, mode: 'fade',
  });
  P.text('I put on my raincoat and bring my umbrella.', {
    x: 540, y: 734, w: 900, align: 'c', size: 22, color: 'ink', weight: 600, at: t0 + 1.26, mode: 'fade',
  });
  P.text('Raindrops fall on my umbrella.', {
    x: 540, y: 764, w: 900, align: 'c', size: 22, color: 'ink', weight: 600, at: t0 + 1.32, mode: 'fade',
  });
  P.text('✓', {
    x: 540, y: 812, w: 900, align: 'c', size: 64, color: 'green', weight: 700, at: t0 + 1.5, mode: 'fade',
  });
  P.text('You can go out in the rain now.', {
    x: 540, y: 888, w: 900, align: 'c', size: 28, color: 'green', weight: 600, at: t0 + 1.7, mode: 'fade',
  });

  P.text('SINOFIELDNOTES · 下雨天', { x: 540, y: 1844, w: 900, align: 'c', size: 22, color: 'soft', at: 0, mode: 'fade' });
});
