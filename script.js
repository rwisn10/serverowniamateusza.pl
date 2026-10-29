/* PRZERWA TECHNICZNA: true = wszystkie strony pokazują przerwa.html; false = strona działa normalnie */
const MAINTENANCE=false;
if(MAINTENANCE&&!/przerwa\.html$/.test(location.pathname)){document.documentElement.style.visibility='hidden';location.replace('przerwa.html');}
const PAGES=[['index.html','Start'],['o-mnie.html','O mnie'],['poglady.html','Poglądy'],['program.html','Program'],['obietnice.html','Obietnice'],['dzialania.html','Działania'],['artykuly.html','Artykuły'],['aktualnosci.html','Aktualności'],['piosenki.html','Piosenki'],['memy.html','Memy'],['kontakt.html','Kontakt']];
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

/* efekty: tilt */
document.querySelectorAll('[data-tilt]').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateY(${x*18}deg) rotateX(${-y*18}deg)`});el.addEventListener('mouseleave',()=>el.style.transform='')});

/* motywy kolorystyczne */
const TH=[['ogien','#14213d,#c8102e','Granat i czerwień'],['granat','#0b1f4d,#1d4ed8','Niebieski'],['las','#0f3d2a,#15803d','Zieleń'],['polska','#5b0b1b,#dc143c','Karmin']];
let th='ogien';try{th=localStorage.getItem('theme')||'ogien'}catch(e){}
const setTh=t=>{th=t;document.documentElement.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}document.querySelectorAll('.themes button').forEach(b=>b.classList.toggle('on',b.dataset.t===t))};
const tb=document.createElement('div');tb.className='themes';tb.innerHTML=TH.map(([k,g,n])=>`<button data-t="${k}" title="${n}" aria-label="Motyw: ${n}" style="--d:linear-gradient(135deg,${g})"></button>`).join('');document.body.appendChild(tb);
tb.querySelectorAll('button').forEach(b=>b.onclick=()=>setTh(b.dataset.t));setTh(th);
/* pszczoły */
document.querySelectorAll('.hero,.page-head.bees').forEach(h=>{for(let i=0;i<7;i++){const b=document.createElement('span');b.className='bee';b.textContent='🐝';b.style.cssText=`top:${12+Math.random()*70}%;font-size:${1+Math.random()*1.1}rem;--t:${14+Math.random()*14}s;--dl:${-Math.random()*20}s`;h.appendChild(b)}});

/* ODTWARZACZ */
const PLS=[];
function fmt(t){t=Math.max(0,Math.floor(t||0));return Math.floor(t/60)+':'+String(t%60).padStart(2,'0')}
function makePlayer(host,tracks,opt={}){
 const I={play:'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',pause:'<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>',prev:'<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>',next:'<svg viewBox="0 0 24 24"><path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z"/></svg>',vol:'<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 4V5L7 9z"/><path d="M16 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'};
 host.className='pl'+(tracks.length<2?' one':'')+(opt.mini?' mini':'');
 host.innerHTML=`<div class="pl-cover"><img src="logo.png" alt=""><div class="pl-eq"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div><div class="pl-main"><span class="pl-k">Teraz gra</span><h3 class="pl-title"></h3><p class="pl-art"></p><div class="pl-seek"><span class="pl-cur">0:00</span><input class="pl-range" type="range" min="0" max="1000" value="0" aria-label="Postęp"><span class="pl-dur">0:00</span></div><div class="pl-ctrl"><button class="pl-btn pl-prev" aria-label="Poprzednia">${I.prev}</button><button class="pl-btn pl-play" aria-label="Odtwórz">${I.play}</button><button class="pl-btn pl-next" aria-label="Następna">${I.next}</button><div class="pl-vol">${I.vol}<input type="range" min="0" max="100" value="90" aria-label="Głośność"></div><a class="pl-dl" download>Pobierz</a></div><ol class="pl-list">${tracks.map((t,i)=>`<li data-i="${i}"><span class="pl-n">${i+1}</span><span class="pl-t">${t.title}<small>${t.artist||''}</small></span><span class="pl-d">${fmt(t.dur)}</span></li>`).join('')}</ol></div>`;
 const q=s=>host.querySelector(s),a=new Audio(),rg=q('.pl-range'),vg=q('.pl-vol input'),pb=q('.pl-play');let i=0;a.preload='metadata';
 const setP=(el,v)=>el.style.setProperty('--p',v+'%');
 function load(n,go){i=(n+tracks.length)%tracks.length;const t=tracks[i];a.src=t.src;q('.pl-title').textContent=t.title;q('.pl-art').textContent=t.artist||'';q('.pl-dur').textContent=fmt(t.dur);q('.pl-cur').textContent='0:00';rg.value=0;setP(rg,0);const dl=q('.pl-dl');dl.href=t.src;dl.setAttribute('download',t.file||t.src);
  host.querySelectorAll('.pl-list li').forEach(li=>li.classList.toggle('on',+li.dataset.i===i));host.dispatchEvent(new CustomEvent('track',{detail:i}));
  if('mediaSession' in navigator)navigator.mediaSession.metadata=new MediaMetadata({title:t.title,artist:t.artist||'Mateusz Talar'});
  if(go)a.play().catch(()=>{})}
 pb.onclick=()=>a.paused?a.play():a.pause();
 q('.pl-prev').onclick=()=>a.currentTime>3?a.currentTime=0:load(i-1,!a.paused);q('.pl-next').onclick=()=>load(i+1,!a.paused);
 a.addEventListener('play',()=>{host.classList.add('go');pb.innerHTML=I.pause;pb.setAttribute('aria-label','Pauza');PLS.forEach(o=>{if(o!==a)o.pause()})});
 a.addEventListener('pause',()=>{host.classList.remove('go');pb.innerHTML=I.play;pb.setAttribute('aria-label','Odtwórz')});
 a.addEventListener('timeupdate',()=>{const d=a.duration||tracks[i].dur||1,p=a.currentTime/d*100;if(!rg.dragging){rg.value=p*10;setP(rg,p)}q('.pl-cur').textContent=fmt(a.currentTime)});
 a.addEventListener('loadedmetadata',()=>{q('.pl-dur').textContent=fmt(a.duration)});
 a.addEventListener('ended',()=>{if(tracks.length>1&&i<tracks.length-1)load(i+1,true);else{a.currentTime=0}});
 rg.addEventListener('input',()=>{rg.dragging=true;const d=a.duration||tracks[i].dur;a.currentTime=rg.value/1000*d;setP(rg,rg.value/10);q('.pl-cur').textContent=fmt(a.currentTime)});rg.addEventListener('change',()=>rg.dragging=false);
 vg.addEventListener('input',()=>{a.volume=vg.value/100;setP(vg,vg.value)});a.volume=.9;setP(vg,90);
 host.querySelectorAll('.pl-list li').forEach(li=>li.onclick=()=>load(+li.dataset.i,true));
 if('mediaSession' in navigator){navigator.mediaSession.setActionHandler('play',()=>a.play());navigator.mediaSession.setActionHandler('pause',()=>a.pause());navigator.mediaSession.setActionHandler('previoustrack',()=>load(i-1,true));navigator.mediaSession.setActionHandler('nexttrack',()=>load(i+1,true))}
 PLS.push(a);load(0,false);return{a,load,host,get i(){return i}}}
