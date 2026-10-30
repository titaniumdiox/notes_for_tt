ENGINE.visual('p08', (P) => {
  const t0 = P.c(0);
  const t1 = P.c(1);

  // Reward beat.
  P.text('5 / 5', {
    x: 540, y: 100, w: 500, align: 'c', size: 106, color: 'red', weight: 700, at: t0, cps: 6,
  });
  P.text('你今天又学会了 5 个词', {
    x: 540, y: 230, w: 900, align: 'c', size: 40, color: 'ink', at: t0 + 0.2, mode: 'fade',
  });
  P.text('Congratulations!', {
    x: 540, y: 295, w: 900, align: 'c', size: 28, color: 'green', at: t0 + 0.4, mode: 'fade',
  });

  // Receipt.
  P.box(60, 370, 960, 1230, {
    fill: 'paper', color: 'ink', r: 10, sw: 3, at: t1, dur: 0.5,
  });
  P.text("TODAY'S RECEIPT", {
    x: 100, y: 395, w: 600, size: 34, color: 'ink', weight: 700, at: t1 + 0.1, mode: 'fade',
  });
  P.text('今日学习小票 · EP.01', {
    x: 100, y: 440, w: 600, size: 22, color: 'muted', at: t1 + 0.15, mode: 'fade',
  });
  P.stamp(800, 395, 'LEARNED');

  const rows = [
    { hanzi: '奶茶', pinyin: 'nǎichá', meaning: 'milk tea', example: '我要一杯奶茶。' },
    { hanzi: '半糖', pinyin: 'bàntáng', meaning: 'half sugar', example: '半糖，谢谢。' },
    { hanzi: '少冰', pinyin: 'shǎobīng', meaning: 'less ice', example: '少冰。' },
    { hanzi: '打包', pinyin: 'dǎbāo', meaning: 'to go', example: '打包，谢谢。' },
    { hanzi: '谢谢', pinyin: 'xièxie', meaning: 'thanks', example: '谢谢你。' },
  ];
  rows.forEach((row, i) => {
    const y = 520 + i * 125;
    P.text(row.hanzi, {
      x: 100, y, w: 170, size: 48, color: 'red', weight: 700, at: t1 + 0.2 + i * 0.06, mode: 'fade',
    });
    P.text(row.pinyin, {
      x: 290, y: y + 8, w: 200, size: 22, color: 'red', at: t1 + 0.22 + i * 0.06, mode: 'fade',
    });
    P.text(row.meaning, {
      x: 520, y: y + 2, w: 300, size: 24, color: 'ink', at: t1 + 0.24 + i * 0.06, mode: 'fade',
    });
    P.text(row.example, {
      x: 520, y: y + 38, w: 420, size: 20, color: 'muted', at: t1 + 0.26 + i * 0.06, mode: 'fade',
    });
    P.line(100, y + 100, 980, y + 100, { color: 'faint', sw: 1, at: t1 + 0.3 + i * 0.06 });
  });

  P.text('一杯奶茶，半糖少冰，打包，谢谢。', {
    x: 100, y: 1155, w: 880, size: 26, color: 'ink', at: t1 + 0.65, mode: 'fade',
  });
  P.text('5 words · 1 sentence', {
    x: 100, y: 1215, w: 500, size: 22, color: 'muted', at: t1 + 0.8, mode: 'fade',
  });
  P.text('You can order a milk tea in Chinese now.', {
    x: 100, y: 1255, w: 880, size: 24, color: 'green', at: t1 + 0.9, mode: 'fade',
  });
  P.text('PAUSE TO READ / 截图保存', {
    x: 540, y: 1410, w: 900, align: 'c', size: 26, color: 'red', at: t1 + 1.05, mode: 'fade',
  });
});
