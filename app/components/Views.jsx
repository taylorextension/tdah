'use client';

export function BookmarksView({ bookmarks, onRemove, onNavigate }) {
    return (
        <section id="view-bookmarks" className="page page--bookmarks">
            <h2 className="page-title">Destaques salvos</h2>
            <div id="bookmarks-list" className="bookmarks-list">
                {bookmarks.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                            </svg>
                        </div>
                        <p>Nenhum destaque salvo ainda.</p>
                        <p className="empty-hint">Selecione qualquer trecho do texto durante a leitura para salvá-lo aqui.</p>
                    </div>
                ) : (
                    bookmarks.map((b, i) => (
                        <div key={i} className="bookmark-item" style={{ animationDelay: `${i * 40}ms` }}>
                            <button
                                className="bookmark-delete"
                                aria-label="Remover"
                                onClick={(e) => { e.stopPropagation(); onRemove(i); }}
                            >✕</button>
                            <div
                                className="bookmark-text"
                                onClick={() => onNavigate(b.chapterId)}
                                style={{ cursor: 'pointer' }}
                            >
                                "{b.text}"
                            </div>
                            <div className="bookmark-source">{b.chapter}</div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export function SettingsView({ fontSize, onFontChange, theme, onThemeChange }) {
    return (
        <section id="view-settings" className="page page--settings">
            <h2 className="page-title">Configurações</h2>
            <div className="settings-card">
                <div className="setting-row">
                    <label className="setting-label">Tamanho da fonte</label>
                    <div className="font-ctrl">
                        <button className="font-btn" aria-label="Diminuir" onClick={() => onFontChange(fontSize - 1)}>A−</button>
                        <span className="font-val">{fontSize}</span>
                        <button className="font-btn" aria-label="Aumentar" onClick={() => onFontChange(fontSize + 1)}>A+</button>
                    </div>
                </div>
                <div className="setting-row">
                    <label className="setting-label">Tema</label>
                    <div className="theme-pills">
                        {['dark', 'light', 'sepia'].map(t => (
                            <button
                                key={t}
                                className={`theme-pill ${theme === t ? 'active' : ''}`}
                                onClick={() => onThemeChange(t)}
                            >
                                <span className={`pill-dot pill-dot--${t}`}></span>
                                {t === 'dark' ? 'Escuro' : t === 'light' ? 'Claro' : 'Sépia'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="settings-card">
                <p className="about-text">
                    Este guia reúne informações baseadas em ciência e relatos reais de pais brasileiros
                    para ajudar famílias que convivem com o TDAH. O conteúdo é educativo e não substitui acompanhamento
                    profissional.
                </p>
            </div>
        </section>
    );
}
