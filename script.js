(function(){
 var g=document.getElementById('igrid'),b=document.getElementById('more-btn');
 if(!g||!b)return;
 b.addEventListener('click',function(){
  var open=g.classList.toggle('open');
  b.setAttribute('aria-expanded',open?'true':'false');
  b.textContent=open?'See less':'See more';
  if(!open){document.getElementById('info').scrollIntoView({block:'start'})}
 });
})();

(function(){
 var nav=document.querySelector('nav'),b=document.getElementById('burger');
 if(!nav||!b)return;
 function set(o){nav.classList.toggle('open',o);b.setAttribute('aria-expanded',o?'true':'false')}
 b.addEventListener('click',function(){set(!nav.classList.contains('open'))});
 nav.addEventListener('click',function(e){if(e.target.tagName==='A')set(false)});
})();
(function(){
 var KEY='aub_privacy_ok',ok=false;
 try{ok=localStorage.getItem(KEY)==='1'}catch(e){}
 if(!ok&&!location.hash){location.hash='privacy'}
 var a=document.getElementById('accept');
 if(a)a.addEventListener('click',function(){
  try{localStorage.setItem(KEY,'1')}catch(e){}
  location.hash='top';
 });
})();
(function(){
 var RESERVE_EMAIL='navajkerrie@gmail.com';
 var f=document.getElementById('rform');if(!f)return;
 var d=document.getElementById('rdate'),t=new Date();
 d.min=t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');
 f.addEventListener('submit',function(e){
  e.preventDefault();
  if(!f.checkValidity()){f.reportValidity();return}
  function v(id){return document.getElementById(id).value.replace(/[\r\n]+/g,' ').trim()}
  var body='Reservation request\nName: '+v('rname')+'\nPhone: '+v('rphone')+'\nDate: '+v('rdate')+'\nTime: '+v('rtime')+'\nGuests: '+v('rguests');
  var m=document.getElementById('rmsg');
  m.textContent='Your email app should open with your request ready. Please press send to confirm.';
  m.classList.add('show');
  window.location.href='mailto:'+RESERVE_EMAIL+'?subject='+encodeURIComponent('Table reservation')+'&body='+encodeURIComponent(body);
 });
 const counters = document.querySelectorAll('.count');
const animate = (el) => {
  const target = parseFloat(el.dataset.target);
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
  let current = 0;
  const duration = 3500; // 1.4s
  const stepTime = 16;
  const steps = duration / stepTime;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target.toFixed(decimals);
      clearInterval(timer);
    } else {
      el.textContent = current.toFixed(decimals);
    }
  }, stepTime);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animate(entry.target);
      observer.unobserve(entry.target); // count only once
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => observer.observe(c));
})();

/* Homepage menu highlights: loaded from data/menu.json (edited in admin.html).
   The HTML already in index.html stays as the fallback if the file can't be loaded. */
(function(){
 var box=document.querySelector('.menu .mcols');
 if(!box||!window.fetch)return;
 function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
 fetch('data/menu.json',{cache:'no-cache'}).then(function(r){return r.ok?r.json():Promise.reject()}).then(function(j){
  if(!j||!Array.isArray(j.home)||!j.home.length)return;
  box.innerHTML=j.home.map(function(c){
   return '<div class="mcol"><h3>'+esc(c.title)+'</h3>'+(c.items||[]).map(function(i){
    return '<div class="item"><b>'+esc(i.name)+'</b><i class="pr" style="font-style:normal">'+(i.price?'Ksh '+esc(i.price):'')+'</i>'+(i.desc?'<span>'+esc(i.desc)+'</span>':'')+'</div>';
   }).join('')+'</div>';
  }).join('');
 }).catch(function(){});
})();