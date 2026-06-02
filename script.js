/* ---------- Loader ---------- */
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('done'),2000));

/* ---------- Custom cursor ---------- */
const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
let mx=0,my=0,rx=0,ry=0;
window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
function loop(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);}loop();
document.querySelectorAll('a,button,.gcard,.mcard,.spec,.cinfo').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('grow'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('grow'));
});

/* ---------- Ambient beans ---------- */
const amb=document.getElementById('ambient');
for(let i=0;i<14;i++){const b=document.createElement('div');b.className='bean';b.style.left=Math.random()*100+'vw';b.style.animationDuration=(14+Math.random()*16)+'s';b.style.animationDelay=(-Math.random()*20)+'s';b.style.transform='scale('+(.5+Math.random())+')';amb.appendChild(b);}

/* ---------- Nav scroll ---------- */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>40));

/* ---------- Parallax ---------- */
const px=document.querySelectorAll('[data-parallax]');
window.addEventListener('scroll',()=>{const y=window.scrollY;px.forEach(el=>el.style.transform=`translateY(${y*parseFloat(el.dataset.parallax)}px)`);});

/* ---------- Reveal observer ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.16});
const obsAll=()=>document.querySelectorAll('.reveal:not(.in)').forEach(el=>io.observe(el));
obsAll();

/* ---------- Menu data ---------- */
const MENU={
  coffee:[
    {n:'Espresso',d:'Bold, concentrated and pure — the heart of every cup.',p:'$3.5',img:'1510707577719-ae7c14805e3a'},
    {n:'Cappuccino',d:'Espresso crowned with velvety steamed milk foam.',p:'$4.5',img:'1572442388796-11668a67e53d'},
    {n:'Latte',d:'Smooth espresso folded into silky textured milk.',p:'$4.8',img:'1561882468-9110e03e0f78'},
    {n:'Mocha',d:'Espresso, dark chocolate, and a cloud of cream.',p:'$5.2',img:'1578374173705-969cbe6f2d6b'},
    {n:'Cold Brew',d:'Slow-steeped 18 hours for a clean, sweet finish.',p:'$5.0',img:'1517701604599-bb29b565090c'}
  ],
  bakery:[
    {n:'Croissant',d:'Flaky layers of European butter, baked golden at dawn.',p:'$3.8',img:'1555507036-ab1f4038808a'},
    {n:'Cinnamon Roll',d:'Warm spirals with cream-cheese glaze.',p:'$4.5',img:'1509365465985-25d11c17e812'},
    {n:'Cheesecake',d:'New-York style, silky smooth, berry kissed.',p:'$6.0',img:'1567306301408-9b74779a11af'},
    {n:'Chocolate Muffin',d:'Rich double-chocolate with a molten centre.',p:'$4.2',img:'1607958996333-41aef7caefaa'}
  ],
  special:[
    {n:'Lavender Latte',d:'House lavender syrup, espresso & micro-foam.',p:'$5.8',img:'1517256064527-09c73fc73e38'},
    {n:'Caramel Moon Coffee',d:'Salted caramel, crescent cream, slow espresso.',p:'$6.2',img:'1572490122747-3968b75cc699'},
    {n:'Vanilla Cold Brew',d:'Madagascar vanilla over smooth cold brew.',p:'$5.5',img:'1461023058943-07fcbe16d735'}
  ]
};
const grid=document.getElementById('menuGrid');
let currentCat='coffee';
function renderMenu(cat){
  currentCat=cat;
  grid.innerHTML=MENU[cat].map((m,i)=>`
    <div class="mcard reveal" data-idx="${i}">
      <img src="https://images.unsplash.com/photo-${m.img}?w=600&q=80" alt="${m.n}">
      <div class="veil"></div>
      <span class="price">${m.p}</span>
      <div class="info">
        <h4>${m.n}</h4>
        <p class="desc">${m.d}</p>
        <button class="add-btn" data-idx="${i}" aria-label="Add to cart">
          <span style="font-size:1rem;line-height:1">+</span>
          <span>Add to Order</span>
        </button>
      </div>
    </div>`).join('');
  obsAll();
  document.querySelectorAll('.mcard').forEach(c=>{
    c.addEventListener('mouseenter',()=>ring.classList.add('grow'));
    c.addEventListener('mouseleave',()=>ring.classList.remove('grow'));
    c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();const rxv=((e.clientY-r.top)/r.height-.5)*-8;const ryv=((e.clientX-r.left)/r.width-.5)*8;c.style.transform=`perspective(800px) rotateX(${rxv}deg) rotateY(${ryv}deg) translateY(-6px)`;});
    c.addEventListener('mouseleave',()=>c.style.transform='');
    c.querySelector('.add-btn').addEventListener('click',e=>{
      e.stopPropagation();
      const item=MENU[currentCat][parseInt(c.dataset.idx)];
      addToCart(item,e.currentTarget);
    });
  });
}
renderMenu('coffee');
document.querySelectorAll('.cat-btn').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.cat-btn').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');renderMenu(b.dataset.cat);
}));

