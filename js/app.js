/* ==========================================
   TDAH: Guia Para Pais — App Logic v4.0
   Reading-first · Text selection bookmarks
   ========================================== */

const CHAPTERS = [
    { id: 1, title: 'O Que É TDAH (De Verdade)?', desc: 'Desmistificando o transtorno' },
    { id: 2, title: 'Desatenção ou Desinteresse?', desc: 'A diferença que muda tudo' },
    { id: 3, title: 'O Cérebro do Seu Filho', desc: 'Como funciona por dentro' },
    { id: 4, title: 'O Poder do Reconhecimento', desc: 'A chave da autoestima' },
    { id: 5, title: 'Escola: Aliada ou Vilã?', desc: 'Pais e professores juntos' },
    { id: 6, title: 'Medicação: Sim ou Não?', desc: 'Ciência, não medo' },
    { id: 7, title: 'Suplementos e Alimentação', desc: 'Nutrientes que ajudam' },
    { id: 8, title: 'Ansiedade, Sono e Emoções', desc: 'Cuidando do emocional' },
    { id: 9, title: '3 Passos Para Lidar com TDAH', desc: 'Plano prático de ação' },
    { id: 10, title: 'Você Não Está Sozinho(a)', desc: 'Esperança e comunidade' },
];

const S = {
    view: 'cover',
    chapter: null,
    theme: localStorage.getItem('tdah-theme') || 'dark',
    fontSize: parseInt(localStorage.getItem('tdah-fs')) || 18,
    bookmarks: JSON.parse(localStorage.getItem('tdah-bm') || '[]'),
    progress: JSON.parse(localStorage.getItem('tdah-prog') || '{}'),
    selectedText: '',
};

const $ = s => document.getElementById(s);
const $$ = s => document.querySelectorAll(s);

const dom = {
    splash: $('splash'), app: $('app'),
    sidebar: $('sidebar'), overlay: $('sidebar-overlay'),
    topTitle: $('topbar-title'),
    readProg: $('reading-progress'), progFill: $('progress-fill'),
    tocList: $('toc-list'),
    viewCover: $('view-cover'), viewChapter: $('view-chapter'),
    viewBookmarks: $('view-bookmarks'), viewSettings: $('view-settings'),
    chLabel: $('ch-label'), chTitle: $('ch-title'),
    chIllo: $('ch-illustration'), chBody: $('ch-body'),
    btnPrev: $('btn-prev'), btnNext: $('btn-next'),
    pageInd: $('ch-page-indicator'),
    bmList: $('bookmarks-list'),
    fontVal: $('font-val'),
    toast: $('toast'),
    selTooltip: $('selection-tooltip'),
};

// ─── Init ───
function init() {
    applyTheme(S.theme);
    applyFont(S.fontSize);
    buildTOC();
    bindEvents();
    registerSW();

    // Start on cover: hide topbar + start canvas
    dom.app.classList.add('cover-active');

    setTimeout(() => {
        dom.splash.classList.add('out');
        dom.app.classList.add('visible');
        initCoverCanvas();
        setTimeout(() => dom.splash.remove(), 600);
    }, 2000);
}

function registerSW() {
    if ('serviceWorker' in navigator)
        navigator.serviceWorker.register('sw.js').catch(() => { });
}

// ─── Theme ───
function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    S.theme = t;
    localStorage.setItem('tdah-theme', t);
    $('ico-moon').classList.toggle('hidden', t !== 'dark');
    $('ico-sun').classList.toggle('hidden', t === 'dark');
    $$('.theme-pill').forEach(b => b.classList.toggle('active', b.dataset.theme === t));
}

// ─── Font ───
function applyFont(sz) {
    sz = Math.max(14, Math.min(24, sz));
    S.fontSize = sz;
    document.documentElement.style.setProperty('--font-size', sz + 'px');
    dom.fontVal.textContent = sz;
    localStorage.setItem('tdah-fs', sz);
}

// ─── TOC ───
function buildTOC() {
    dom.tocList.innerHTML = CHAPTERS.map(ch => {
        const read = (S.progress[ch.id] || 0) > 85;
        return `<li class="toc-item">
      <button class="toc-link${read ? ' read' : ''}" data-ch="${ch.id}">
        <span class="toc-num">${ch.id}.</span>
        <span class="toc-text">${ch.title}</span>
        <span class="toc-check">✓</span>
      </button>
    </li>`;
    }).join('');
}

