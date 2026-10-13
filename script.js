const C = window.CONFIG, $ = s => document.querySelector(s), stage = $('#stage'), m = $('#m');
let k = 0, busy = 0, n = 0;
const LC = ['#00c2ff', '#ff3b3b', '#7b2cff', '#ff7a1a', '#3ddc84', '#ff3ea5'];
$('#title').innerHTML = ['HAPPY', 'BIRTHDAY'].map(w => `<div class="w">${[...w].map(l => `<b style="--i:${n};color:${LC[n++ % 6]}">${l}</b>`).join('')}</div>`).join('');
$('#tag').textContent = `${C.her} 🎂`;
const T = [
    { e: '🦉', a: 'owl', h: 'ULLU BANAYA!', p: 'Pehle hi click mein gift chahiye? Kuuu jii? 😂', b: 'Is baar pakka milega 🥺', r: ['🤣', '😂', '🦉', '😜'] },
    { e: '🤑', a: 'greed', h: 'LALACH BURI BALA HAI!', p: 'Isliye to kehte hain ki expectations nahi rakhni chahiye jii har baar he thodi dunga abb Gift🙏', b: 'Bas ek aur click… 🥹', r: ['🤑', '💸', '😂', '🤣'] },
    { e: '🤡', a: 'clown', h: 'GALTI KI THI NA AAPNE TOH? 😂', p: `Main koi Santa Claus thodi hu, ${C.her}! 🎅`, b: 'Ab to dega na? 🥺', r: ['🤡', '😆', '🤣', '🎈'] },
    { e: '🥹', a: 'heart', h: 'ACHHA BABA, MAZAAK KHATAM!', p: `Gift nahi Hai Koi Iss baar bss itn ahe bnya, bss thodi se muskaan lani thi aaj ke din.. Soo hope u are smiling. Happy Birthday! 💛 Ab cake khilana mat bhoolna 😜`,b: 'Again', r: ['🥳', '🎉', '💛', '🎂'], end: 1 }
];
const GIFT = `<svg viewBox="0 0 200 190"><rect x="25" y="85" width="150" height="95" rx="8" fill="#00c2ff" stroke="#111" stroke-width="6"/><rect x="85" y="85" width="30" height="95" fill="#ff7a1a" stroke="#111" stroke-width="6"/><rect x="15" y="58" width="170" height="38" rx="8" fill="#7b2cff" stroke="#111" stroke-width="6"/><rect x="85" y="58" width="30" height="38" fill="#ff7a1a" stroke="#111" stroke-width="6"/><path d="M100 58C70 5 25 25 55 55zM100 58C130 5 175 25 145 55z" fill="#ffd93d" stroke="#111" stroke-width="6" stroke-linejoin="round"/><circle cx="100" cy="58" r="12" fill="#ff3b3b" stroke="#111" stroke-width="6"/><path d="M42 108v48M54 108v28" stroke="#ffffff99" stroke-width="7" stroke-linecap="round"/></svg>`;
function showGift(auto, first) {
    stage.innerHTML = `<button class="gift${first ? ' first' : ''}" aria-label="gift">${GIFT}</button>${first ? '<p class="hint">👆 Gift kholne ke liye click karo!</p>' : ''}`;
    const g = stage.firstChild; g.onclick = () => go(g); if (auto) setTimeout(() => go(g), 250)
}
function go(g) { if (busy) return; busy = 1; g.classList.add('open'); setTimeout(() => { busy = 0; reveal() }, 900) }
function card(t) { return t.vs ? `<div class="card"><h2>${t.h}</h2><div class="vs"><div class="col g"><b>EXPECTATION</b><span>🎁💍📱💰</span></div><div class="col r"><b>REALITY</b><span class="a-greed">🪨🧦🥔🦉</span></div></div><p>${t.p}</p></div>` : `<div class="card"><span class="big a-${t.a}">${t.e}</span><h2>${t.h}</h2><p>${t.p}</p></div>` }
function reveal() {
    const t = T[k++]; m.classList.add('play', 'shake'); setTimeout(() => m.classList.remove('shake'), 500);
    burst(innerWidth / 2, innerHeight * .55, t.end ? 170 : 90); rain(t.r, t.end ? 28 : 16); pows(t.end ? ['YAY!', 'WOOHOO!', 'HAPPY BDAY!'] : ['HA HA!', 'HEHE!', 'LOL!', 'ULLU!', 'HAHAHA!'], 3);
    const p = Math.round(k / T.length * 100); $('#meter').classList.add('on'); $('#fill').style.width = p + '%'; $('#mt').textContent = p >= 100 ? 'MAX 🔥🤑' : p + '%';
    const gs = (C.gifs && C.gifs[k - 1]) || `gifs/${k}.gif`;
    stage.innerHTML = card(t) + `<img class="gifimg" src="${gs}" alt="" onerror="this.remove()"><button class="btn" id="nx">${t.b}</button>`;
    $('#nx').onclick = () => { if (t.end) { k = 0; m.classList.remove('play'); $('#fill').style.width = '0'; $('#meter').classList.remove('on'); showGift(false, true) } else showGift(true) }
}
const cv = $('#fx'), cx = cv.getContext('2d'); let P = [], raf = 0;
const fit = () => { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio }; fit(); addEventListener('resize', fit);
function burst(x, y, c) { const d = devicePixelRatio; for (let i = 0; i < c; i++)P.push({ x: x * d, y: y * d, vx: (Math.random() - .5) * 20 * d, vy: (-Math.random() * 18 - 4) * d, g: .4 * d, s: (Math.random() * 9 + 5) * d, c: ['#ff3b3b', '#00c2ff', '#ffd93d', '#7b2cff', '#3ddc84', '#ff7a1a', '#fff'][i % 7], o: i % 3 == 0, r: Math.random() * 6, l: 0 }); if (!raf) tick() }
function tick() { cx.clearRect(0, 0, cv.width, cv.height); P = P.filter(p => p.y < cv.height + 40 && p.l < 260); P.forEach(p => { p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.l++; p.r += .12; cx.fillStyle = p.c; cx.strokeStyle = '#111'; cx.lineWidth = 1.5; cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); if (p.o) { cx.beginPath(); cx.arc(0, 0, p.s / 2, 0, 7); cx.fill(); cx.stroke() } else { cx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); cx.strokeRect(-p.s / 2, -p.s / 4, p.s, p.s / 2) } cx.restore() }); raf = P.length ? requestAnimationFrame(tick) : 0 }
function rain(L, c) { for (let i = 0; i < c; i++) { const s = document.createElement('span'); s.className = 'rain'; s.textContent = L[i % L.length]; s.style.cssText = `left:${Math.random() * 94}vw;font-size:${28 + Math.random() * 34}px;animation-duration:${2.2 + Math.random() * 2.2}s;animation-delay:${Math.random() * .8}s;--sp:${(Math.random() < .5 ? -1 : 1) * (240 + Math.random() * 480)}deg`; document.body.append(s); setTimeout(() => s.remove(), 6000) } }
function pows(L, c) { for (let i = 0; i < c; i++) { const s = document.createElement('div'); s.className = 'pow'; s.textContent = L[Math.random() * L.length | 0]; s.style.cssText = `left:${6 + Math.random() * 60}vw;top:${10 + Math.random() * 60}vh;--r:${Math.random() * 30 - 15}deg;animation-delay:${i * .18}s`; document.body.append(s); setTimeout(() => s.remove(), 2400) } }
function balloon() { if (document.hidden) return; const b = document.createElement('i'); b.className = 'bl'; b.style.cssText = `left:${Math.random() * 96}vw;--w:${40 + Math.random() * 34}px;--bc:${['#00c2ff', '#ff3b3b', '#7b2cff', '#ff7a1a', '#3ddc84', '#ff3ea5'][Math.random() * 6 | 0]};--dx:${Math.random() * 80 - 40}px;--rot:${Math.random() * 20 - 10}deg;animation-duration:${8 + Math.random() * 6}s`; $('#balloons').append(b); setTimeout(() => b.remove(), 15000) }
for (let i = 0; i < 6; i++)setTimeout(balloon, i * 250); setInterval(balloon, 1000);
setTimeout(() => burst(innerWidth / 2, innerHeight * .3, 130), 1300);
showGift(false, true);
