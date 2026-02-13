'use client';
import { useState, useEffect } from 'react';
import { CHAPTERS } from '../data/chapters';
import Image from 'next/image';

export default function ChapterViewer({ chapterId, onPrev, onNext, onComplete, onSetProgress }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const ch = CHAPTERS.find(c => c.id === chapterId);

    useEffect(() => {
        setLoading(true);
        const load = async () => {
            try {
                const res = await fetch(`/chapters/ch${String(chapterId).padStart(2, '0')}.json`);
                const json = await res.json();
                setData(json);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
        window.scrollTo(0, 0);
    }, [chapterId]);

    // Update Progress on Scroll
    useEffect(() => {
        const handleScroll = () => {
            const top = window.scrollY;
            const h = document.documentElement.scrollHeight - window.innerHeight;
            const pct = h > 0 ? Math.min(100, Math.round((top / h) * 100)) : 0;
            // Only update if pct > current (handled in parent) or just update always let parent decide?
            // Parent handles "pct > current", so we just send current pct.
            // But for visual bar we want real-time.
            // Wait, parent updates both state and localStorage.
            // Visual bar in ClientApps uses `progress[chapter]`.
            // So if I scroll up, bar shouldn't shrink? 
            // In original app: dom.progFill.style.width = pct + '%'; -> visual is always real-time
            // AND ALSO: if (pct > saved) save.

            // Here: onSetProgress is "handleProgress" in ClientApp.
            // handleProgress implementation: if (pct > current) setProgress...
            // This means visual bar only grows?
            // In original app: dom.progFill.style.width = pct + '%' was separate from saving.

            // We need 2 callbacks or handle it differently.
            // Let's pass `onUpdateVisual` and `onSaveProgress`.
            // OR simpler: ClientApp renders bar based on scroll position state?
            // Too much re-renders.

            // Correct approach:
            // Visual bar should be updated directly in DOM or local state in ClientApp/Layout?
            // Actually ClientApp renders the bar.
            // If we update state on every scroll, React renders on every scroll -> bad perf.

            // Better: Update the bar directly via ref/dom ID.
            const bar = document.getElementById('progress-fill');
            if (bar) bar.style.width = `${pct}%`;

            if (onSetProgress) onSetProgress(pct);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Reset bar
        const bar = document.getElementById('progress-fill');
        if (bar) bar.style.width = '0%';

        return () => window.removeEventListener('scroll', handleScroll);
    }, [chapterId, onSetProgress]);

    if (!ch) return null;

    return (
        <section id="view-chapter" className="page page--chapter">
            <article className="chapter">
                <header className="chapter-head">
                    <span className="ch-label">Capítulo {chapterId}</span>
                    <div className="ch-illustration">
                        {/* Using standard img for now to match original styles perfectly, can upgrade to Next Image later */}
                        <img
                            src={`/images/ch${String(chapterId).padStart(2, '0')}.jpeg`}
                            alt={ch.title}
                            loading="lazy"
                        />
                    </div>
                    <h2 className="ch-title">{ch.title}</h2>
                </header>

                <div id="ch-body" className="prose">
                    {loading ? (
                        <div className="chapter-skeleton">
                            <div className="skeleton-line"></div><div className="skeleton-line"></div>
                            <div className="skeleton-line"></div><div className="skeleton-line"></div>
                            <div className="skeleton-line"></div>
                        </div>
                    ) : (
                        data?.sections?.map((sec, i) => (
                            <div key={i}>
                                {sec.title && <h3>{sec.title}</h3>}
                                {sec.content.map((block, j) => {
                                    switch (block.type) {
                                        case 'paragraph': return <p key={j}>{block.text}</p>;
                                        case 'quote': return <blockquote key={j}>{block.text}</blockquote>;
                                        case 'highlight': return <p key={j} className="prose-emphasis">{block.text}</p>;
                                        case 'callout':
                                            return (
                                                <div key={j} className="callout">
                                                    <div className="callout-title">{block.title || 'Importante'}</div>
                                                    <p>{block.text}</p>
                                                </div>
                                            );
                                        case 'list':
                                            return (
                                                <ul key={j}>
                                                    {block.items.map((item, k) => <li key={k}>{item}</li>)}
                                                </ul>
                                            );
                                        default: return null;
                                    }
                                })}
                            </div>
                        ))
                    )}
                </div>

                <nav className="chapter-nav">
                    <span className="ch-page-ind">{chapterId} de {CHAPTERS.length}</span>
                    <div className="chapter-nav-row">
                        {chapterId > 1 && (
                            <button className="ch-nav-btn" onClick={onPrev}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                                Anterior
                            </button>
                        )}
                        <button className="ch-nav-btn ch-nav-btn--primary" onClick={chapterId < CHAPTERS.length ? onNext : onComplete}>
                            {chapterId < CHAPTERS.length ? 'Próximo' : 'Finalizar'}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </article>
        </section>
    );
}
