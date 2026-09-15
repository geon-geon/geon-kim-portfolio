'use strict';
const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
if(new URLSearchParams(location.search).get('embed')==='1')document.body.classList.add('embed');
let snapshots,current='ai';
function drawMap(d){
 const W=940,H=510,pad=45,pts=d.points;
 const xmin=Math.min(...pts.map(p=>p.x)),xmax=Math.max(...pts.map(p=>p.x)),ymin=Math.min(...pts.map(p=>p.y)),ymax=Math.max(...pts.map(p=>p.y));
 const x=v=>pad+(v-xmin)/(xmax-xmin)*(W-2*pad),y=v=>pad+(ymax-v)/(ymax-ymin)*(H-2*pad);
 let s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 510" role="group" aria-label="v0.40 실제 기사 좌표와 상대 관심 지형"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#23324a" stroke-width=".5"/></pattern></defs><rect width="940" height="510" fill="url(#grid)"/>';
 const regions=new Map(d.regions.map(r=>[r.region,r]));
 // Ellipses describe observed within-cluster spread, not a simulated terrain.
 d.regions.forEach(r=>{const pp=pts.filter(p=>p.region===r.region),cx=x(r.x),cy=y(r.y);const rx=Math.max(25,Math.sqrt(pp.reduce((a,p)=>a+(x(p.x)-cx)**2,0)/pp.length)),ry=Math.max(22,Math.sqrt(pp.reduce((a,p)=>a+(y(p.y)-cy)**2,0)/pp.length));
  [1.6,1.15,.7].forEach((scale,k)=>s+=`<ellipse cx="${cx}" cy="${cy}" rx="${rx*scale}" ry="${ry*scale}" fill="#659cea" fill-opacity="${Math.min(.11,.012+r.relative_attention*.012)}" stroke="#6b9cdf" stroke-opacity="${r.relative_attention>1?.24:.07}" stroke-width=".8"/>`);
 });
 pts.filter(p=>!p.card).forEach(p=>{const r=regions.get(p.region);s+=`<circle cx="${x(p.x)}" cy="${y(p.y)}" r="${p.connected?3.1:1.55}" fill="${p.connected?'#101c2e':'#95bcf5'}" fill-opacity="${p.connected?1:Math.min(.7,.12+r.relative_attention*.12)}" stroke="${p.connected?'#bddbff':'none'}" stroke-width="1.1"/>`});
 d.cards.forEach((c,i)=>{const p=pts.find(p=>p.index===c.index);s+=`<g class="point-card" data-card="${i}" role="button" tabindex="0" aria-label="검토 카드 ${i+1} 근거 보기"><circle cx="${x(p.x)}" cy="${y(p.y)}" r="12" fill="#bddbff" stroke="#0e1726" stroke-width="3"/><text x="${x(p.x)}" y="${y(p.y)+4}" text-anchor="middle" fill="#14243b" font-size="11" font-weight="700">${i+1}</text></g>`});
 const top=[...d.regions].sort((a,b)=>b.relative_attention-a.relative_attention).slice(0,2);
 top.forEach((r,i)=>{const cx=x(r.x),cy=y(r.y);let ty=Math.max(25,cy-40-i*22);const cardPoints=d.cards.map(c=>pts.find(p=>p.index===c.index));for(let attempt=0;attempt<5&&cardPoints.some(p=>Math.abs(x(p.x)-cx)<115&&Math.abs(y(p.y)-ty)<32);attempt++)ty=Math.max(25,ty-38);s+=`<g><rect x="${Math.min(W-205,Math.max(10,cx-95))}" y="${ty-16}" width="190" height="27" rx="4" fill="#182a44" stroke="#496689" stroke-width=".5"/><text x="${Math.min(W-110,Math.max(105,cx))}" y="${ty+2}" text-anchor="middle" fill="#d9eaff" font-size="12">${esc(r.label.replace(' (혼합)',''))} · ${r.relative_attention.toFixed(2)}×</text></g>`});
 return s+'</svg>';
}
function render(){const d=snapshots[current];$('#map').innerHTML=drawMap(d);$('#counts').textContent=`${d.corpus_count.toLocaleString()}개 기사 / 연결 ${d.connected_count}개 / 검토 ${d.cards.length}개`;
 $('#regions').innerHTML=[...d.regions].sort((a,b)=>b.relative_attention-a.relative_attention).slice(0,7).map(r=>`<div class="region"><div class="region-line"><span title="${esc(r.label)}">${esc(r.label)}</span><b>${r.relative_attention.toFixed(2)}×</b></div><div class="bar"><i style="width:${Math.min(100,r.relative_attention/4*100)}%"></i></div></div>`).join('');
 $('#cards').innerHTML=d.cards.map((c,i)=>`<article class="card"><div class="card-meta"><span class="num">0${i+1} / REVIEW</span><span>${esc(c.published_at.slice(0,10))}</span></div><h3>${esc(c.title)}</h3><div class="card-axis"><span>${[...new Set(c.connections.map(t=>t.asset))].map(esc).join(' · ')}</span><span>상대 관심 ${c.relative_propensity.toFixed(2)}×</span></div><button class="evidence" data-card="${i}">연결 근거 보기 ↗</button><a href="${esc(c.url)}" target="_blank" rel="noopener">원문 ↗</a></article>`).join('');
 document.querySelectorAll('[data-profile]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.profile===current)));
}
function detail(i){const c=snapshots[current].cards[i];if(!c)return;$('#detail-content').innerHTML=`<p>REVIEW 0${i+1} · ${esc(c.source)} · 과거 기사</p><h2 id="detail-title">${esc(c.title)}</h2>${c.connections.map(t=>`<h3>${esc(t.mention)} → ${esc(t.asset)}</h3><p>${esc(t.label)} · ${t.level==='DIRECT_ENTITY'?'공식 구성종목과 기사 명칭의 연결':'제목의 기초자산과 공식 상품 범위의 연결'}</p><h3>기사의 표현</h3><blockquote>${esc(t.context)}</blockquote><h3>공식 자료의 근거</h3><p>${esc(t.official_quote)}</p><a href="${esc(t.source_url)}" target="_blank" rel="noopener">발행사 원문 ↗</a>`).join('')}<p>수집 당시 자료에 근거한 연결입니다. 기사 당시 보유현황이나 가격 영향을 검증한 것은 아닙니다.</p>`;$('#detail').showModal();}
document.addEventListener('click',e=>{const p=e.target.closest('[data-profile]');if(p&&snapshots){current=p.dataset.profile;render()}const c=e.target.closest('[data-card]');if(c&&snapshots)detail(Number(c.dataset.card));});
document.addEventListener('keydown',e=>{const c=e.target.closest('[data-card]');if(c&&(e.key==='Enter'||e.key===' ')){e.preventDefault();detail(Number(c.dataset.card))}});
$('#close').onclick=()=>$('#detail').close();
fetch('snapshot.json').then(r=>{if(!r.ok)throw Error('snapshot');return r.json()}).then(d=>{snapshots=d;render()}).catch(()=>{$('#counts').textContent='스냅샷을 불러오지 못했습니다. 페이지를 새로고침해 주세요.'});
if(document.body.classList.contains('embed')){
 const reportHeight=()=>parent.postMessage({type:'compass-height',height:Math.ceil(document.querySelector('main').getBoundingClientRect().height)},location.origin);
 new ResizeObserver(reportHeight).observe(document.querySelector('main'));
 reportHeight();
}
