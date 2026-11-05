ENGINE.visual('p08', (P) => {
  const t0 = P.c(0);
  const tr = t0 + 1.2;
  const bg = P.img('assets/mascot/scenes/p08-receipt-v1.png', 0, 0, 1080, 1920, { fit: 'cover', r: 0, border: false, shadow: false, at: 0 });
  if (bg && bg.el) bg.el.style.filter = 'blur(8px) saturate(.92)';
  P.canvas(0, 0, 1080, 1920, (ctx) => { ctx.clearRect(0, 0, 1080, 1920); ctx.fillStyle = 'rgba(233,222,205,.52)'; ctx.fillRect(0, 0, 1080, 1920); });
  P.canvas(0, 0, 1080, 106, (ctx) => { ctx.clearRect(0, 0, 1080, 106); ctx.fillStyle = 'rgba(233,222,205,.94)'; ctx.fillRect(0, 0, 1080, 106); ctx.fillStyle = 'rgba(43,52,64,.12)'; ctx.fillRect(0, 103, 1080, 3); });
  P.canvas(0, 1810, 1080, 110, (ctx) => { ctx.clearRect(0, 0, 1080, 110); ctx.fillStyle = 'rgba(233,222,205,.94)'; ctx.fillRect(0, 0, 1080, 110); ctx.fillStyle = 'rgba(43,52,64,.12)'; ctx.fillRect(0, 0, 1080, 3); });
  P.text('SINOFIELDNOTES', { x: 64, y: 34, w: 620, align: 'l', size: 30, color: 'ink', weight: 700, at: t0 });
  P.text('EP.10', { x: 1016, y: 44, w: 160, align: 'r', size: 22, color: 'soft', at: t0 });
  P.text('5 / 5', { x: 540, y: 112, w: 600, align: 'c', size: 100, color: 'red', weight: 700, at: t0, cps: 6 });
  P.text('你今天又学会了 5 个词', { x: 540, y: 236, w: 900, align: 'c', size: 38, color: 'ink', weight: 600, at: t0 + 0.2, mode: 'fade' });
  P.canvas(70, 320, 940, 1280, (ctx, lt) => {
    ctx.clearRect(0, 0, 940, 1280);
    const k = PV.K(lt, tr - 0.25, 0.35);
    if (k <= 0) return;
    ctx.globalAlpha = k; ctx.save(); ctx.shadowColor = 'rgba(43,52,64,.20)'; ctx.shadowBlur = 28; ctx.shadowOffsetY = 12; ctx.fillStyle = '#FFF9EF'; ctx.strokeStyle = '#2B3440'; ctx.lineWidth = 4;
    const x = 8, y = 8, w = 924, h = 1264, r = 18;
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.strokeStyle = 'rgba(43,52,64,.13)'; ctx.lineWidth = 1.5;
    for (let i = 0; i < 5; i++) { const yy = 500 + i * 125; ctx.beginPath(); ctx.moveTo(40, yy + 102); ctx.lineTo(900, yy + 102); ctx.stroke(); }
    ctx.save(); ctx.translate(785, 1080); ctx.rotate((-8 * Math.PI) / 180); ctx.strokeStyle = '#B85C4A'; ctx.lineWidth = 8; ctx.strokeRect(-144, -52, 288, 104); ctx.lineWidth = 4; ctx.strokeRect(-132, -40, 264, 80); ctx.fillStyle = '#B85C4A'; ctx.font = '700 44px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('LEARNED', 0, 4); ctx.restore(); ctx.globalAlpha = 1;
  });
  P.text("TODAY'S RECEIPT", { x: 120, y: 354, w: 600, size: 34, color: 'ink', weight: 700, at: tr, mode: 'fade' });
  P.text('今日学习小票 · EP.10', { x: 120, y: 400, w: 600, size: 22, color: 'muted', at: tr + 0.05, mode: 'fade' });
  const rows = [
    ['植物', 'zhíwù', 'plant', '这是植物。'],
    ['浇水', 'jiāoshuǐ', 'to water', '给植物浇水。'],
    ['叶子', 'yèzi', 'leaf', '叶子绿绿的。'],
    ['花朵', 'huāduǒ', 'flower', '这是花朵。'],
    ['生长', 'shēngzhǎng', 'to grow', '植物慢慢生长。'],
  ];
  rows.forEach((row, i) => {
    const y = 522 + i * 125;
    P.text(row[0], { x: 120, y, w: 170, size: 50, color: 'red', weight: 700, at: tr + 0.1 + i * 0.05, mode: 'fade' });
    P.text(row[1], { x: 300, y: y + 8, w: 210, size: 24, color: 'red', weight: 600, at: tr + 0.12 + i * 0.05, mode: 'fade' });
    P.text(row[2], { x: 540, y: y + 2, w: 300, size: 26, color: 'ink', at: tr + 0.14 + i * 0.05, mode: 'fade' });
    P.text(row[3], { x: 540, y: y + 42, w: 380, size: 21, color: 'muted', at: tr + 0.16 + i * 0.05, mode: 'fade' });
  });
  P.text('我照顾植物：浇水、看叶子、等花朵生长。', { x: 120, y: 1112, w: 840, size: 25, color: 'ink', weight: 700, at: tr + 0.45, mode: 'fade' });
  P.text('5 words · 1 sentence', { x: 120, y: 1182, w: 500, size: 22, color: 'muted', at: tr + 0.55, mode: 'fade' });
  P.text('You can take care of plants now.', { x: 120, y: 1222, w: 840, size: 24, color: 'green', weight: 600, at: tr + 0.65, mode: 'fade' });
  P.text('CONGRATULATIONS!', { x: 700, y: 358, w: 340, align: 'c', size: 36, color: 'green', weight: 900, font: 'latin', rot: -3, at: tr + 0.3, mode: 'fade' });
  P.text('PAUSE TO READ / 截图保存', { x: 540, y: 1518, w: 900, align: 'c', size: 26, color: 'red', weight: 600, at: tr + 0.8, mode: 'fade' });
  P.text('SINOFIELDNOTES · 照顾植物', { x: 540, y: 1844, w: 900, align: 'c', size: 22, color: 'soft', at: 0, mode: 'fade' });
});
