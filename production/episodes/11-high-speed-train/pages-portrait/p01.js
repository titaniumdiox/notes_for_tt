ENGINE.visual('p01', (P) => {
  const t0=P.c(0);
  P.img('assets/mascot/scenes/p01-platform-v1.png',0,0,1080,1920,{fit:'cover',at:0});
  P.canvas(0,0,1080,106,(ctx)=>{ctx.clearRect(0,0,1080,106);ctx.fillStyle='rgba(233,222,205,.94)';ctx.fillRect(0,0,1080,106);ctx.fillStyle='rgba(43,52,64,.12)';ctx.fillRect(0,103,1080,3);});
  P.canvas(0,1810,1080,110,(ctx)=>{ctx.clearRect(0,0,1080,110);ctx.fillStyle='rgba(233,222,205,.94)';ctx.fillRect(0,0,1080,110);ctx.fillStyle='rgba(43,52,64,.12)';ctx.fillRect(0,0,1080,3);});
  P.text('SINOFIELDNOTES',{x:64,y:34,w:620,align:'l',size:31,color:'ink',weight:800,at:t0});
  P.text('EP.11',{x:1016,y:44,w:160,align:'r',size:22,color:'soft',weight:700,at:t0});
  P.canvas(600,30,280,46,(ctx)=>{ctx.clearRect(0,0,280,46);for(let i=0;i<5;i++){ctx.beginPath();ctx.arc(22+i*50,23,8,0,Math.PI*2);ctx.fillStyle='#E9DECD';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='#B9AA96';ctx.stroke();}});
  P.text('EP.11 · HIGH-SPEED TRAIN',{x:540,y:142,w:900,align:'c',size:25,color:'soft',weight:700,at:t0,mode:'fade'});
  P.text('Momo Takes a',{x:540,y:185,w:940,align:'c',size:56,color:'ink',weight:700,at:t0+0.05,cps:8});
  P.text('High-Speed Train',{x:540,y:245,w:940,align:'c',size:52,color:'red',weight:700,font:'latin',at:t0+0.2,mode:'fade'});
  P.text('Momo坐高铁',{x:540,y:318,w:900,align:'c',size:40,color:'ink',weight:700,at:t0+0.3,mode:'fade'});
  P.text('Momo is going on a trip',{x:540,y:390,w:900,align:'c',size:29,color:'ink',weight:600,at:t0+0.45,mode:'fade'});
  P.text('by high-speed train.',{x:540,y:432,w:900,align:'c',size:29,color:'ink',weight:600,at:t0+0.55,mode:'fade'});
  P.text('5 words · 60 seconds',{x:540,y:500,w:900,align:'c',size:22,color:'soft',weight:600,at:t0+0.7,mode:'fade'});
  P.text('SINOFIELDNOTES · 坐高铁',{x:540,y:1844,w:900,align:'c',size:22,color:'soft',weight:700,at:0,mode:'fade'});
});