function highlightTOC(id) {
    $$('.toc-link').forEach(l => l.classList.toggle('active', parseInt(l.dataset.ch) === id));
}

// ─── Views ───
function showView(name) {
    [dom.viewCover, dom.viewChapter, dom.viewBookmarks, dom.viewSettings].forEach(v => v.classList.add('hidden'));
    $$('.sidebar-link').forEach(l => l.classList.remove('active'));
    S.view = name;

    switch (name) {
        case 'cover':
            dom.viewCover.classList.remove('hidden');
            dom.topTitle.textContent = 'TDAH — Guia Para Pais';
            dom.readProg.classList.add('hidden');
            $$('.toc-link').forEach(l => l.classList.remove('active'));
            dom.app.classList.add('cover-active');
            initCoverCanvas();
            break;
        case 'chapter':
            dom.viewChapter.classList.remove('hidden');
            dom.readProg.classList.remove('hidden');
            dom.app.classList.remove('cover-active');
            break;
        case 'bookmarks':
            dom.viewBookmarks.classList.remove('hidden');
            dom.topTitle.textContent = 'Destaques';
            dom.readProg.classList.add('hidden');
            $('btn-bookmarks-nav').classList.add('active');
            dom.app.classList.remove('cover-active');
            renderBookmarks();
            break;
        case 'settings':
            dom.viewSettings.classList.remove('hidden');
            dom.topTitle.textContent = 'Configurações';
            dom.readProg.classList.add('hidden');
            $('btn-settings-nav').classList.add('active');
            dom.app.classList.remove('cover-active');
            break;
    }

    closeSidebar();
    hideSelectionTooltip();
    window.scrollTo({ top: 0, behavior: 'instant' });
}

// ─── Sidebar ───
function openSidebar() { dom.sidebar.classList.add('open'); dom.overlay.classList.add('visible'); }
function closeSidebar() { dom.sidebar.classList.remove('open'); dom.overlay.classList.remove('visible'); }

// ─── Chapter Cache ───
const chapterCache = {};

async function fetchChapter(id) {
    if (chapterCache[id]) return chapterCache[id];
    const res = await fetch(`chapters/ch${String(id).padStart(2, '0')}.json`);
    const data = await res.json();
    chapterCache[id] = data;
    return data;
}

function preloadNext(id) {
    const next = id + 1;
    if (next <= CHAPTERS.length && !chapterCache[next]) {
        fetchChapter(next).catch(() => { });
    }
}

// ─── Load Chapter ───
async function loadChapter(id) {
    S.chapter = id;
    const ch = CHAPTERS.find(c => c.id === id);
    if (!ch) return;

    dom.chLabel.textContent = `Capítulo ${id}`;
    dom.chTitle.textContent = ch.title;
    dom.topTitle.textContent = ch.title;

    // If cached, render immediately (no skeleton flash)
    if (chapterCache[id]) {
        renderContent(chapterCache[id]);
    } else {
        dom.chBody.innerHTML = `<div class="chapter-skeleton">
    <div class="skeleton-line"></div><div class="skeleton-line"></div>
    <div class="skeleton-line"></div><div class="skeleton-line"></div>
    <div class="skeleton-line"></div>
  </div>`;
    }

    // Illustration
    dom.chIllo.innerHTML = '';
    if (window.CHAPTER_ILLUSTRATIONS && window.CHAPTER_ILLUSTRATIONS[id]) {
        dom.chIllo.innerHTML = window.CHAPTER_ILLUSTRATIONS[id];
    }

    // Pagination
    $('ch-page-ind').textContent = `${id} de ${CHAPTERS.length}`;

    // Prev / Next visibility
    dom.btnPrev.style.display = id > 1 ? 'flex' : 'none';
    dom.btnNext.textContent = id < CHAPTERS.length ? 'Próximo' : 'Finalizar';

    showView('chapter');
    highlightTOC(id);

    // Fetch if not cached yet
    if (!chapterCache[id]) {
        try {
            const data = await fetchChapter(id);
            if (S.chapter === id) renderContent(data);
        } catch {
            dom.chBody.innerHTML = '<p style="color:var(--text-3);text-align:center;padding:2rem 0">Conteúdo em breve…</p>';
        }
    }

    // Preload next chapter in background
    preloadNext(id);
}

