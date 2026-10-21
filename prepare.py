from pathlib import Path
from PIL import Image
from pypdf import PdfReader
import io, subprocess, imageio_ffmpeg
root=Path(__file__).parent
a=root/'dist/assets'
mapping={'exterior':'0d897173-5dbe-4a57-b1c8-92b8732c9589','welcome':'46db23ba-f861-489c-a5a7-b541a6e851ca','room':'8e8f0338-1cad-4d5a-9de8-6c00d181cf8b','room-purple':'1b6d3a38-5a7e-4d6b-9993-75e3fe3c9938','lounge':'b0282f42-567c-4016-b095-a09f1a59aa4b','entrance':'f9a81386-ed32-4e7d-a78e-2b5416a5a9a1','garden':'44ae657e-a3c0-4f7c-b05f-1465c7d4532f','reception':'c8be08ee-bb37-4d64-9c06-442b65e2f540'}
for name,uid in mapping.items():
 im=Image.open('C:/Users/OPAKI/AppData/Local/Temp/codex-clipboard-'+uid+'.jpg'); im.save(a/(name+'.webp'),quality=85)
d=PdfReader('C:/Users/OPAKI/Downloads/Telegram Desktop/spa menuprint.pdf')
def crop(page,box,name):
 im=Image.open(io.BytesIO(d.pages[page-1].images[0].data)).convert('RGB'); w,h=im.size
 im=im.crop(tuple(int(v*(w if i%2==0 else h)) for i,v in enumerate(box))); im.thumbnail((1400,1100)); im.save(a/(name+'.webp'),quality=91)
crop(7,(.63,.08,.85,.41),'logo')
crop(4,(0,0,.49,1),'massage')
crop(3,(.5,0,1,.65),'stones')
crop(2,(.53,.31,.95,.67),'scrub')
crop(7,(0,0,.48,1),'four-hands')
crop(12,(.5,0,1,1),'prenatal')
files=list(Path('C:/Users/OPAKI/Downloads/Telegram Desktop').glob('video_2026-10-21_20-16-16*.mp4'))
seen=set()
for f in files:
 if f.stat().st_size in seen: continue
 seen.add(f.stat().st_size); n=len(seen)
 subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-y','-i',str(f),'-t','28','-an','-vf','scale=1280:-2','-c:v','libx264','-crf','27','-preset','fast','-movflags','+faststart',str(a/f'tour-{n}.mp4')],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,check=True)
 subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-y','-ss','2','-i',str(f),'-frames:v','1',str(a/f'poster-{n}.jpg')],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,check=True)
print('Assets prepared')
