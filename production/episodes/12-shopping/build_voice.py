from __future__ import annotations
import json,re,subprocess
from pathlib import Path
EP=Path("production/episodes/12-shopping"); MP3=EP/"audio"; FF=Path(".runtime/pydeps/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe").resolve()
PAGES=[[("Momo is going shopping today.","p01-c00")],[("商店。","p02-c00"),("这是哪里？","p02-c01"),("这是商店。","p02-c02"),("水果店！","p02-c03")],[("水果。","p03-c00"),("你买什么？","p03-c01"),("我买水果。","p03-c02"),("好多水果！","p03-c03")],[("苹果。","p04-c00"),("你要哪种水果？","p04-c01"),("我要苹果。","p04-c02"),("红红的！","p04-c03")],[("多少钱？","p05-c00"),("这个多少钱？","p05-c01"),("五块钱。","p05-c02"),("五块！","p05-c03")],[("付款。","p06-c00"),("怎么付款？","p06-c01"),("手机付款。","p06-c02"),("付好了！","p06-c03")],[("我去商店买水果：问苹果多少钱，然后付款。","p07-c00")],[("恭喜你，今天又学会了五个词！","p08-c00"),("这是今天的小票，暂停读一下。","p08-c01")]]
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
if __name__=="__main__": main()
