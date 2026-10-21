const SERVICES=[
 ['Swedish massage','Massage',[['Standard',100000],['Extended · confirm duration',150000]]],
 ['Deep tissue','Massage',[['60 min',120000],['90 min',170000]]],
 ['Aromatherapy','Massage',[['60 min',120000],['90 min',170000]]],
 ['Thai massage','Massage',[['60 min',150000],['90 min',200000]]],
 ['Hot stone','Rituals',[['60 min',150000],['90 min',200000]]],
 ['Hot towel','Rituals',[['60 min',150000],['90 min',200000]]],
 ['Body scrub & steam','Body care',[['60 min',200000],['90 min',250000]]],
 ['Moroccan bath','Body care',[['Up to 2 hours',250000]]],
 ['Four hands','Massage',[['60 min',250000],['90 min',300000]]],
 ['Couple massage','Massage',[['60 min',200000],['90 min',250000]]],
 ['Body & soul · scrub, stone, aroma','Rituals',[['90 min',250000]]],
 ['Calabash','Rituals',[['60 min',300000],['90 min',350000]]],
 ['Massage gun','Massage',[['60 min',150000]]],
 ['Prenatal massage','Massage',[['60 min',150000]]],
 ['Foot & leg massage','Massage',[['60 min',100000]]],
 ['Back & shoulder massage','Massage',[['60 min',100000]]],
 ['VIP massage room','Rituals',[['60 min',200000]]]
];
const PHONE='256758918643';
const money=n=>'UGX '+n.toLocaleString('en-UG');
const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];
const chosen=new Map();let step=0;let message='';
const chat='Hello Sunflower Spa! I found your contact on the Sunflower Spa website and would like to enquire about a visit.\nSource: Sunflower Spa website';
$$('.wa-link').forEach(a=>a.href='https://wa.me/'+PHONE+'?text='+encodeURIComponent(chat));
$('#year').textContent=new Date().getFullYear();
function renderMenu(category='All'){$('#serviceMenu').innerHTML=SERVICES.map((s,i)=>category==='All'||s[1]===category?`<button class="service-row" data-service="${i}"><span><strong>${s[0]}</strong><small>${s[2].map(o=>o[0]).join(' / ')}</small></span><span>${s[2].length>1?'from ':''}${money(s[2][0][1])} <b>＋</b></span></button>`:'').join('');$$('[data-service]').forEach(b=>b.onclick=()=>{chosen.set(+b.dataset.service,0);sync();openBooking()});$$('[data-category]').forEach(b=>b.classList.toggle('selected',b.dataset.category===category))}
renderMenu();$$('[data-category]').forEach(b=>b.onclick=()=>renderMenu(b.dataset.category));$$('[data-filter]').forEach(b=>b.onclick=()=>{renderMenu(b.dataset.filter);$('.menu-head').scrollIntoView({behavior:'smooth'})});
$('#bookingServices').innerHTML=SERVICES.map((s,i)=>`<div class="booking-option"><label><input type="checkbox" data-check="${i}">${s[0]}</label><select aria-label="${s[0]} duration" data-option="${i}">${s[2].map((o,j)=>`<option value="${j}">${o[0]} · ${o[1].toLocaleString()}</option>`).join('')}</select></div>`).join('');
function sync(){$$('[data-check]').forEach(c=>c.checked=chosen.has(+c.dataset.check));$$('[data-option]').forEach(s=>{s.value=chosen.get(+s.dataset.option)||0;s.disabled=!chosen.has(+s.dataset.option)});$('.booking-total').textContent=chosen.size?`${chosen.size} treatment${chosen.size===1?'':'s'} · Listed total ${money(total())}`:'Choose your first treatment';$('#selectionError').textContent=''}
function total(){return [...chosen].reduce((n,[i,j])=>n+SERVICES[i][2][j][1],0)}
$$('[data-check]').forEach(c=>c.onchange=()=>{c.checked?chosen.set(+c.dataset.check,0):chosen.delete(+c.dataset.check);sync()});$$('[data-option]').forEach(s=>s.onchange=()=>{chosen.set(+s.dataset.option,+s.value);sync()});sync();
function showStep(n){step=n;$$('.book-step').forEach((s,i)=>s.hidden=i!==n);$$('.steps span').forEach((s,i)=>s.classList.toggle('active',i===n));$('#booking').scrollTop=0}
function openBooking(branch){if(branch)$('#bookingForm').elements.branch.value=branch;showStep(0);$('#handoff').textContent='';$('#booking').showModal()}
$$('[data-book]').forEach(b=>b.onclick=()=>openBooking());$$('[data-branch]').forEach(b=>b.onclick=()=>openBooking(b.dataset.branch));
$$('dialog .close').forEach(b=>b.onclick=()=>b.closest('dialog').close());$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
function kampalaDate(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Kampala',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
const form=$('#bookingForm');form.elements.date.min=kampalaDate();
function validVisit(){form.elements.date.min=kampalaDate();for(const el of $$('.book-step[data-step="1"] input,.book-step[data-step="1"] select')){el.setCustomValidity('');if(!el.reportValidity())return false}const appointment=new Date(form.elements.date.value+'T'+form.elements.time.value+':00+03:00');if(appointment<=new Date()){form.elements.time.setCustomValidity('Please choose a future date and time in Uganda.');form.elements.time.reportValidity();return false}return true}
function buildMessage(){const f=new FormData(form);return ['SUNFLOWER SPA — WEBSITE BOOKING REQUEST','Source: Sunflower Spa website','',`Name: ${f.get('name').trim()}`,`Phone: ${f.get('phone').trim()}`,`Branch: ${f.get('branch')} — ${f.get('branch')==='Kisasi'?'opposite Black Panther Bar':'Kiwanda Road, Bukoto'}`,`Preferred date: ${f.get('date')}`,`Preferred time: ${f.get('time')} (Uganda / EAT)`,`Guests: ${f.get('guests')}`,'','TREATMENTS',...[...chosen].map(([i,j])=>`• ${SERVICES[i][0]} — ${SERVICES[i][2][j][0]} — ${money(SERVICES[i][2][j][1])}`),'',`Listed treatment total: ${money(total())}`,'Group pricing / final total to be confirmed by the spa.',f.get('notes').trim()?`Notes: ${f.get('notes').trim()}`:'','Please confirm availability and my appointment.'].filter(x=>x!==null).join('\n')}
$$('.next').forEach(b=>b.onclick=()=>{if(step===0){if(!chosen.size){$('#selectionError').textContent='Please choose at least one treatment.';return}showStep(1)}else if(validVisit()){message=buildMessage();$('#review').textContent=message;showStep(2)}});$$('.back').forEach(b=>b.onclick=()=>showStep(step-1));form.onsubmit=e=>{e.preventDefault();if(step!==2)return;window.open('https://wa.me/'+PHONE+'?text='+encodeURIComponent(message),'_blank','noopener');$('#handoff').textContent='Your request is ready in WhatsApp. Tap Send there; our team will reply to confirm.'};
form.elements.time.addEventListener('input',()=>form.elements.time.setCustomValidity(''));form.elements.date.addEventListener('input',()=>form.elements.time.setCustomValidity(''));
$$('[data-image]').forEach(b=>b.onclick=()=>{$('#lightbox img').src='assets/'+b.dataset.image+'.webp';$('#lightbox img').alt=b.querySelector('img').alt;$('#lightbox').showModal()});$('#privacyOpen').onclick=()=>$('#privacy').showModal();
let film=1;const video=$('#heroVideo');function videoState(){const paused=video.paused;$('#videoToggle').textContent=paused?'▶':'Ⅱ';$('#videoToggle').setAttribute('aria-label',paused?'Play background video':'Pause background video')}
function playFilm(n){film=n;video.src='assets/tour-'+n+'.mp4';video.poster='assets/poster-'+n+'.jpg';video.play().catch(videoState);$$('[data-video]').forEach(b=>b.classList.toggle('active',+b.dataset.video===n))}video.onended=()=>playFilm(film===1?2:1);video.onplay=videoState;video.onpause=videoState;$('#videoToggle').onclick=()=>video.paused?video.play().catch(videoState):video.pause();$$('[data-video]').forEach(b=>b.onclick=()=>playFilm(+b.dataset.video));
const showcaseButtons = [...document.querySelectorAll('[data-showcase]')];
const showcasePanels = [...document.querySelectorAll('.feature-grid article')];
function selectShowcase(index) {
 showcaseButtons.forEach((button,i)=>{button.classList.toggle('active',i===index);button.setAttribute('aria-pressed',String(i===index));});
 showcasePanels.forEach((panel,i)=>panel.classList.toggle('active',i===index));
}
showcaseButtons.forEach(button=>button.addEventListener('click',()=>selectShowcase(Number(button.dataset.showcase))));
selectShowcase(0);
