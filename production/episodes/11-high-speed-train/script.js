(function (root) {
  const META={voice:{speaker:'zh_female_meilinvyou_uranus_bigtts'},style:'study',title:'High-Speed Train v1',name:'high-speed-train-v1',lang:'en',gap:0.2,pace:{maxHold:3.0,gap:0.2,tail:2.5},extras:['extras/word.js']};
  const PAGES=[
    {id:'p01',section:'开场',title:'Momo Takes a High-Speed Train',after:2.2,cues:[{t:'Momo is going on a trip by high-speed train.',hold:0.4}]},
    {id:'p02',section:'5 个词',title:'高铁',after:0.8,cues:[{t:'高铁。',hold:0.6},{t:'这是什么？',hold:1.0},{t:'这是高铁。',hold:1.0},{t:'好快！',hold:0.2}]},
    {id:'p03',section:'5 个词',title:'车站',after:0.9,cues:[{t:'车站。',hold:0.6},{t:'这是哪里？',hold:1.0},{t:'这是车站。',hold:1.0},{t:'好大！',hold:0.2}]},
    {id:'p04',section:'5 个词',title:'车票',after:0.9,cues:[{t:'车票。',hold:0.6},{t:'进站要什么？',hold:1.0},{t:'要车票。',hold:1.0},{t:'拿好车票！',hold:0.2}]},
    {id:'p05',section:'5 个词',title:'行李',after:1.0,cues:[{t:'行李。',hold:0.6},{t:'你带了什么？',hold:1.0},{t:'我带行李。',hold:1.0},{t:'行李不重！',hold:0.2}]},
    {id:'p06',section:'5 个词',title:'座位',after:1.0,cues:[{t:'座位。',hold:0.6},{t:'你的座位在哪里？',hold:1.0},{t:'我的座位在这里。',hold:1.0},{t:'找到了！',hold:0.2}]},
    {id:'p07',section:'成句',title:'The journey begins',after:1.0,cues:[{t:'我坐高铁去旅行：带行李、拿车票，在车站找座位。',hold:0.8}]},
    {id:'p08',section:'复习',title:"Today's receipt",after:3.2,cues:[{t:'恭喜你，今天又学会了五个词！',hold:0.3},{t:'这是今天的小票，暂停读一下。',hold:2.2}]}
  ];
  root.SCRIPT={META,PAGES};
})(typeof window!=='undefined'?window:globalThis);
