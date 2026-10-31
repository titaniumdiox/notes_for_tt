ENGINE.visual('p07', (P) => {
  const t0 = P.c(0);

  const bg = P.img('assets/mascot/scenes/p01-reading-nook-v2.png', 0, 0, 1080, 1920, {
    fit: 'cover', r: 0, border: false, shadow: false, at: 0,
  });
  if (bg && bg.el) bg.el.style.filter = 'blur(8px) saturate(.9)';

  P.canvas(0, 0, 1080, 1920, (ctx) => {
    ctx.clearRect(0, 0, 1080, 1920);
    ctx.fillStyle = 'rgba(232,230,223,.54)';
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

  const card = document.createElement('div');
  Object.assign(card.style, {
    position: 'absolute', left: '70px', top: '230px', width: '940px', height: '1240px',
    padding: '38px 46px', background: 'rgba(255,249,239,.95)',
    border: '2px solid rgba(43,52,64,.18)', borderRadius: '24px',
    boxShadow: '0 22px 55px rgba(43,52,64,.18)', boxSizing: 'border-box',
  });

  const rows = [
    ['明月', 'míngyuè', 'bright moon'],
    ['霜', 'shuāng', 'frost'],
    ['举头', 'jǔtóu', 'raise one’s head'],
    ['低头', 'dītóu', 'lower one’s head'],
    ['故乡', 'gùxiāng', 'hometown'],
  ].map((r, i) => `
    <div style="display:flex;align-items:baseline;padding:20px 0;border-bottom:1px solid rgba(43,52,64,.13)">
      <div style="width:150px;font:700 44px/1 'Microsoft YaHei';color:#B85C4A">${r[0]}</div>
      <div style="width:210px;font:600 22px/1 Arial;color:#B85C4A">${r[1]}</div>
      <div style="font:600 25px/1.2 Arial;color:#2B3440">${r[2]}</div>
    </div>`).join('');

  card.innerHTML = `
    <div style="font:700 30px/1.2 Arial;color:#2B3440;letter-spacing:.02em">VOCABULARY RECEIPT</div>
    <div style="font:600 19px/1.4 Arial;color:#7C8FA3;margin-top:4px">静夜思 · 5 words · 1 poem</div>
    <div style="margin-top:20px">${rows}</div>
    <div style="margin-top:24px;font:700 25px/1.4 'Microsoft YaHei';color:#2B3440">床前明月光，疑是地上霜。<br>举头望明月，低头思故乡。</div>
    <div style="margin-top:12px;font:700 24px/1.4 'Microsoft YaHei';color:#B85C4A">今天学会了一首唐诗。</div>
    <div style="margin-top:6px;font:600 18px/1.4 Arial;color:#7C8FA3">A little poem, a little moment of peace.</div>`;
  P.html.appendChild(card);

  P.text('SINOFIELDNOTES · 静夜思', { x: 540, y: 1844, w: 900, align: 'c', size: 20, color: 'soft', at: 0, mode: 'fade' });
});
