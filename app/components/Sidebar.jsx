'use client';
import { CHAPTERS } from '../data/chapters';

export default function Sidebar({ isOpen, onClose, onChapter, progress, currentChapter, onView }) {
    const getReadState = (id) => (progress[id] || 0) > 85 ? 'toc-link read' : 'toc-link';
    const getActiveState = (id) => currentChapter === id ? ' active' : '';

    return (
        <>
            <aside id="sidebar" className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        <span className="brand-icon">🧠</span>
                        <div>
                            <div className="brand-title">TDAH</div>
                            <div className="brand-sub">Guia Para Pais</div>
                        </div>
                    </div>
                    <button id="sidebar-close" className="sidebar-close" aria-label="Fechar menu" onClick={onClose}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="toc" role="navigation" aria-label="Índice">
                    <p className="toc-label">Índice</p>
                    <ol id="toc-list" className="toc-list">
                        {CHAPTERS.map(ch => (
                            <li key={ch.id} className="toc-item">
                                <button
                                    className={`${getReadState(ch.id)}${getActiveState(ch.id)}`}
                                    onClick={() => onChapter(ch.id)}
                                >
                                    <span className="toc-num">{ch.id}.</span>
                                    <span className="toc-text">{ch.title}</span>
                                    <span className="toc-check">✓</span>
                                </button>
                            </li>
                        ))}
                    </ol>
                </nav>

                <div className="sidebar-footer">
                    <button id="btn-bookmarks-nav" className="sidebar-link" onClick={() => onView('bookmarks')}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                        </svg>
                        Destaques
                    </button>
                    <button id="btn-settings-nav" className="sidebar-link" onClick={() => onView('settings')}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                        </svg>
                        Configurações
                    </button>
                </div>
            </aside>

            <div id="sidebar-overlay" className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose}></div>
        </>
    );
}
