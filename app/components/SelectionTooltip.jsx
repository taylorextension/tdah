'use client';
import { useEffect, useRef, useState } from 'react';

export default function SelectionTooltip({ onSave, view }) {
    const [coords, setCoords] = useState(null);
    const [text, setText] = useState('');
    const tooltipRef = useRef(null);

    useEffect(() => {
        const handleSelection = () => {
            const sel = window.getSelection();
            const txt = sel ? sel.toString().trim() : '';

            if (!txt || txt.length < 5 || view !== 'chapter') {
                setCoords(null);
                setText('');
                return;
            }

            // Check if inside prose
            const anchor = sel.anchorNode;
            const prose = document.getElementById('ch-body');
            if (!anchor || (prose && !prose.contains(anchor))) {
                setCoords(null);
                return;
            }

            if (sel.rangeCount === 0) return;

            const range = sel.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            const tooltipX = rect.left + rect.width / 2;
            const tooltipY = rect.bottom + 8;

            setCoords({
                left: Math.max(10, Math.min(tooltipX - 70, window.innerWidth - 160)),
                top: Math.min(tooltipY, window.innerHeight - 50)
            });
            setText(txt);
        };

        const handleInteraction = (e) => {
            // Small timeout to let selection solidify
            setTimeout(handleSelection, 10);
        };

        // Hide if clicking outside tooltip
        const handleClickOutside = (e) => {
            if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
                setCoords(null);
            }
        };

        const handleScroll = () => {
            setCoords(null); // Hide on scroll for simplicity and UX
        };

        document.addEventListener('mouseup', handleInteraction);
        document.addEventListener('touchend', handleInteraction);
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            document.removeEventListener('mouseup', handleInteraction);
            document.removeEventListener('touchend', handleInteraction);
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [view]);

    if (!coords) return null;

    return (
        <div
            ref={tooltipRef}
            id="selection-tooltip"
            className="selection-tooltip visible"
            style={{ left: coords.left, top: coords.top }}
        >
            <button onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSave(text);
                setCoords(null);
                window.getSelection().removeAllRanges();
            }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                </svg>
                Salvar destaque
            </button>
        </div>
    );
}
