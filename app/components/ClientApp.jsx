'use client';

import { useState, useEffect } from 'react';
import Cover from './Cover';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ChapterViewer from './ChapterViewer';
import { BookmarksView, SettingsView } from './Views';
import SelectionTooltip from './SelectionTooltip';
import { CHAPTERS } from '../data/chapters';

export default function ClientApp() {
    const [view, setView] = useState('cover');
    const [chapter, setChapter] = useState(1);
    const [theme, setTheme] = useState('dark');
    const [fontSize, setFontSize] = useState(18);
    const [bookmarks, setBookmarks] = useState([]);
    const [progress, setProgress] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [splashVisible, setSplashVisible] = useState(true);
    const [toast, setToast] = useState(null);

    // Initial Load from LocalStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('tdah-theme') || 'dark';
        const savedFont = parseInt(localStorage.getItem('tdah-fs')) || 18;
        const savedBm = JSON.parse(localStorage.getItem('tdah-bm') || '[]');
        const savedProg = JSON.parse(localStorage.getItem('tdah-prog') || '{}');

        setTheme(savedTheme);
        setFontSize(savedFont);
        setBookmarks(savedBm);
        setProgress(savedProg);

        // Splash Screen Timer
        setTimeout(() => {
            setSplashVisible(false);
        }, 2600); // 2s wait + 600ms fade
    }, []);

    // Update DOM for Theme/Font
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('tdah-theme', theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.style.setProperty('--font-size', fontSize + 'px');
        localStorage.setItem('tdah-fs', fontSize);
    }, [fontSize]);

    // Bookmarks Logic
    const addBookmark = (text) => {
        const truncated = text.length > 300 ? text.substring(0, 300) + '…' : text;
        if (bookmarks.some(b => b.text === truncated)) {
            showToast('Já está nos destaques!');
            return;
        }
        const currentCh = CHAPTERS.find(c => c.id === chapter);
        const newBm = [
            ...bookmarks,
            { text: truncated, chapter: currentCh.title, chapterId: chapter, date: new Date().toISOString() }
        ];
        setBookmarks(newBm);
        localStorage.setItem('tdah-bm', JSON.stringify(newBm));
        showToast('Destaque salvo ✓');
    };

    const removeBookmark = (index) => {
        const newBm = bookmarks.filter((_, i) => i !== index);
        setBookmarks(newBm);
        localStorage.setItem('tdah-bm', JSON.stringify(newBm));
    };

    // Progress Logic
    const handleProgress = (pct) => {
        if (view !== 'chapter') return;
        const current = progress[chapter] || 0;
        if (pct > current) {
            const newProg = { ...progress, [chapter]: pct };
            setProgress(newProg);
            localStorage.setItem('tdah-prog', JSON.stringify(newProg));
        }
    };

    // Navigation
    const goToChapter = (id) => {
        setChapter(id);
        setView('chapter');
        setSidebarOpen(false);
    };

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2500);
    };

    // View Title Logic
    const getTitle = () => {
        if (view === 'chapter') return CHAPTERS.find(c => c.id === chapter)?.title;
        if (view === 'bookmarks') return 'Destaques';
        if (view === 'settings') return 'Configurações';
        return 'TDAH — Guia Para Pais';
    };

    return (
        <>
            {/* Splash Screen */}
            {splashVisible && (
                <div id="splash" className={`splash ${splashVisible ? '' : 'out'}`}>
                    <div className="splash-inner">
                        <div className="splash-brain">
                            <svg viewBox="0 0 72 72" width="72" height="72" fill="none">
                                <circle cx="36" cy="36" r="34" stroke="#d4956a" strokeWidth="1.5" opacity="0.2" />
                                <circle cx="36" cy="36" r="24" stroke="#d4956a" strokeWidth="1" opacity="0.12" />
                                <path d="M25 40c0-7 5-14 11-14s11 7 11 14" stroke="#d4956a" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                                <circle cx="36" cy="33" r="2.5" fill="#d4956a" opacity="0.5" />
                            </svg>
                        </div>
                        <h1 className="splash-t">TDAH</h1>
                        <p className="splash-s">Guia Para Pais</p>
                        <div className="splash-bar">
                            <div className="splash-bar-fill"></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main App */}
            <div id="app" className={`app ${!splashVisible ? 'visible' : ''} ${view === 'cover' ? 'cover-active' : ''}`}>

                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    onChapter={goToChapter}
                    progress={progress}
                    currentChapter={chapter}
                    onView={(v) => { setView(v); setSidebarOpen(false); }}
                />

                <div className="main-wrapper">
                    <Topbar
                        title={getTitle()}
                        onMenu={() => setSidebarOpen(true)}
                        onTheme={() => {
                            const themes = ['dark', 'light', 'sepia'];
                            const next = themes[(themes.indexOf(theme) + 1) % themes.length];
                            setTheme(next);
                        }}
                        theme={theme}
                        isCover={view === 'cover'}
                    />

                    {/* Reading Progress Bar */}
                    {view === 'chapter' && (
                        <div id="reading-progress" className="reading-progress">
                            <div id="progress-fill" className="progress-fill"></div>
                        </div>
                    )}

                    <main className="content">
                        {view === 'cover' && <Cover onStart={() => goToChapter(1)} />}

                        {view === 'chapter' && (
                            <ChapterViewer
                                chapterId={chapter}
                                onPrev={() => goToChapter(chapter - 1)}
                                onNext={() => goToChapter(chapter + 1)}
                                onComplete={() => { setView('cover'); showToast('Parabéns! Guia concluído!'); }}
                                onSetProgress={handleProgress}
                                progress={progress[chapter] || 0}
                            />
                        )}

                        {view === 'bookmarks' && (
                            <BookmarksView
                                bookmarks={bookmarks}
                                onRemove={removeBookmark}
                                onNavigate={goToChapter}
                            />
                        )}

                        {view === 'settings' && (
                            <SettingsView
                                fontSize={fontSize}
                                onFontChange={setFontSize}
                                theme={theme}
                                onThemeChange={setTheme}
                            />
                        )}
                    </main>
                </div>
            </div>

            <SelectionTooltip onSave={addBookmark} view={view} />

            <div id="toast" className={`toast ${toast ? 'show' : ''}`} aria-live="polite">
                {toast}
            </div>
        </>
    );
}
