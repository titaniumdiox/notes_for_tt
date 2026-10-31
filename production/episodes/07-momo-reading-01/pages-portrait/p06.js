ENGINE.visual('p06', (P) => {
  const t0 = P.c(0);

  const bg = P.img('assets/mascot/scenes/p04-moon-gaze-v1.png', 0, 0, 1080, 1920, {
    fit: 'cover', r: 0, border: false, shadow: false, at: 0,
  });
  if (bg && bg.el) bg.el.style.filter = 'blur(6px) saturate(.9)';

  P.canvas(0, 0, 1080, 1920, (ctx) => {
    ctx.clearRect(0, 0, 1080, 1920);
    ctx.fillStyle = 'rgba(232,230,223,.34)';
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
    position: 'absolute', left: '70px', top: '190px', width: '940px', height: '780px',
    padding: '32px 40px', background: 'rgba(255,249,239,.93)',
    border: '2px solid rgba(43,52,64,.18)', borderRadius: '28px',
    boxShadow: '0 22px 55px rgba(43,52,64,.18)', boxSizing: 'border-box',
  });
  card.innerHTML = `
    <div style="text-align:center;font:700 24px/1.2 Arial;letter-spacing:.14em;color:#7C8FA3">READ TOGETHER</div>
    <div style="text-align:center;font:700 52px/1.2 'Microsoft YaHei';color:#2B3440;margin-top:6px">静夜思</div>
    <div style="text-align:center;font:600 21px/1.2 Arial;color:#7C8FA3;margin-top:2px">Jìng yè sī · 李白</div>
    <div style="text-align:center;font:700 42px/1.5 'Microsoft YaHei';color:#2B3440;margin-top:10px;line-height:1.55">
      <div>床前<span style="color:#B85C4A">明月</span>光，</div>
      <div>疑是地上<span style="color:#B85C4A">霜</span>。</div>
      <div><span style="color:#B85C4A">举头</span>望明月，</div>
      <div><span style="color:#B85C4A">低头</span>思<span style="color:#B85C4A">故乡</span>。</div>
    </div>
    <div style="text-align:center;font:600 17px/1.5 Arial;color:#7C8FA3;margin-top:4px">
      chuáng qián míngyuè guāng, yí shì dìshàng shuāng.<br>
      jǔ tóu wàng míngyuè, dī tóu sī gùxiāng.
    </div>
    <div style="text-align:center;font:600 20px/1.45 Georgia;color:#2B3440;margin-top:8px;font-style:italic">
      Before my bed the moonlight streams,<br>
      And on the ground, like frost, it gleams.<br>
      I raise my head — the moon is bright,<br>
      I lower my head — home fills the night.
    </div>`;
  P.html.appendChild(card);

  P.text('SINOFIELDNOTES · 静夜思', { x: 540, y: 1844, w: 900, align: 'c', size: 20, color: 'soft', at: 0, mode: 'fade' });
});