function renderContent(data) {
    let html = '';
    data.sections.forEach(sec => {
        if (sec.title) html += `<h3>${sec.title}</h3>`;
        sec.content.forEach(b => {
            switch (b.type) {
                case 'paragraph': html += `<p>${b.text}</p>`; break;
                case 'quote': html += `<blockquote>${b.text}</blockquote>`; break;
                case 'highlight':
                    html += `<p class="prose-emphasis">${b.text}</p>`;
                    break;
                case 'callout':
                    html += `<div class="callout"><div class="callout-title">${b.title || 'Importante'}</div><p>${b.text}</p></div>`;
                    break;
                case 'list':
                    html += '<ul>' + b.items.map(i => `<li>${i}</li>`).join('') + '</ul>';
                    break;
            }
        });
    });
    dom.chBody.innerHTML = html;
}

// ─── Reading Progress ───
function updateProgress() {
    if (S.view !== 'chapter') return;
    const top = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? Math.min(100, Math.round((top / h) * 100)) : 0;
    dom.progFill.style.width = pct + '%';

    if (S.chapter) {
        const saved = S.progress[S.chapter] || 0;
        if (pct > saved) {
            S.progress[S.chapter] = pct;
            localStorage.setItem('tdah-prog', JSON.stringify(S.progress));
            if (pct > 85) {
                const link = document.querySelector(`.toc-link[data-ch="${S.chapter}"]`);
                if (link) link.classList.add('read');
            }
        }
    }
}

// ─── Text Selection Tooltip ───
function handleTextSelection() {
    const sel = window.getSelection();
    const text = sel ? sel.toString().trim() : '';

    if (!text || text.length < 5 || S.view !== 'chapter') {
        hideSelectionTooltip();
        return;
    }

    // Make sure selection is inside the prose area
    const anchor = sel.anchorNode;
    if (!anchor || !dom.chBody.contains(anchor)) {
        hideSelectionTooltip();
        return;
    }

    S.selectedText = text;

    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Position tooltip below the selection (avoids native menu overlap on mobile)
    const tooltipX = rect.left + rect.width / 2;
    const tooltipY = rect.bottom + 8;

    dom.selTooltip.style.left = `${Math.max(10, Math.min(tooltipX - 70, window.innerWidth - 160))}px`;
    dom.selTooltip.style.top = `${Math.min(tooltipY, window.innerHeight - 50)}px`;
    dom.selTooltip.classList.add('visible');
}

function hideSelectionTooltip() {
    dom.selTooltip.classList.remove('visible');
    S.selectedText = '';
}

function saveSelection() {
    if (!S.selectedText || !S.chapter) return;
    addBookmark(S.selectedText, S.chapter);
    hideSelectionTooltip();
    window.getSelection().removeAllRanges();
}

// ─── Bookmarks ───
function addBookmark(text, chId) {
    // Truncate very long selections
    const truncated = text.length > 300 ? text.substring(0, 300) + '…' : text;
    if (S.bookmarks.some(b => b.text === truncated)) { toast('Já está nos destaques!'); return; }
    const ch = CHAPTERS.find(c => c.id === chId);
    S.bookmarks.push({ text: truncated, chapter: ch.title, chapterId: chId, date: new Date().toISOString() });
    localStorage.setItem('tdah-bm', JSON.stringify(S.bookmarks));
    toast('Destaque salvo ✓');
}

function removeBookmark(i) {
    S.bookmarks.splice(i, 1);
    localStorage.setItem('tdah-bm', JSON.stringify(S.bookmarks));
    renderBookmarks();
}

function renderBookmarks() {
    if (!S.bookmarks.length) {
        dom.bmList.innerHTML = `<div class="empty-state">
            <div class="empty-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg></div>
            <p>Nenhum destaque salvo ainda.</p>
            <p class="empty-hint">Selecione qualquer trecho do texto durante a leitura para salvá-lo aqui.</p>
        </div>`;
        return;
    }
    dom.bmList.innerHTML = S.bookmarks.map((b, i) =>
        `<div class="bookmark-item" style="animation-delay:${i * 40}ms">
      <button class="bookmark-delete" data-i="${i}" aria-label="Remover">✕</button>
      <div class="bookmark-text">"${esc(b.text)}"</div>
      <div class="bookmark-source">${b.chapter}</div>
    </div>`
    ).join('');
    dom.bmList.querySelectorAll('.bookmark-delete').forEach(btn =>
        btn.addEventListener('click', () => removeBookmark(parseInt(btn.dataset.i)))
    );
}