/* ---------- Gallery ---------- */
const gimgs=['1495474472287-4d71bcdd2085','1554118811-1e0d58224f24','1442512595331-e89e73853f31','1559925393-8be0ec4767c8','1521017432531-fbd92d768814','1517248135467-4c7edcad34c4','1481833761820-0509d3217039','1498804103079-a6351b050096','1453614512568-c4024d13c247'];
document.getElementById('masonry').innerHTML=gimgs.map(g=>`<div class="gitem"><img src="https://images.unsplash.com/photo-${g}?w=500&q=80" alt="Luna café moment"></div>`).join('');

/* ---------- Testimonials ---------- */
const T=[
  {q:'The lavender latte is pure magic. I come for the coffee and stay for the calm.',n:'Amira Khan',r:'Regular since 2021',a:'1494790108377-be9c29b29330'},
  {q:'Every pastry tastes like it was made just for me. Truly the cosiest corner in the city.',n:'Daniyal Raza',r:'Coffee enthusiast',a:'1500648767791-00dcc994a43e'},
  {q:'Luna feels like a warm hug under the moon. The ambiance is unmatched.',n:'Sara Ahmed',r:'Writer & resident',a:'1438761681033-6461ffad8d80'},
  {q:'Caramel Moon Coffee changed my mornings forever. Worth every minute of the queue.',n:'Hassan Ali',r:'Local foodie',a:'1507003211169-0a1dd7228f2d'}
];
document.getElementById('testiTrack').innerHTML=[...T,...T].map(t=>`
  <div class="tcard">
    <div class="stars">★★★★★</div>
    <q>${t.q}</q>
    <div class="who"><img src="https://images.unsplash.com/photo-${t.a}?w=120&q=80" alt="${t.n}"><div><b>${t.n}</b><span>${t.r}</span></div></div>
  </div>`).join('');

/* ---------- Cart ---------- */
let cart=[];
const cartDrawer=document.getElementById('cartDrawer'),cartOverlay=document.getElementById('cartOverlay');

function openCart(){cartDrawer.classList.add('open');cartOverlay.classList.add('open');document.body.style.overflow='hidden';}
function closeCart(){cartDrawer.classList.remove('open');cartOverlay.classList.remove('open');document.body.style.overflow='';}
document.getElementById('cartBtn').addEventListener('click',openCart);
document.getElementById('cartClose').addEventListener('click',closeCart);
cartOverlay.addEventListener('click',closeCart);

function showToast(name){
  const t=document.getElementById('toast');
  document.getElementById('toastMsg').textContent=name+' added to order!';
  t.classList.add('show');clearTimeout(t._t);
  t._t=setTimeout(()=>t.classList.remove('show'),2200);
}
function addToCart(item,btn){
  const ex=cart.find(c=>c.n===item.n);
  if(ex){ex.qty++;}else{cart.push({...item,qty:1});}
  renderCart();
  showToast(item.n);
  btn.classList.add('added');
  btn.innerHTML='<span style="font-size:1rem">✓</span><span>Added!</span>';
  setTimeout(()=>{
    btn.classList.remove('added');
    btn.innerHTML='<span style="font-size:1rem;line-height:1">+</span><span>Add to Order</span>';
  },1500);
}
function updateQty(name,delta){
  const idx=cart.findIndex(c=>c.n===name);if(idx===-1)return;
  cart[idx].qty+=delta;if(cart[idx].qty<=0)cart.splice(idx,1);
  renderCart();
}
function removeItem(name){cart=cart.filter(c=>c.n!==name);renderCart();}

