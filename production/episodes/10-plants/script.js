(function (root) {
  const META = {
    voice: { speaker: 'zh_female_meilinvyou_uranus_bigtts' },
    style: 'study',
    title: 'Plants v1',
    name: 'plants-v1',
    lang: 'en',
    gap: 0.2,
    pace: { maxHold: 3.0, gap: 0.2, tail: 2.5 },
    extras: ['extras/word.js'],
  };

  const PAGES = [
    { id: 'p01', section: '开场', title: 'Momo Takes Care of Plants', after: 2.3, cues: [
      { t: 'Momo has some little green friends to take care of.', hold: 0.4 },
    ] },
    { id: 'p02', section: '5 个词', title: '植物', after: 1.0, cues: [
      { t: '植物。', hold: 0.6 },
      { t: '这是什么？', hold: 1.0 },
      { t: '这是植物。', hold: 1.0 },
      { t: '小绿朋友！', hold: 0.2 },
    ] },
    { id: 'p03', section: '5 个词', title: '浇水', after: 1.2, cues: [
      { t: '浇水。', hold: 0.6 },
      { t: '植物需要什么？', hold: 1.1 },
      { t: '要给植物浇水。', hold: 1.1 },
      { t: '喝水啦！', hold: 0.2 },
    ] },
    { id: 'p04', section: '5 个词', title: '叶子', after: 1.0, cues: [
      { t: '叶子。', hold: 0.5 },
      { t: '这片叶子怎么样？', hold: 1.0 },
      { t: '叶子绿绿的。', hold: 1.0 },
      { t: '绿绿的！', hold: 0.2 },
    ] },
    { id: 'p05', section: '5 个词', title: '花朵', after: 1.5, cues: [
      { t: '花朵。', hold: 0.6 },
      { t: '那是什么？', hold: 1.0 },
      { t: '这是花朵。', hold: 1.0 },
      { t: '好漂亮！', hold: 0.2 },
    ] },
    { id: 'p06', section: '5 个词', title: '生长', after: 1.2, cues: [
      { t: '生长。', hold: 0.6 },
      { t: '植物会怎么样？', hold: 1.0 },
      { t: '植物会慢慢生长。', hold: 1.1 },
      { t: '长高了！', hold: 0.2 },
    ] },
    { id: 'p07', section: '成句', title: 'A little garden', after: 1.2, cues: [
      { t: '我照顾植物：浇水、看叶子、等花朵生长。', hold: 0.8 },
    ] },
    { id: 'p08', section: '复习', title: "Today's receipt", after: 0.8, cues: [
      { t: '恭喜你，今天又学会了五个词！', hold: 0.3 },
      { t: '这是今天的小票，暂停读一下。', hold: 2.3 },
    ] },
  ];

  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
