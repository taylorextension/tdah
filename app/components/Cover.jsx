'use client';
import { useEffect, useRef } from 'react';

export default function Cover({ onStart }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animId;
        const accentRGB = [212, 149, 106]; // --accent #d4956a

        const resize = () => {
            if (!canvas.parentElement) return;
            const rect = canvas.parentElement.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener('resize', resize);
        resize();

        // Init Particles
        const COUNT = 35;
        const particles = [];
        for (let i = 0; i < COUNT; i++) {
            particles.push({
                x: Math.random() * (canvas.width / (window.devicePixelRatio || 1)),
                y: Math.random() * (canvas.height / (window.devicePixelRatio || 1)),
                r: Math.random() * 2 + 0.5,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                alpha: Math.random() * 0.15 + 0.03,
            });
        }

        const draw = () => {
            const dpr = window.devicePixelRatio || 1;
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
                        const alpha = (1 - dist / 100) * 0.06;
                        ctx.strokeStyle = `rgba(${accentRGB.join(',')},${alpha})`;
                        ctx.lineWidth = 0.5;
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

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <section id="view-cover" className="page page--cover">
            <div className="cover-bg">
                <div className="cover-gradient"></div>
                <canvas ref={canvasRef} className="cover-canvas"></canvas>

                <svg className="cover-brain-svg" viewBox="0 0 400 400" fill="none">
                    <circle cx="200" cy="200" r="180" stroke="var(--accent)" strokeWidth=".5" opacity=".06" className="brain-ring brain-ring--1" />
                    <circle cx="200" cy="200" r="140" stroke="var(--accent)" strokeWidth=".5" opacity=".08" className="brain-ring brain-ring--2" />
                    <circle cx="200" cy="200" r="100" stroke="var(--accent)" strokeWidth=".4" opacity=".1" className="brain-ring brain-ring--3" />
                    <circle cx="200" cy="200" r="60" stroke="var(--accent)" strokeWidth=".3" opacity=".12" className="brain-ring brain-ring--4" />

                    <path d="M170 240c-8-20-18-40-12-65 6-26 22-42 42-42s36 16 42 42c6 25-4 45-12 65" stroke="var(--accent)"
                        strokeWidth="1" strokeLinecap="round" opacity=".15" className="brain-path" />
                    <circle cx="200" cy="175" r="5" fill="var(--accent)" opacity=".2" className="brain-dot" />

                    <line x1="200" y1="175" x2="160" y2="200" stroke="var(--accent)" strokeWidth=".4" opacity=".08" className="neural-line" />
                    <line x1="200" y1="175" x2="240" y2="200" stroke="var(--accent)" strokeWidth=".4" opacity=".08" className="neural-line" />
                    <line x1="200" y1="175" x2="200" y2="220" stroke="var(--accent)" strokeWidth=".4" opacity=".08" className="neural-line" />
                    <circle cx="160" cy="200" r="2.5" fill="var(--accent)" opacity=".12" />
                    <circle cx="240" cy="200" r="2.5" fill="var(--accent)" opacity=".12" />
                    <circle cx="200" cy="220" r="2.5" fill="var(--accent)" opacity=".12" />
                </svg>
            </div>

            <div className="cover-content">
                <div className="cover-badge cover-anim" style={{ '--delay': 0 }}>E-book Interativo</div>
                <h2 className="cover-title">
                    <span className="cover-title-line cover-anim" style={{ '--delay': 1 }}>Entenda o</span>
                    <span className="cover-title-accent cover-anim" style={{ '--delay': 2 }}>TDAH</span>
                    <span className="cover-title-line cover-anim" style={{ '--delay': 3 }}>do seu filho</span>
                </h2>
                <div className="cover-rule cover-anim" style={{ '--delay': 4 }}></div>
                <p className="cover-desc cover-anim" style={{ '--delay': 5 }}>
                    Pra pais que querem entender de verdade o que acontece na cabeça do filho e saber como agir.<br />
                    Sem rótulos, sem pânico. Com ciência e com afeto.
                </p>
                <div className="cover-meta cover-anim" style={{ '--delay': 6 }}>
                    <span>10 capítulos</span>
                    <span className="cover-dot">·</span>
                    <span>Leitura interativa</span>
                </div>
                <button id="btn-start" className="btn-start cover-anim" style={{ '--delay': 7 }} onClick={onStart}>
                    Começar a leitura
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
