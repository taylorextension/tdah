'use client';

export default function Topbar({ title, onMenu, onTheme, theme, isCover }) {
    if (isCover) return null;

    return (
        <>
            <header className="topbar">
                <button id="btn-menu" className="topbar-btn" aria-label="Menu" onClick={onMenu}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12h18M3 6h18M3 18h18" />
                    </svg>
                </button>
                <h1 id="topbar-title" className="topbar-title">{title}</h1>
                <button id="btn-theme-toggle" className="topbar-btn" aria-label="Tema" onClick={onTheme}>
                    {theme === 'dark' ? (
                        <svg id="ico-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                        </svg>
                    ) : (
                        <svg id="ico-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="5" />
                            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                        </svg>
                    )}
                </button>
            </header>
        </>
    );
}
