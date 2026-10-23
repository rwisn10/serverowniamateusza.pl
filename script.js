/* PRZERWA TECHNICZNA: true = wszystkie strony pokazują przerwa.html; false = strona działa normalnie */
const MAINTENANCE=false;
if(MAINTENANCE&&!/przerwa\.html$/.test(location.pathname)){document.documentElement.style.visibility='hidden';location.replace('przerwa.html');}
const PAGES=[['index.html','Start'],['o-mnie.html','O mnie'],['poglady.html','Poglądy'],['program.html','Program'],['dzialania.html','Działania'],['artykuly.html','Artykuły'],['aktualnosci.html','Aktualności'],['kontakt.html','Kontakt']];
let cur=location.pathname.split('/').pop()||'index.html';if(cur==='artykul.html')cur='artykuly.html';
/* SPOTKANIA: edytuj tylko tę listę. Minione terminy znikają same. [data RRRR-MM-DD, godzina, miejsce, temat] */
const MEETS=[
['2026-10-17','12:00','Cyców — świetlica wiejska','Rolnictwo i drogi lokalne'],
['2026-10-21','17:30','Spiczyn — dom kultury','Młodzież, szkoły i praca'],
['2026-10-24','11:00','Puchaczów — świetlica','Przyszłość górniczego regionu'],
['2026-10-28','18:00','Milejów — dom kultury','Seniorzy i opieka'],
['2026-11-07','15:00','Łęczna — Rynek','Spotkanie z mieszkańcami całego powiatu']];
const MN=['sty','lut','mar','kwi','maj','cze','lip','sie','wrz','paź','lis','gru'],DN=['niedz.','pon.','wt.','śr.','czw.','pt.','sob.'];
const sup='<a class="support" href="https://pis.org.pl/" target="_blank" rel="noopener" title="Prawo i Sprawiedliwość"><span>Popierany przez:</span><img src="pis-logo.png" alt="Prawo i Sprawiedliwość"></a>';
const today=new Date().toLocaleDateString('pl-PL',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
document.querySelector('#nav').outerHTML=`<header class="rail" id="nav"><a class="brand" href="index.html"><img src="logo.png" alt="Herb"><b>Mateusz Talar</b></a><button class="burger" aria-label="Menu">☰</button><ul class="menu">${PAGES.map(([h,t])=>`<li><a href="${h}" class="${h===cur?'on':''}">${t}</a></li>`).join('')}</ul></header>`;
document.querySelector('#foot').outerHTML=`<footer><div class="wrap"><div class="cols"><div><h4>Mateusz Talar — Komitet Wyborczy</h4><p>Kandydat niezależny, powiat łęczyński. Praca, rodzina, bezpieczeństwo.</p>${sup}</div><div><h4>Strony</h4>${PAGES.map(([h,t])=>`<a href="${h}">${t}</a>`).join('')}</div><div><h4>Kontakt</h4><a href="mailto:sztab@example.com">sztab@example.com</a><a href="kontakt.html">Dołącz do sztabu</a></div></div><div class="fine">Strona fikcyjna, przygotowana jako przykład. Postaci, cytaty i wydarzenia są wymyślone.</div></div></footer>`;
const nav=document.getElementById('nav');nav.querySelector('.burger').onclick=()=>nav.querySelector('.menu').classList.toggle('open');
const t0=new Date();t0.setHours(0,0,0,0);
const up=MEETS.map(m=>({d:new Date(m[0]+'T00:00:00'),h:m[1],p:m[2],s:m[3]})).filter(m=>m.d>=t0).sort((a,b)=>a.d-b.d);
document.querySelectorAll('[data-meets]').forEach(el=>{const l=up.slice(0,+el.dataset.max||99);
 if(!l.length){el.innerHTML='<li>Kolejne terminy ogłosimy wkrótce.</li>';return}
 el.innerHTML=el.dataset.meets==='list'?l.map(m=>`<li><span class="md"><b>${m.d.getDate()}</b>${MN[m.d.getMonth()]}</span><div><strong>${m.p}</strong><span class="s">${DN[m.d.getDay()]}, ${m.h} · ${m.d.getDate()} ${MN[m.d.getMonth()]} · ${m.s}</span></div></li>`).join('')
 :l.map(m=>`<div class="card meet reveal"><div class="date"><b>${m.d.getDate()}</b>${MN[m.d.getMonth()]}</div><div><h3 style="margin:0;font-size:1.2rem">${m.p}</h3><p>${DN[m.d.getDay()]}, godz. ${m.h}</p><p>${m.s}</p></div></div>`).join('')});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const t=+e.target.dataset.to;let n=0;const s=t/40;const i=setInterval(()=>{n+=s;if(n>=t){n=t;clearInterval(i)}e.target.textContent=Math.round(n)},30)}));
document.querySelectorAll('[data-to]').forEach(el=>co.observe(el));
const fb=document.querySelectorAll('.filters button');
fb.forEach(b=>b.onclick=()=>{fb.forEach(x=>x.classList.remove('on'));b.classList.add('on');document.querySelectorAll('[data-cat]').forEach(c=>c.style.display=(b.dataset.f==='all'||c.dataset.cat===b.dataset.f)?'':'none')});
const pr=document.createElement('div');pr.id='prog';document.body.prepend(pr);
const tt=document.createElement('button');tt.id='totop';tt.setAttribute('aria-label','Do góry');tt.textContent='↑';tt.onclick=()=>scrollTo({top:0,behavior:'smooth'});document.body.appendChild(tt);
addEventListener('scroll',()=>{pr.style.setProperty('--w',(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100)+'%');tt.classList.toggle('show',scrollY>700)});
addEventListener('DOMContentLoaded',()=>{const b=document.getElementById('body');if(!b)return;const hs=[...b.querySelectorAll('h3')];if(hs.length<3)return;
 hs.forEach((h,i)=>h.id='s'+(i+1));b.querySelector('p').insertAdjacentHTML('afterend','<nav class="toc"><b>W tym tekście</b><ol>'+hs.map(h=>`<li><a href="#${h.id}">${h.textContent}</a></li>`).join('')+'</ol></nav>')});

/* efekty: kursor, szklane karty, tilt */
const gl=document.createElement('div');gl.className='glow';document.body.appendChild(gl);
document.addEventListener('mousemove',e=>{gl.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
 document.querySelectorAll('.card').forEach(c=>{const r=c.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')})});
document.querySelectorAll('[data-tilt]').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateY(${x*18}deg) rotateX(${-y*18}deg)`});el.addEventListener('mouseleave',()=>el.style.transform='')});
