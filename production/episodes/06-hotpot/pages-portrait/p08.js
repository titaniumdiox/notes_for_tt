ENGINE.visual('p08', (P) => {
  const t0 = P.c(0);
  const tr = t0 + 1.2;

  const bg = P.img('assets/mascot/scenes/p08-receipt-tray-v1.png', 0, 0, 1080, 1920, {
    fit: 'cover', r: 0, border: false, shadow: false, at: 0,
  });
  if (bg && bg.el) bg.el.style.filter = 'blur(8px) saturate(.9)';

  P.canvas(0, 0, 1080, 1920, (ctx) => {
    ctx.clearRect(0, 0, 1080, 1920);
    ctx.fillStyle = 'rgba(233,222,205,.52)';
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

  P.text('5 / 5', {
    x: 540, y: 112, w: 600, align: 'c', size: 100, color: 'red', weight: 700, at: t0, cps: 6,
  });
  P.text('你今天又学会了 5 个词', {
    x: 540, y: 236, w: 900, align: 'c', size: 38, color: 'ink', weight: 600, at: t0 + 0.2, mode: 'fade',
  });

  P.canvas(70, 320, 940, 1280, (ctx, lt) => {
    ctx.clearRect(0, 0, 940, 1280);
    const k = PV.K(lt, tr - 0.25, 0.35);
    if (k <= 0) return;
    ctx.globalAlpha = k;
    ctx.save();
    ctx.shadowColor = 'rgba(43,52,64,.20)';
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 12;
    ctx.fillStyle = '#FFF9EF';
    ctx.strokeStyle = '#2B3440';
    ctx.lineWidth = 4;
    const x = 8, y = 8, w = 924, h = 1264, r = 18;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.strokeStyle = 'rgba(43,52,64,.13)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 5; i++) {
      const yy = 500 + i * 125;
      ctx.beginPath();
      ctx.moveTo(40, yy + 102);
      ctx.lineTo(900, yy + 102);
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(785, 1080);
    ctx.rotate((-8 * Math.PI) / 180);
    ctx.strokeStyle = '#B85C4A';
    ctx.lineWidth = 8;
    ctx.strokeRect(-144, -52, 288, 104);
    ctx.lineWidth = 4;
    ctx.strokeRect(-132, -40, 264, 80);
    ctx.fillStyle = '#B85C4A';
    ctx.font = '700 44px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('LEARNED', 0, 4);
    ctx.restore();
    ctx.globalAlpha = 1;
  });

  P.text("TODAY'S RECEIPT", {
    x: 120, y: 354, w: 600, size: 34, color: 'ink', weight: 700, at: tr, mode: 'fade',
  });
  P.text('今日学习小票 · EP.06', {
    x: 120, y: 400, w: 600, size: 22, color: 'muted', at: tr + 0.05, mode: 'fade',
  });

  const rows = [
    { hanzi: '火锅', pinyin: 'huǒguō', meaning: 'hotpot', example: '我想吃火锅。' },
    { hanzi: '鸳鸯锅', pinyin: 'yuānyāngguō', meaning: 'split hotpot', example: '一个鸳鸯锅。' },
    { hanzi: '锅底', pinyin: 'guōdǐ', meaning: 'soup base', example: '锅底要哪种？' },
    { hanzi: '牛肉', pinyin: 'niúròu', meaning: 'beef', example: '一盘牛肉。' },
    { hanzi: '蘸料', pinyin: 'zhànliào', meaning: 'dipping sauce', example: '一份蘸料。' },
  ];
  rows.forEach((row, i) => {
    const y = 522 + i * 125;
    P.text(row.hanzi, {
      x: 120, y, w: 170, size: 50, color: 'red', weight: 700, at: tr + 0.1 + i * 0.05, mode: 'fade',
    });
    P.text(row.pinyin, {
      x: 300, y: y + 8, w: 210, size: 24, color: 'red', weight: 600, at: tr + 0.12 + i * 0.05, mode: 'fade',
    });
    P.text(row.meaning, {
      x: 540, y: y + 2, w: 300, size: 26, color: 'ink', at: tr + 0.14 + i * 0.05, mode: 'fade',
    });
    P.text(row.example, {
      x: 540, y: y + 42, w: 380, size: 21, color: 'muted', at: tr + 0.16 + i * 0.05, mode: 'fade',
    });
  });

  P.text('今天吃火锅，我要一个鸳鸯锅，', {
    x: 120, y: 1092, w: 840, size: 26, color: 'ink', weight: 700, at: tr + 0.45, mode: 'fade',
  });
  P.text('锅底一边辣、一边不辣，再来一盘牛肉和一份蘸料。', {
    x: 120, y: 1126, w: 840, size: 26, color: 'ink', weight: 700, at: tr + 0.5, mode: 'fade',
  });
  P.text('5 words · 1 sentence', {
    x: 120, y: 1180, w: 500, size: 22, color: 'muted', at: tr + 0.55, mode: 'fade',
  });
  P.text('You can order hotpot in Chinese now.', {
    x: 120, y: 1220, w: 840, size: 24, color: 'green', weight: 600, at: tr + 0.65, mode: 'fade',
  });
  P.text('CONGRATULATIONS!', {
    x: 700, y: 358, w: 340, align: 'c', size: 36, color: 'green', weight: 900,
    font: 'latin', rot: -3, at: tr + 0.3, mode: 'fade',
  });
  P.text('PAUSE TO READ / 截图保存', {
    x: 540, y: 1518, w: 900, align: 'c', size: 26, color: 'red', weight: 600, at: tr + 0.8, mode: 'fade',
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
