(function (root) {
  const META = {
    voice: { speaker: 'zh_female_meilinvyou_uranus_bigtts' },
    style: 'study',
    title: "Momo's Afternoon Reading 01",
    name: 'momo-reading-01',
    lang: 'en',
    gap: 0.2,
    pace: { maxHold: 3.0, gap: 0.2, tail: 2.5 },
    extras: ['extras/poem.js'],
  };

  const PAGES = [
    { id: 'p01', section: '开场', title: "Momo's Afternoon Reading", after: 3.5, cues: [
      { t: "Momo's Afternoon Reading. Quiet Night Thoughts.", hold: 0.5 },
    ] },
    { id: 'p02', section: '诗句', title: '床前明月光', after: 0.6, cues: [
      { t: '床前明月光。', hold: 1.5 },
      { t: 'Before my bed the moonlight streams.', hold: 0.5 },
      { t: '明月。', hold: 0.5 },
      { t: 'bright moon.', hold: 0.2 },
    ] },
    { id: 'p03', section: '诗句', title: '疑是地上霜', after: 0.5, cues: [
      { t: '疑是地上霜。', hold: 1.5 },
      { t: 'And on the ground, like frost, it gleams.', hold: 0.5 },
      { t: '霜。', hold: 0.5 },
      { t: 'frost.', hold: 0.2 },
    ] },
    { id: 'p04', section: '诗句', title: '举头望明月', after: 0.8, cues: [
      { t: '举头望明月。', hold: 2.0 },
      { t: 'I raise my head — the moon is bright.', hold: 0.5 },
      { t: '举头。', hold: 0.5 },
      { t: "raise one's head.", hold: 0.2 },
    ] },
    { id: 'p05', section: '诗句', title: '低头思故乡', after: 0.8, cues: [
      { t: '低头思故乡。', hold: 1.5 },
      { t: 'I lower my head — home fills the night.', hold: 0.3 },
      { t: '低头。', hold: 0.4 },
      { t: "lower one's head.", hold: 0.4 },
      { t: '故乡。', hold: 0.6 },
      { t: 'hometown.', hold: 0.2 },
    ] },
    { id: 'p06', section: '全诗', title: '静夜思', after: 0.2, cues: [
      { t: '床前明月光，疑是地上霜。举头望明月，低头思故乡。', hold: 0.2 },
      { t: 'Before my bed the moonlight streams. And on the ground like frost it gleams. I raise my head the moon is bright. I lower my head and home fills the night.', hold: 0.2 },
    ] },
    { id: 'p07', section: '词汇小票', title: 'Vocabulary receipt', after: 6.0, cues: [
      { t: '这是今天的词汇小票。', hold: 0.3 },
    ] },
    { id: 'p08', section: '收尾', title: 'A little peace', after: 2.8, cues: [
      { t: 'A little poem, a little peace.', hold: 0.2 },
    ] },
  ];

  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
