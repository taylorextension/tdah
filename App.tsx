import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center font-sans">
      {/* Animated gradient background */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.08), transparent 40%)`,
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Brain icon */}
        <div className="mb-8 inline-flex items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
          </div>
        </div>

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Em desenvolvimento
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-white via-indigo-200 to-violet-200 bg-clip-text text-transparent">
            TDAH
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-slate-400 font-light mb-3">
          Em Breve
        </p>
        <p className="text-base text-slate-500 max-w-md mx-auto mb-10 leading-relaxed">
          Estamos preparando algo especial para ajudar pessoas com TDAH a organizarem suas vidas de forma simples e eficiente.
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-slate-700" />
          <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-slate-700" />
        </div>

        {/* Features preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="group p-5 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-indigo-500/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-3 mx-auto group-hover:bg-indigo-500/20 transition-colors">
              <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-slate-200 mb-1">Tarefas</h3>
            <p className="text-xs text-slate-500">Organize suas tarefas de forma visual</p>
          </div>

          <div className="group p-5 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-indigo-500/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-3 mx-auto group-hover:bg-violet-500/20 transition-colors">
              <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-slate-200 mb-1">Rotinas</h3>
            <p className="text-xs text-slate-500">Crie rotinas que funcionam para voce</p>
          </div>

          <div className="group p-5 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-indigo-500/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3 mx-auto group-hover:bg-purple-500/20 transition-colors">
              <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-slate-200 mb-1">Foco</h3>
            <p className="text-xs text-slate-500">Ferramentas para manter o foco</p>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-xs text-slate-600">
          TDAH &mdash; Transformando desafios em conquistas
        </p>
      </div>
    </div>
  );
};

export default App;
