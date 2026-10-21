from pathlib import Path
p=Path('dist/index.html')
s=p.read_text(encoding='utf-8-sig')
s=s.replace('<a class="wa-link" target="_blank" rel="noopener">Chat on WhatsApp ↗</a>','<a class="wa-link" target="_blank" rel="noopener">Chat on WhatsApp ↗</a><div class="social-links"><a href="https://www.facebook.com/p/Sun-Flower-Massage-Spa-100067891853638/" target="_blank" rel="noopener">Facebook ↗</a><a href="https://www.tiktok.com/discover/sunflower-spa-bukoto" target="_blank" rel="noopener" aria-label="Discover Sunflower Spa on TikTok">TikTok discovery ↗</a></div>')
p.write_text(s,encoding='utf-8')
