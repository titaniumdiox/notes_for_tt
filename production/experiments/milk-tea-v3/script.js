(function (root) {
  const META = {
    voice: { speaker: 'zh_female_meilinvyou_uranus_bigtts' },
    style: 'study',
    title: 'Milk Tea Order v3',
    name: 'milk-tea-v3',
    lang: 'en',
    gap: 0.2,
    pace: { maxHold: 3.0, gap: 0.2, tail: 2.5 },
    extras: ['extras/word.js'],
  };

  const PAGES = [
    { id: 'p01', section: '开场', title: 'When you walk into a milk tea shop', after: 0.1, cues: [
      { t: 'When you walk into a milk tea shop, how do you order in Chinese?', hold: 0.2 },
      { t: '当你走进一家奶茶店，如何使用汉语点单？', hold: 0.4 },
    ] },
    { id: 'p02', section: '5 个词', title: '奶茶', after: 0.6, cues: [
      { t: '奶茶。', hold: 1.0 },
      { t: '你要喝什么？', hold: 1.8 },
      { t: '我要一杯奶茶。', hold: 1.1 },
      { t: '真棒！', hold: 0.3 },
    ] },
    { id: 'p03', section: '5 个词', title: '半糖', after: 0.6, cues: [
      { t: '半糖。', hold: 1.0 },
      { t: '糖度要多少？', hold: 1.8 },
      { t: '半糖。', hold: 1.1 },
      { t: '点单成功！', hold: 0.3 },
    ] },
    { id: 'p04', section: '5 个词', title: '少冰', after: 0.6, cues: [
      { t: '少冰。', hold: 1.0 },
      { t: '冰块要多少？', hold: 1.8 },
      { t: '少冰。', hold: 1.1 },
      { t: '你做到了！', hold: 0.3 },
    ] },
    { id: 'p05', section: '5 个词', title: '打包', after: 0.6, cues: [
      { t: '打包。', hold: 1.0 },
      { t: '要在这儿喝吗？', hold: 1.8 },
      { t: '打包。', hold: 1.1 },
      { t: '继续！', hold: 0.3 },
    ] },
    { id: 'p06', section: '5 个词', title: '谢谢', after: 0.6, cues: [
      { t: '谢谢。', hold: 1.0 },
      { t: '这是你的奶茶。', hold: 1.8 },
      { t: '谢谢。', hold: 1.1 },
      { t: '再来一个！', hold: 0.3 },
    ] },
    { id: 'p07', section: '成句', title: 'Put it together', after: 1.0, cues: [
      { t: '一杯奶茶，半糖少冰，打包，谢谢。', hold: 2.0 },
    ] },
    { id: 'p08', section: '复习', title: "Today's receipt", after: 0.5, cues: [
      { t: '恭喜你，今天又学会了五个词！', hold: 0.4 },
      { t: '这是今天的小票，暂停读一下。', hold: 3.5 },
    ] },
  ];

  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
