ENGINE.visual('p01', (P) => {
  const t0 = P.c(0);
  const t1 = P.c(1);

  P.text('MILK TEA', {
    x: 540, y: 230, w: 900, align: 'c', size: 86, color: 'red', weight: 700, at: t0 + 0.2, cps: 7,
  });
  P.text('Can you order in Chinese?', {
    x: 540, y: 350, w: 900, align: 'c', size: 34, color: 'ink', at: t0 + 0.4, mode: 'fade',
  });

  const words = ['奶茶', '半糖', '少冰', '打包', '谢谢'];
  words.forEach((word, i) => {
    P.text(word, {
      x: 540, y: 600 + i * 160, w: 800, align: 'c', size: 76, color: 'ink', at: t1 + i * 0.08, cps: 8,
    });
  });

  P.text('5 words · 1 sentence', {
    x: 540, y: 1500, w: 800, align: 'c', size: 28, color: 'muted', at: t1 + 0.5, mode: 'fade',
  });
});
