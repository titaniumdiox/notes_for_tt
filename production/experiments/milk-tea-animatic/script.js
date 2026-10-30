(function (root) {
  const META = {
    voice: { speaker: 'zh-CN-XiaoxiaoNeural' },
    style: 'study',
    title: 'Milk Tea Order',
    name: 'milk-tea-animatic',
    lang: 'en',
    gap: 0.25,
    pace: { maxHold: 3.0, gap: 0.25, tail: 2.5 },
    extras: ['extras/word.js'],
  };

  const PAGES = [
    { id: 'p01', section: '场景', title: 'Can you order milk tea in Chinese?', cues: [
      { t: '在奶茶店，怎么点单？', hold: 0.4 },
      { t: '奶茶，半糖，少冰，打包，谢谢。', hold: 0.6 },
    ] },
    { id: 'p02', section: '5 个词', title: '奶茶', after: 2.4, cues: [
      { t: '奶茶。', hold: 1.2 },
      { t: '我要一杯什么？', hold: 2.0 },
      { t: '奶茶。', hold: 1.4 },
    ] },
    { id: 'p03', section: '5 个词', title: '半糖', after: 2.4, cues: [
      { t: '半糖。', hold: 1.2 },
      { t: '糖度要多少？', hold: 2.0 },
      { t: '半糖。', hold: 1.4 },
    ] },
    { id: 'p04', section: '5 个词', title: '少冰', after: 2.4, cues: [
      { t: '少冰。', hold: 1.2 },
      { t: '冰块要多少？', hold: 2.0 },
      { t: '少冰。', hold: 1.4 },
    ] },
    { id: 'p05', section: '5 个词', title: '打包', after: 2.4, cues: [
      { t: '打包。', hold: 1.2 },
      { t: '要在这儿喝吗？', hold: 2.0 },
      { t: '打包。', hold: 1.4 },
    ] },
    { id: 'p06', section: '5 个词', title: '谢谢', after: 2.4, cues: [
      { t: '谢谢。', hold: 1.2 },
      { t: '店员递给你，你说什么？', hold: 2.0 },
      { t: '谢谢。', hold: 1.4 },
    ] },
    { id: 'p07', section: '成句', title: 'Put it together', after: 1.8, cues: [
      { t: '一杯奶茶，半糖少冰，打包，谢谢。', hold: 2.4 },
    ] },
    { id: 'p08', section: '复习', title: "Today's receipt", after: 1.5, cues: [
      { t: '恭喜你，今天又学会了五个词！', hold: 0.5 },
      { t: '这是今天的小票，暂停读一下。', hold: 4.0 },
    ] },
  ];

  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
