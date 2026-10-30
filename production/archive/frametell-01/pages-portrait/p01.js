/* p01 · 阿姨 / AUNTIE — portrait one-page test */
ENGINE.visual('p01', (P) => {
  const t0 = P.c(0);
  const t1 = P.c(1);
  const t2 = P.c(2);
  const t3 = P.c(3);

  // Title block, kept inside the portrait safe area.
  P.text('阿姨', { x: 540, y: 190, w: 760, align: 'c', size: 92, color: 'red', weight: 700, at: t0 + 0.2, cps: 8 });
  P.text('AUNTIE', { x: 540, y: 365, w: 760, align: 'c', size: 28, color: 'muted', at: t0 + 0.4, cps: 12 });
  P.underline(360, 405, 360, { color: 'red', at: t0 + 0.8, sw: 3.2 });

  // Door and silhouette.
  P.box(100, 430, 330, 700, { fill: 'paper', color: 'ink', r: 18, sw: 4, at: t1, dur: 0.9 });
  P.box(145, 485, 240, 590, { fill: 'softF', color: 'soft', r: 10, sw: 2.4, at: t1 + 0.2, dur: 0.8 });
  P.circle(265, 735, 104, { fill: 'inkF', color: 'ink', at: t1 + 0.6, dur: 0.5 });
  P.box(195, 802, 140, 220, { fill: 'inkF', color: 'ink', r: 52, at: t1 + 0.8, dur: 0.6 });

  // Speech bubble.
  P.box(500, 600, 420, 190, { fill: 'paper', color: 'ink', r: 24, sw: 3.4, at: t2, dur: 0.7 });
  P.path('M500 690 l-58 32 l58 32', { color: 'ink', at: t2 + 0.2, dur: 0.3, sw: 3 });
  P.text('阿姨', { x: 710, y: 645, w: 340, align: 'c', size: 54, color: 'ink', at: t2 + 0.3, cps: 7 });
  P.text('auntie', { x: 710, y: 725, w: 340, align: 'c', size: 26, color: 'muted', at: t2 + 0.5, cps: 10 });

  // Payoff line, above the subtitle band.
  P.text('a kinship word', { x: 540, y: 1170, w: 720, align: 'c', size: 46, color: 'green', at: t3, cps: 8 });
  P.text('not a first name', { x: 540, y: 1250, w: 720, align: 'c', size: 32, color: 'muted', at: t3 + 0.3, cps: 10 });

  P.cam([P.pan(t2 + 0.2, 540, 900), P.back(P.endT - 0.4)]);
});
