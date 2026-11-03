(function (root) {
  const META = {
    voice: { speaker: 'zh_female_meilinvyou_uranus_bigtts' },
    style: 'study',
    title: 'Rainy Day v1',
    name: 'rainy-day-v1',
    lang: 'en',
    gap: 0.2,
    pace: { maxHold: 3.0, gap: 0.2, tail: 2.5 },
    extras: ['extras/word.js'],
  };

  const PAGES = [
    { id: 'p01', section: '开场', title: "Momo's Rainy Day", after: 2.0, cues: [
      { t: "Momo wants to go out. But it's raining.", hold: 0.5 },
    ] },
    { id: 'p02', section: '5 个词', title: '下雨', after: 0.7, cues: [
      { t: '下雨。', hold: 0.7 },
      { t: '外面怎么了？', hold: 1.1 },
      { t: '下雨了。', hold: 1.0 },
      { t: '雨好大！', hold: 0.2 },
    ] },
    { id: 'p03', section: '5 个词', title: '天气', after: 0.7, cues: [
      { t: '天气。', hold: 0.7 },
      { t: '今天天气怎么样？', hold: 1.1 },
      { t: '今天天气不好。', hold: 1.0 },
      { t: '阴天。', hold: 0.2 },
    ] },
    { id: 'p04', section: '5 个词', title: '雨衣', after: 0.7, cues: [
      { t: '雨衣。', hold: 0.7 },
      { t: '出门穿什么？', hold: 1.1 },
      { t: '我穿雨衣。', hold: 1.0 },
      { t: '雨衣穿好了！', hold: 0.2 },
    ] },
    { id: 'p05', section: '5 个词', title: '雨伞', after: 0.8, cues: [
      { t: '雨伞。', hold: 0.7 },
      { t: '还要带什么？', hold: 1.1 },
      { t: '我带雨伞。', hold: 1.0 },
      { t: '伞打开了！', hold: 0.2 },
    ] },
    { id: 'p06', section: '5 个词', title: '雨滴', after: 0.8, cues: [
      { t: '雨滴。', hold: 0.8 },
      { t: '雨滴落在哪里？', hold: 1.2 },
      { t: '雨滴落在伞上。', hold: 1.1 },
      { t: '滴答滴答！', hold: 0.2 },
    ] },
    { id: 'p07', section: '成句', title: 'One rainy day', after: 0.8, cues: [
      { t: '今天天气不好，下雨了。我穿雨衣、带雨伞，雨滴落在我的伞上。', hold: 0.8 },
    ] },
    { id: 'p08', section: '复习', title: "Today's receipt", after: 0.5, cues: [
      { t: '恭喜你，今天又学会了五个词！', hold: 0.3 },
      { t: '这是今天的小票，暂停读一下。', hold: 2.0 },
    ] },
  ];

  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