function renderCart(){
  const total=cart.reduce((s,c)=>s+parseFloat(c.p.replace('$',''))*c.qty,0);
  const count=cart.reduce((s,c)=>s+c.qty,0);
  const badge=document.getElementById('cartBadge');
  badge.textContent=count;badge.classList.toggle('show',count>0);
  document.getElementById('cartCnt').textContent=count+' item'+(count!==1?'s':'');
  document.getElementById('cartTotal').textContent='$'+total.toFixed(2);
  document.getElementById('cartOrder').disabled=cart.length===0;
  const el=document.getElementById('cartItems');
  if(cart.length===0){el.innerHTML='<div class="cart-empty"><div class="eic">☕</div><p>Your cart is empty.<br>Add something delicious!</p></div>';return;}
  el.innerHTML=cart.map(c=>`
    <div class="ci">
      <img src="https://images.unsplash.com/photo-${c.img}?w=140&q=80" alt="${c.n}">
      <div class="ci-info">
        <h5>${c.n}</h5>
        <div class="ci-price">$${(parseFloat(c.p.replace('$',''))*c.qty).toFixed(2)}</div>
        <div class="ci-qty">
          <button onclick="updateQty('${c.n}',-1)">−</button>
          <span class="qnum">${c.qty}</span>
          <button onclick="updateQty('${c.n}',1)">+</button>
        </div>
      </div>
      <button class="ci-del" onclick="removeItem('${c.n}')">✕</button>
    </div>`).join('');
}

document.getElementById('cartOrder').addEventListener('click',()=>{
  const btn=document.getElementById('cartOrder');
  btn.textContent='Order Placed! ☕';btn.style.background='var(--gold)';btn.style.color='var(--ink)';
  setTimeout(()=>{cart=[];renderCart();btn.textContent='Place Order';btn.style.background='';btn.style.color='';closeCart();},2200);
});

/* cursor grow on cart drawer */
cartDrawer.addEventListener('mouseover',e=>{if(e.target.closest('button'))ring.classList.add('grow');});
cartDrawer.addEventListener('mouseout',e=>{if(e.target.closest('button'))ring.classList.remove('grow');});
document.getElementById('cartBtn').addEventListener('mouseenter',()=>ring.classList.add('grow'));
document.getElementById('cartBtn').addEventListener('mouseleave',()=>ring.classList.remove('grow'));

/* ---------- Burger menu ---------- */
const burger=document.getElementById('burger'),mobileNav=document.getElementById('mobileNav');
burger.addEventListener('click',()=>{burger.classList.toggle('open');mobileNav.classList.toggle('open');});
document.querySelectorAll('.mobile-link').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('open');mobileNav.classList.remove('open');}));

/* ---------- Newsletter form ---------- */
document.querySelector('.news-form').addEventListener('submit',e=>{
  e.preventDefault();
  const inp=e.target.querySelector('input'),btn=e.target.querySelector('button');
  if(!inp.value)return;
  btn.textContent='✓ Joined!';inp.value='';
  setTimeout(()=>{btn.textContent='Join';},2600);
});

/* ---------- Reservation form ---------- */
document.getElementById('resForm').addEventListener('submit',e=>{
  e.preventDefault();
  const btn=e.target.querySelector('button');btn.textContent='Reserved — see you soon! 🌙';btn.style.background='var(--gold)';btn.style.color='var(--ink)';
  setTimeout(()=>{btn.textContent='Confirm Reservation';btn.style.background='';btn.style.color='';e.target.reset();},2600);
});
