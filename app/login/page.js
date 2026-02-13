'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                // Success: Redirect to home
                router.push('/');
            } else {
                const data = await res.json();
                setError(data.error || 'Erro ao realizar login. Verifique seu email.');
            }
        } catch (err) {
            setError('Erro de conexão. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page page--login">
            {/* Background (Same as Cover) */}
            <div className="cover-bg">
                <div className="cover-gradient"></div>
                {/* We can reuse the particles canvas here for consistency if requested, but let's keep it clean for login */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: "url('/images/cover-bg.jpeg') center center / cover no-repeat",
                    zIndex: -1
                }}></div>
            </div>

            <div className="login-card">
                <div className="login-logo" style={{ marginBottom: '1.5rem' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
                        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"></path>
                        <path d="M12 7v5l3 3"></path>
                    </svg>
                </div>

                <h1 className="login-title">Área do Leitor</h1>
                <p className="login-subtitle">Digite seu email de compra para acessar o guia.</p>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        className="login-input"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoCapitalize="none"
                        autoCorrect="off" // Disable autocorrect for easier email typing
                        spellCheck="false"
                        disabled={loading}
                    />

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? (
                            <>
                                <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verificando...
                            </>
                        ) : 'Acessar Guia'}
                    </button>
                </form>

                {error && (
                    <div className="login-error fade-in">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}
