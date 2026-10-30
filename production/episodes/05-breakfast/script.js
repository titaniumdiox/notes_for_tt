(function (root) {
  const META = {
    voice: { speaker: 'zh_female_meilinvyou_uranus_bigtts' },
    style: 'study',
    title: 'Breakfast in China v1',
    name: 'breakfast-v1',
    lang: 'en',
    gap: 0.2,
    pace: { maxHold: 3.0, gap: 0.2, tail: 2.5 },
    extras: ['extras/word.js'],
  };

  const PAGES = [
    { id: 'p01', section: '开场', title: 'What do people eat for breakfast in China?', after: 1.2, cues: [
      { t: 'What do people eat for breakfast in China?', hold: 1.2 },
    ] },
    { id: 'p02', section: '5 个词', title: '早饭', after: 0.9, cues: [
      { t: '早饭。', hold: 1.0 },
      { t: '你早饭吃什么？', hold: 1.6 },
      { t: '我早饭吃豆浆和油条。', hold: 1.1 },
      { t: '早餐开动！', hold: 0.4 },
    ] },
    { id: 'p03', section: '5 个词', title: '豆浆', after: 0.9, cues: [
      { t: '豆浆。', hold: 1.0 },
      { t: '你要喝什么？', hold: 1.6 },
      { t: '一杯豆浆。', hold: 1.1 },
      { t: '好香！', hold: 0.4 },
    ] },
    { id: 'p04', section: '5 个词', title: '油条', after: 0.9, cues: [
      { t: '油条。', hold: 1.0 },
      { t: '还要什么？', hold: 1.6 },
      { t: '一根油条。', hold: 1.1 },
      { t: '脆脆的！', hold: 0.4 },
    ] },
    { id: 'p05', section: '5 个词', title: '茶叶蛋', after: 0.9, cues: [
      { t: '茶叶蛋。', hold: 1.0 },
      { t: '要不要茶叶蛋？', hold: 1.6 },
      { t: '一个茶叶蛋。', hold: 1.1 },
      { t: '入味！', hold: 0.4 },
    ] },
    { id: 'p06', section: '5 个词', title: '甜', after: 0.9, cues: [
      { t: '甜。', hold: 1.0 },
      { t: '豆浆要甜的还是咸的？', hold: 1.6 },
      { t: '甜的。', hold: 1.1 },
      { t: '甜到心里！', hold: 0.4 },
    ] },
    { id: 'p07', section: '成句', title: 'Put it together', after: 1.2, cues: [
      { t: '早饭我要一杯甜豆浆，一根油条，一个茶叶蛋。', hold: 2.2 },
    ] },
    { id: 'p08', section: '复习', title: "Today's receipt", after: 1.2, cues: [
      { t: '恭喜你，今天又学会了五个词！', hold: 0.3 },
      { t: '这是今天的小票，暂停读一下。', hold: 3.2 },
    ] },
  ];

  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
