(function (root) {
  const META = {
    voice: { speaker: 'zh_female_meilinvyou_uranus_bigtts' },
    style: 'study',
    title: 'Hotpot v1',
    name: 'hotpot-v1',
    lang: 'en',
    gap: 0.2,
    pace: { maxHold: 3.0, gap: 0.2, tail: 2.5 },
    extras: ['extras/word.js'],
  };

  const PAGES = [
    { id: 'p01', section: '开场', title: 'Momo wants hotpot today', after: 0.6, cues: [
      { t: 'Momo wants hotpot today. Can you order it in Chinese?', hold: 0.6 },
    ] },
    { id: 'p02', section: '5 个词', title: '火锅', after: 0.3, cues: [
      { t: '火锅。', hold: 0.8 },
      { t: '今天想吃什么？', hold: 1.2 },
      { t: '我今天想吃火锅！', hold: 1.0 },
      { t: '火锅开动！', hold: 0.2 },
    ] },
    { id: 'p03', section: '5 个词', title: '鸳鸯锅', after: 0.3, cues: [
      { t: '鸳鸯锅。', hold: 0.8 },
      { t: '要哪种锅？', hold: 1.2 },
      { t: '一个鸳鸯锅。', hold: 1.0 },
      { t: '好香！', hold: 0.2 },
    ] },
    { id: 'p04', section: '5 个词', title: '锅底', after: 0.3, cues: [
      { t: '锅底。', hold: 0.8 },
      { t: '锅底要哪种？', hold: 1.2 },
      { t: '一边辣，一边不辣。', hold: 1.0 },
      { t: '辣得过瘾！', hold: 0.2 },
    ] },
    { id: 'p05', section: '5 个词', title: '牛肉', after: 0.3, cues: [
      { t: '牛肉。', hold: 0.8 },
      { t: '想吃什么肉？', hold: 1.2 },
      { t: '来一盘牛肉。', hold: 1.0 },
      { t: '牛肉嫩！', hold: 0.2 },
    ] },
    { id: 'p06', section: '5 个词', title: '蘸料', after: 0.3, cues: [
      { t: '蘸料。', hold: 0.8 },
      { t: '要蘸料吗？', hold: 1.2 },
      { t: '要，一份蘸料。', hold: 1.0 },
      { t: '蘸料绝了！', hold: 0.2 },
    ] },
    { id: 'p07', section: '成句', title: 'Put it together', after: 0.5, cues: [
      { t: '今天吃火锅，我要一个鸳鸯锅，锅底一边辣、一边不辣，再来一盘牛肉和一份蘸料。', hold: 0.8 },
    ] },
    { id: 'p08', section: '复习', title: "Today's receipt", after: 0.7, cues: [
      { t: '恭喜你，今天又学会了五个词！', hold: 0.3 },
      { t: '这是今天的小票，暂停读一下。', hold: 2.5 },
    ] },
  ];

  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
