ENGINE.visual('p07', (P) => {
  const t0 = P.c(0);

  P.text('PUT IT TOGETHER', {
    x: 540, y: 220, w: 900, align: 'c', size: 34, color: 'muted', at: t0, cps: 10,
  });
  P.text('一杯奶茶', {
    x: 540, y: 430, w: 900, align: 'c', size: 78, color: 'ink', weight: 700, at: t0 + 0.1, cps: 7,
  });
  P.text('半糖少冰', {
    x: 540, y: 570, w: 900, align: 'c', size: 78, color: 'red', weight: 700, at: t0 + 0.55, cps: 7,
  });
  P.text('打包，谢谢。', {
    x: 540, y: 710, w: 900, align: 'c', size: 78, color: 'ink', weight: 700, at: t0 + 1.0, cps: 7,
  });
  P.text('One milk tea, half sugar, less ice, to go, thanks.', {
    x: 540, y: 930, w: 900, align: 'c', size: 30, color: 'muted', at: t0 + 1.5, mode: 'fade',
  });
  P.check(540, 1120, 110, { color: 'green', at: P.ce(0) });
  P.text('You can say it now.', {
    x: 540, y: 1250, w: 900, align: 'c', size: 30, color: 'green', at: P.ce(0) + 0.2, mode: 'fade',
  });
});
