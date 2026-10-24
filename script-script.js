let st = { event:'', shape:'', weight:0, portions:0, filling:'', gallery:'', hasPhoto:false };
const PRICE = 1550;
const F_DATA = { 'Шоколадные':11,'Кофейные':8,'Медовые':4,'Фруктово-ягодные':13,'Карамель':4,'Безе':3,'Суфле':3,'Многокомпонентные':4,'А еще':5 };

function clearAll(id) { document.getElementById(id)?.querySelectorAll('.opt-card,.cat-btn-strict,.item-strict,.g-item-strict').forEach(e=>e.classList.remove('active')); }

function selectStrict(k,v,el) { st[k]=v; clearAll('event-options-strict'); clearAll('shape-options-strict'); el.classList.add('active'); updateStrict(); if(k==='shape') renderFillCatsStrict(v); }
function selectCustomStrict(k,v) { if(v.trim()) { st[k]=v; clearAll('event-options-strict'); updateStrict(); } }
function selectWeightStrict(w,el) { st.weight=w; clearAll('weight-options-strict'); el.classList.add('active'); st.portions=Math.floor(w*1000/150); document.querySelector('#portions-strict b').innerText=st.portions; document.getElementById('portions-strict').style.display='block'; updateStrict(); }
function selectCustomWeightStrict(v) { const w=parseFloat(v); if(w>=2){ st.weight=w; clearAll('weight-options-strict'); st.portions=Math.floor(w*1000/150); document.querySelector('#portions-strict b').innerText=st.portions; document.getElementById('portions-strict').style.display='block'; updateStrict(); } }

function renderFillCatsStrict(shape) {
    let cats = Object.keys(F_DATA);
    if(shape==='Фигурный') cats = cats.filter(c=>c!=='Многокомпонентные');
    if(shape==='Многоярусный') cats = ['Шоколадные','Фруктово-ягодные','Медовые'];
    const cont = document.getElementById('filling-cats-strict'); cont.innerHTML='';
    cats.forEach((c,i)=>{ const b=document.createElement('button'); b.className='cat-btn-strict'+(i===0?' active':''); b.innerText=c; b.onclick=()=>{ clearAll('filling-cats-strict'); b.classList.add('active'); renderFillItemsStrict(c); }; cont.appendChild(b); });
    if(cats.length) renderFillItemsStrict(cats[0]);
}
function renderFillItemsStrict(cat) {
    const g=document.getElementById('filling-items-strict'); g.innerHTML='';
    for(let i=1;i<=F_DATA[cat];i++){ const d=document.createElement('div'); d.className='item-strict'; d.onclick=function(){ clearAll('filling-items-strict'); this.classList.add('active'); st.filling=cat+' #'+i; updateStrict(); }; d.innerHTML='<div class="ph">Фото</div>#'+i; g.appendChild(d); }
}

function switchTabStrict(tab,btn) {
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
    const g=document.getElementById('gallery-grid-strict'); g.innerHTML='';
    for(let i=1;i<=10;i++){ const d=document.createElement('div'); d.className='g-item-strict'; d.innerText='Фото '+i; d.onclick=function(){ clearAll('gallery-grid-strict'); this.classList.add('active'); st.gallery=tab+' #'+i; updateStrict(); }; g.appendChild(d); }
}
switchTabStrict('Праздничные', document.querySelector('.tab-btn'));

function uploadStrict(e) { if(e.target.files[0]){ st.hasPhoto=true; updateStrict(); alert('Фото загружено (симуляция)'); } }
function toggleNoTextStrict(c) { const i=document.getElementById('text-strict'); i.value=c?'Никакой, он и так прекрасен':''; i.disabled=c; updateStrict(); }

function updateStrict() {
    document.getElementById('s-event').innerText=st.event||'-';
    document.getElementById('s-shape').innerText=st.shape||'-';
    document.getElementById('s-weight').innerText=st.weight?st.weight+' кг':'-';
    document.getElementById('s-portions').innerText=st.portions||'-';
    document.getElementById('s-filling').innerText=st.filling||'-';
    document.getElementById('s-text').innerText=document.getElementById('text-strict').value||'-';
    document.getElementById('s-photo').innerText=st.hasPhoto?'Загружено':'Нет';
    document.getElementById('s-price').innerText = st.weight ? (st.weight*PRICE).toLocaleString('ru-RU') : '0';
}