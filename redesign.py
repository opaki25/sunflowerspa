from pathlib import Path
import re
p=Path('dist/index.html'); s=p.read_text(encoding='utf-8')
s=s.replace('assets/logo.webp','assets/logo-transparent.png')
s=s.replace('<header>','<header><span class="header-location">KAMPALA, UGANDA<br><b>A GOOD PLACE TO PAUSE.</b></span>')
s=s.replace('<nav aria-label="Main navigation">','<nav aria-label="Main navigation">')
start=s.index('<section class="hero">'); end=s.index('<section class="intro section"',start)
s=s[:start]+'''<section class="hero"><div class="hero-title"><p>WELLNESS, WITH A LITTLE SOUL.</p><h1>SUNFLOWER<span>SPA</span></h1><div class="title-foot"><span>BODY. MIND. YOUR TIME.</span><a href="#branches">KISASI ↗ &nbsp; BUKOTO ↗</a></div></div><div class="film-stage"><video id="heroVideo" autoplay muted playsinline preload="auto" poster="assets/poster-1.jpg"><source src="assets/tour-1.mp4" type="video/mp4"></video><div class="shade"></div><span class="film-label">A GLIMPSE INSIDE / SUNFLOWER SPA</span><div class="hero-copy"><p class="eyebrow">THE CITY CAN WAIT.</p><h2>Come in.<br><em>Exhale.</em></h2><p>A slower rhythm. A deeper breath.<br>A little time to feel like yourself again.</p></div><button class="orbit-book" data-book><span>YOUR TIME<br>STARTS HERE</span><strong>↗</strong><small>BOOK A VISIT</small></button><div class="hero-bottom"><span>PRESS PAUSE ON THE EVERYDAY</span><div><button id="videoToggle" aria-label="Pause background video">Ⅱ</button><button class="video-dot active" data-video="1" aria-label="Play spa film one">01</button><button class="video-dot" data-video="2" aria-label="Play spa film two">02</button></div><a href="#spaces">EXPLORE ↓</a></div></div></section><div class="ribbon"><span>A MOMENT TO RESET</span><i>✳</i><span>A SPACE TO UNWIND</span><i>✳</i><span>A REASON TO RETURN</span></div>
'''+s[end:]
s=s.replace('<h2>Make room<br>for <em>feeling good.</em></h2>','<h2>Less rush.<br>More <em>you.</em></h2>')
s=s.replace('<span class="round-note">SLOW DOWN<br>✧<br>YOU’RE HERE</span>','<span class="photo-note">01 — A WARMER WELCOME</span><span class="flower-outline" aria-hidden="true">✳</span>')
s=s.replace('<h2>Your body.<br><em>Your kind of ritual.</em></h2>','<h2>How do you want<br>to <em>feel?</em></h2>')
s=s.replace('<div class="feature-grid">','<div class="ritual-tabs" role="group" aria-label="Explore treatment collections"><button class="active" data-showcase="0" aria-pressed="true">01 / RELEASE</button><button data-showcase="1" aria-pressed="false">02 / REBALANCE</button><button data-showcase="2" aria-pressed="false">03 / RENEW</button></div><div class="feature-grid">')
s=s.replace('<h2>The world can wait.<br><em>This moment is yours.</em></h2>','<h2>OUT OF OFFICE.<br><em>Into yourself.</em></h2>')
s=s.replace('<h2>Spaces that invite<br>you to <em>stay a little.</em></h2>','<h2>A different<br><em>state of mind.</em></h2>')
s=s.replace('<h2>Two homes.<br><em>The same Sunflower warmth.</em></h2>','<h2>CHOOSE YOUR<br><em>change of pace.</em></h2>')
s=s.replace('<span class="tag">OUR NEW BRANCH</span>','<span class="branch-number" aria-hidden="true">01</span><span class="tag">OUR NEW BRANCH</span>')
s=s.replace('<span class="tag">OUR ORIGINAL HOME</span>','<span class="branch-number" aria-hidden="true">02</span><span class="tag">OUR ORIGINAL HOME</span>')
s=s.replace('<h2>Your next good feeling<br><em>starts here.</em></h2>','<h2>YOU DESERVE<br><em>this.</em><span aria-hidden="true">✳</span></h2>')
s=s.replace('<footer id="contact">','<footer id="contact"><div class="footer-word" aria-hidden="true">sunflower.</div>')
s=s.replace('href="style.css"','href="style.css?v=2"').replace('src="app.js"','src="app.js?v=2"')
p.write_text(s,encoding='utf-8')
css=Path('dist/style.css').read_text(encoding='utf-8-sig')
# Keep the working booking and accessibility styles; replace the presentation completely.
modal=css[css.index('dialog{'):css.index('@media(min-width:1600px)')]
Path('dialog-styles.txt').write_text(modal,encoding='utf-8')
