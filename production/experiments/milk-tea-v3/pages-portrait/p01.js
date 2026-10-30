ENGINE.visual('p01', (P) => {
  const t0 = P.c(0);
  const t1 = P.c(1);

  P.text('MILK TEA SHOP', {
    x: 540, y: 210, w: 900, align: 'c', size: 31, color: 'soft', at: t0, mode: 'fade',
  });
  P.text('MILK TEA', {
    x: 540, y: 330, w: 900, align: 'c', size: 96, color: 'red', weight: 700, at: t0 + 0.1, cps: 7,
  });
  P.text('When you walk into a milk tea shop,', {
    x: 540, y: 540, w: 940, align: 'c', size: 44, color: 'ink', weight: 600, at: t0 + 0.3, mode: 'fade',
  });
  P.text('how do you order in Chinese?', {
    x: 540, y: 615, w: 940, align: 'c', size: 44, color: 'ink', weight: 600, at: t0 + 0.5, mode: 'fade',
  });
  P.text('当你走进一家奶茶店，', {
    x: 540, y: 805, w: 940, align: 'c', size: 40, color: 'red', at: t1, mode: 'fade',
  });
  P.text('如何使用汉语点单？', {
    x: 540, y: 878, w: 940, align: 'c', size: 40, color: 'red', at: t1 + 0.2, mode: 'fade',
  });
  P.text('EN → 中文', {
    x: 540, y: 1035, w: 940, align: 'c', size: 27, color: 'soft', at: t1 + 0.5, mode: 'fade',
  });

  // Paper wipe is post-processed later; an in-page flash would sit above the
  // cat layer and blank the frame.
});
