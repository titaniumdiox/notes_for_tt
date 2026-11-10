from __future__ import annotations
import json,re,subprocess
from pathlib import Path
EP=Path("production/episodes/13-spring-dawn"); MP3=EP/"audio"; FF=Path(".runtime/pydeps/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe").resolve()
PAGES=[[("Momo's Afternoon Reading.","p01-c00"),("春晓。","p01-c02"),("Spring Dawn.","p01-c03"),("唐。","p01-c04"),("孟浩然。","p01-c05"),("Meng Haoran from Tang Dynasty.","p01-c06")],[("春眠不觉晓。","p02-c00"),("Spring sleep — I wake to morning sun,","p02-c01"),("春眠。","p02-c02"),("spring sleep.","p02-c03")],[("处处闻啼鸟。","p03-c00"),("Birds are singing, one by one.","p03-c01"),("啼鸟。","p03-c02"),("singing birds.","p03-c03")],[("夜来风雨声。","p04-c00"),("Last night came the wind and rain,","p04-c01"),("风雨。","p04-c02"),("wind and rain.","p04-c03")],[("花落知多少。","p05-c00"),("How many blossoms fall again?","p05-c01"),("花落。","p05-c02"),("falling flowers.","p05-c04"),("知多少。","p05-c03"),("wonder how many.","p05-c05")],[("春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。","p06-c00"),("Spring sleep — I wake to morning sun. Birds are singing, one by one. Last night came the wind and rain. How many blossoms fall again?","p06-c01")],[("这是今天的词汇小票。","p07-c00"),("今天学会了一首唐诗。","p07-c01")],[("A little poem, a little peace.","p08-c00")]]
def err(a): return subprocess.run([str(FF),"-hide_banner",*a],capture_output=True,text=True,encoding="utf-8",errors="replace").stderr
def dur(p):
 m=re.search(r"Duration:\s*(\d+):(\d+):([\d.]+)",err(["-i",str(p)])); return int(m.group(1))*3600+int(m.group(2))*60+float(m.group(3))
def trim(s,d):
 d.parent.mkdir(parents=True,exist_ok=True); raw=d.with_suffix(".raw.wav")
 subprocess.run([str(FF),"-y","-hide_banner","-loglevel","error","-i",str(s),"-ac","1","-ar","24000","-c:a","pcm_s16le",str(raw)],check=True)
 q=dur(raw); log=err(["-i",str(raw),"-af","silencedetect=noise=-45dB:d=0.08","-f","null","NUL"])
 st=[float(x) for x in re.findall(r"silence_start:\s*([\d.]+)",log)]; en=[float(x) for x in re.findall(r"silence_end:\s*([\d.]+)",log)]
 a,b=0.0,q
 if st and en and st[0]<=0.02:a=en[0]
 if st and en and en[-1]>=q-0.04:b=st[-1]
 if b-a<0.2:a,b=0.0,q
 subprocess.run([str(FF),"-y","-hide_banner","-loglevel","error","-i",str(raw),"-ss",f"{a:.3f}","-to",f"{b:.3f}","-c:a","pcm_s16le",str(d)],check=True); raw.unlink(missing_ok=True)
def main():
 pages=[]
 for page in PAGES:
  rows=[]
  for text,stem in page:
   s=MP3/f"{stem}.mp3"; d=EP/"audio"/f"{stem}.wav"
   if not s.exists(): raise FileNotFoundError(s)
   trim(s,d); rows.append({"t":text,"f":f"audio/{d.name}","d":round(dur(d),3),"o":0.0})
  pages.append(rows)
 (EP/"voice.js").write_text("SCRIPT.VOICE = "+json.dumps({"speaker":"zh_female_meilinvyou_uranus_bigtts","provider":"volc+elevenlabs","pages":pages},ensure_ascii=False,indent=2)+";\n",encoding="utf-8")
 print("pages",len(pages),"cues",sum(len(x) for x in pages)); print("total",round(sum(r["d"] for p in pages for r in p),2))
 for i,p in enumerate(pages,1): print(i,[r["d"] for r in p])
if __name__=="__main__": main()
