(function (root) {
  const META = {
    voice: { speaker: 'zh_female_meilinvyou_uranus_bigtts' },
    style: 'study',
    title: 'Dumplings v1',
    name: 'dumplings-v1',
    lang: 'en',
    gap: 0.2,
    pace: { maxHold: 3.0, gap: 0.2, tail: 2.5 },
    extras: ['extras/word.js'],
  };

  const PAGES = [
    { id: 'p01', section: '开场', title: 'Momo Makes Dumplings', after: 2.0, cues: [
      { t: 'Momo wants dumplings. Time to make them!', hold: 0.4 },
    ] },
    { id: 'p02', section: '5 个词', title: '饺子', after: 1.5, cues: [
      { t: '饺子。', hold: 0.7 },
      { t: '你想吃什么？', hold: 1.1 },
      { t: '我想吃饺子。', hold: 1.0 },
      { t: '饺子！', hold: 0.2 },
    ] },
    { id: 'p03', section: '5 个词', title: '面粉', after: 1.5, cues: [
      { t: '面粉。', hold: 0.7 },
      { t: '饺子皮用什么？', hold: 1.1 },
      { t: '用面粉做。', hold: 1.0 },
      { t: '白白的！', hold: 0.2 },
    ] },
    { id: 'p04', section: '5 个词', title: '肉馅', after: 1.5, cues: [
      { t: '肉馅。', hold: 0.6 },
      { t: '里面放什么？', hold: 1.1 },
      { t: '放肉馅。', hold: 1.0 },
      { t: '香香的！', hold: 0.2 },
    ] },
    { id: 'p05', section: '5 个词', title: '包', after: 1.6, cues: [
      { t: '包。', hold: 0.5 },
      { t: '怎么包？', hold: 1.0 },
      { t: '把馅包起来。', hold: 1.0 },
      { t: '包好了！', hold: 0.2 },
    ] },
    { id: 'p06', section: '5 个词', title: '煮', after: 1.8, cues: [
      { t: '煮。', hold: 0.6 },
      { t: '怎么煮？', hold: 1.0 },
      { t: '放进锅里煮。', hold: 1.0 },
      { t: '浮起来了！', hold: 0.2 },
    ] },
    { id: 'p07', section: '成句', title: 'One dumpling day', after: 1.5, cues: [
      { t: '我想吃饺子。用面粉做皮，放肉馅，包起来，再煮一煮。', hold: 0.8 },
    ] },
    { id: 'p08', section: '复习', title: "Today's receipt", after: 1.0, cues: [
      { t: '恭喜你，今天又学会了五个词！', hold: 0.3 },
      { t: '这是今天的小票，暂停读一下。', hold: 2.3 },
    ] },
  ];

  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
