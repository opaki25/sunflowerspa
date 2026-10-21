from pathlib import Path
import subprocess,imageio_ffmpeg,re
ff=imageio_ffmpeg.get_ffmpeg_exe()
for n in [1,2]:
 p=Path(f'dist/assets/tour-{n}.mp4')
 r=subprocess.run([ff,'-i',str(p),'-t','3','-vf','cropdetect','-f','null','-'],capture_output=True,text=True)
 crop=re.findall(r'crop=(\d+:\d+:\d+:\d+)',r.stderr)[-1]
 dest=p.with_name(f'cropped-{n}.mp4')
 subprocess.run([ff,'-y','-i',str(p),'-vf','crop='+crop+',scale=1280:-2','-an','-c:v','libx264','-crf','25','-preset','fast','-movflags','+faststart',str(dest)],capture_output=True,check=True)
 dest.replace(p)
 subprocess.run([ff,'-y','-ss','2','-i',str(p),'-frames:v','1',f'dist/assets/poster-{n}.jpg'],capture_output=True,check=True)
 print(n,crop)