// ─── Toast ───
function toast(msg) {
    dom.toast.textContent = msg;
    dom.toast.classList.add('show');
    setTimeout(() => dom.toast.classList.remove('show'), 2500);
}

// ─── Util ───
function esc(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

// ─── Events ───
function bindEvents() {
    $('btn-menu').addEventListener('click', openSidebar);
    $('sidebar-close').addEventListener('click', closeSidebar);
    dom.overlay.addEventListener('click', closeSidebar);

    dom.tocList.addEventListener('click', e => {
        const link = e.target.closest('.toc-link');
        if (link) loadChapter(parseInt(link.dataset.ch));
    });

    $$('.sidebar-link').forEach(btn =>
        btn.addEventListener('click', () => showView(btn.dataset.view))
    );

    $('btn-start').addEventListener('click', () => loadChapter(1));

    $('btn-theme-toggle').addEventListener('click', () => {
        const t = ['dark', 'light', 'sepia'];
        applyTheme(t[(t.indexOf(S.theme) + 1) % t.length]);
    });

    $$('.theme-pill').forEach(b =>
        b.addEventListener('click', () => applyTheme(b.dataset.theme))
    );

    $('font-dec').addEventListener('click', () => applyFont(S.fontSize - 1));
    $('font-inc').addEventListener('click', () => applyFont(S.fontSize + 1));

    dom.btnPrev.addEventListener('click', () => { if (S.chapter > 1) loadChapter(S.chapter - 1); });
    dom.btnNext.addEventListener('click', () => {
        if (S.chapter < CHAPTERS.length) loadChapter(S.chapter + 1);
        else { showView('cover'); toast('Parabéns! Você completou o guia!'); }
    });

    // Text selection tooltip
    document.addEventListener('mouseup', () => setTimeout(handleTextSelection, 10));
    document.addEventListener('touchend', () => setTimeout(handleTextSelection, 10));

    // Save selection button
    $('btn-save-selection').addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        saveSelection();
    });

    // Hide tooltip on scroll or click outside
    document.addEventListener('mousedown', e => {
        if (!dom.selTooltip.contains(e.target)) {
            hideSelectionTooltip();
        }
    });

    let raf;
    window.addEventListener('scroll', () => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            updateProgress();
            hideSelectionTooltip();
        });
    }, { passive: true });

    document.addEventListener('keydown', e => {
        if (S.view !== 'chapter') return;
        if (e.key === 'ArrowRight' && S.chapter < CHAPTERS.length) loadChapter(S.chapter + 1);
        if (e.key === 'ArrowLeft' && S.chapter > 1) loadChapter(S.chapter - 1);
    });
}

// ─── Cover Canvas: Floating Neurons ───
let coverAnimId = null;

function initCoverCanvas() {
    const canvas = $('cover-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    // Particles
    const COUNT = 35;
    const particles = [];
    const accentRGB = [212, 149, 106]; // --accent #d4956a

    for (let i = 0; i < COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width / dpr,
            y: Math.random() * canvas.height / dpr,
            r: Math.random() * 2 + .5,
            vx: (Math.random() - .5) * .15,
            vy: (Math.random() - .5) * .15,
            alpha: Math.random() * .15 + .03,
        });
    }

    function draw() {
        if (S.view !== 'cover') { coverAnimId = null; return; }
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        ctx.clearRect(0, 0, w, h);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    const alpha = (1 - dist / 100) * .06;
                    ctx.strokeStyle = `rgba(${accentRGB.join(',')},${alpha})`;
                    ctx.lineWidth = .5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        for (const p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${accentRGB.join(',')},${p.alpha})`;
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
        }

        coverAnimId = requestAnimationFrame(draw);
    }

    if (coverAnimId) cancelAnimationFrame(coverAnimId);
    coverAnimId = requestAnimationFrame(draw);
}

document.addEventListener('DOMContentLoaded', init);
