const PAGES=[['index.html','Start'],['o-mnie.html','O mnie'],['program.html','Program'],['artykuly.html','Artykuły'],['aktualnosci.html','Aktualności'],['kontakt.html','Kontakt']];
let cur=location.pathname.split('/').pop()||'index.html';if(cur==='artykul.html')cur='artykuly.html';
/* SPOTKANIA: edytuj tylko tę listę. Minione terminy znikają same. [data RRRR-MM-DD, godzina, miejsce, temat] */
const MEETS=[
['2026-10-14','18:00','Łęczna — Miejski Dom Kultury','Ochrona zdrowia i szpital powiatowy'],
['2026-10-17','12:00','Cyców — świetlica wiejska','Rolnictwo i drogi lokalne'],
['2026-10-21','17:30','Spiczyn — dom kultury','Młodzież, szkoły i praca'],
['2026-10-24','11:00','Puchaczów — świetlica','Przyszłość górniczego regionu'],
['2026-10-28','18:00','Milejów — dom kultury','Seniorzy i opieka'],
['2026-11-07','15:00','Łęczna — Rynek','Spotkanie z mieszkańcami całego powiatu']];
const MN=['sty','lut','mar','kwi','maj','cze','lip','sie','wrz','paź','lis','gru'],DN=['niedz.','pon.','wt.','śr.','czw.','pt.','sob.'];
const crest='<img src="logo.png" alt="Herb">';
const sup='<a class="support" href="https://pis.org.pl/" target="_blank" rel="noopener" title="Prawo i Sprawiedliwość"><span>Popierany przez:</span><img src="pis-logo.png" alt="Prawo i Sprawiedliwość"></a>';
const today=new Date().toLocaleDateString('pl-PL',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
document.querySelector('#nav').outerHTML=`<div class="topbar"><div class="wrap"><span>${today}</span><span>Komitet wyborczy · powiat łęczyński</span></div></div><nav class="nav" id="nav"><div class="wrap"><a class="brand" href="index.html">${crest}<div><span>Mateusz Talar</span><small>KOMITET WYBORCZY</small></div></a><button class="burger" aria-label="Menu">☰</button><ul class="menu">${PAGES.map(([h,t])=>`<li><a href="${h}" class="${h===cur?'on':''}">${t}</a></li>`).join('')}</ul></div></nav>`;
document.querySelector('#foot').outerHTML=`<footer><div class="wrap"><div class="cols"><div><h4>Mateusz Talar — Komitet Wyborczy</h4><p>Kandydat niezależny, powiat łęczyński. Praca, rodzina, bezpieczeństwo.</p>${sup}</div><div><h4>Strony</h4>${PAGES.map(([h,t])=>`<a href="${h}">${t}</a>`).join('')}</div><div><h4>Kontakt</h4><a href="mailto:sztab@example.com">sztab@example.com</a><a href="kontakt.html">Dołącz do sztabu</a></div></div><div class="fine">Strona fikcyjna, przygotowana jako przykład. Postaci, cytaty i wydarzenia są wymyślone.</div></div></footer>`;
const nav=document.getElementById('nav');nav.querySelector('.burger').onclick=()=>nav.querySelector('.menu').classList.toggle('open');
/* render spotkań */
const t0=new Date();t0.setHours(0,0,0,0);
const up=MEETS.map(m=>({d:new Date(m[0]+'T00:00:00'),h:m[1],p:m[2],s:m[3]})).filter(m=>m.d>=t0).sort((a,b)=>a.d-b.d);
document.querySelectorAll('[data-meets]').forEach(el=>{const l=up.slice(0,+el.dataset.max||99);
 if(!l.length){el.innerHTML='<li style="display:block;padding:14px 0">Kolejne terminy ogłosimy wkrótce.</li>';return}
 el.innerHTML=el.dataset.meets==='list'?l.map(m=>`<li><span class="md"><b>${m.d.getDate()}</b>${MN[m.d.getMonth()]}</span><div><strong>${m.p}</strong><span class="s">${DN[m.d.getDay()]}, ${m.h} · ${m.s}</span></div></li>`).join('')
 :l.map(m=>`<div class="card meet reveal"><div class="date"><b>${m.d.getDate()}</b>${MN[m.d.getMonth()]}</div><div><h3 style="margin:0;font-size:1.25rem">${m.p}</h3><p>${DN[m.d.getDay()]}, godz. ${m.h}</p><p>${m.s}</p></div></div>`).join('')});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const t=+e.target.dataset.to;let n=0;const s=t/40;const i=setInterval(()=>{n+=s;if(n>=t){n=t;clearInterval(i)}e.target.textContent=Math.round(n)},30)}));
document.querySelectorAll('[data-to]').forEach(el=>co.observe(el));
const fb=document.querySelectorAll('.filters button');
fb.forEach(b=>b.onclick=()=>{fb.forEach(x=>x.classList.remove('on'));b.classList.add('on');document.querySelectorAll('[data-cat]').forEach(c=>c.style.display=(b.dataset.f==='all'||c.dataset.cat===b.dataset.f)?'':'none')});
