'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
                // Success: Redirect to members dashboard
                router.push('/dashboard');
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
            <div className="cover-bg">
                <div className="cover-gradient login-cover-gradient"></div>
                <div className="login-cover-image" aria-hidden="true"></div>
                <div className="login-ambient login-ambient--one" aria-hidden="true"></div>
                <div className="login-ambient login-ambient--two" aria-hidden="true"></div>
            </div>

            <div className="login-shell">
                <section className="login-card" aria-label="Login do leitor">
                    <h1 className="login-title">Área de Membros</h1>
                    <p className="login-subtitle">Faça login para acessar seus arquivos.</p>

                    <form className="login-form" onSubmit={handleLogin} suppressHydrationWarning>
                        <label className="login-label" htmlFor="email">Email de compra</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="login-input"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            inputMode="email"
                            enterKeyHint="go"
                            autoCapitalize="none"
                            autoCorrect="off"
                            spellCheck="false"
                            disabled={loading}
                            suppressHydrationWarning
                        />

                        <p className="login-hint">Use o mesmo email cadastrado no momento da compra.</p>

                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <circle cx="12" cy="12" r="10" strokeWidth="3"></circle>
                                        <path d="M4 12a8 8 0 0 1 8-8" strokeWidth="3" strokeLinecap="round"></path>
                                    </svg>
                                    Verificando acesso...
                                </>
                            ) : 'Acessar Guia'}
                        </button>
                    </form>

                    {error && (
                        <div className="login-error" role="alert">
                            {error}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
