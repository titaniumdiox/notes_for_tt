from __future__ import annotations
import json, re, subprocess
from pathlib import Path
EP=Path("production/episodes/11-high-speed-train"); MP3=EP/"audio"; FF=Path(".runtime/pydeps/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe").resolve()
PAGES=[
[("Momo is going on a trip by high-speed train.","p01-c00")],
[("高铁。","p02-c00"),("这是什么？","p02-c01"),("这是高铁。","p02-c02"),("好快！","p02-c03")],
[("车站。","p03-c00"),("这是哪里？","p03-c01"),("这是车站。","p03-c02"),("好大！","p03-c03")],
[("车票。","p04-c00"),("进站要什么？","p04-c01"),("要车票。","p04-c02"),("拿好车票！","p04-c03")],
[("行李。","p05-c00"),("你带了什么？","p05-c01"),("我带行李。","p05-c02"),("行李不重！","p05-c03")],
[("座位。","p06-c00"),("你的座位在哪里？","p06-c01"),("我的座位在这里。","p06-c02"),("找到了！","p06-c03")],
[("我坐高铁去旅行：带行李、拿车票，在车站找座位。","p07-c00")],
[("恭喜你，今天又学会了五个词！","p08-c00"),("这是今天的小票，暂停读一下。","p08-c01")]]
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
