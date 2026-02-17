import Image from 'next/image';
import Link from 'next/link';

const ITEMS = [
  {
    id: 'ebook',
    title: 'E-book',
    description: 'Acesse o guia completo em PDF e leia no seu ritmo.',
    href: '/dashboard/ebook',
    cta: 'Ler agora',
    cover: '/images/members/ebook-cover.png',
  },
  {
    id: 'audiobook',
    title: 'Audiobook',
    description: 'Ouça o conteúdo com player integrado e retome de onde parou.',
    href: '/dashboard/audiobook/player',
    cta: 'Ouvir agora',
    cover: '/images/members/audiobook-cover.png',
  },
];

export default function DashboardPage() {
  return (
    <main className="members-page">
      <header className="members-header">
        <div className="members-header-top">
          <p className="members-kicker">Area de membros</p>
          <Link href="/api/auth/logout" prefetch={false} className="members-logout-btn" aria-label="Sair da conta">
            <svg viewBox="0 0 24 24" className="members-logout-icon" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M15 16l4-4-4-4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 12h10" strokeLinecap="round" />
              <path d="M5 5h4a2 2 0 0 1 2 2v2" strokeLinecap="round" />
              <path d="M5 19h4a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
            </svg>
            Sair
          </Link>
        </div>
        <h1 className="members-title">Seu conteudo exclusivo</h1>
        <p className="members-subtitle">Escolha abaixo como deseja consumir o material.</p>
      </header>

      <section className="members-grid" aria-label="Conteudos disponiveis">
        {ITEMS.map((item) => (
          <article key={item.id} className="member-card">
            <div className="member-card-cover-wrap">
              <Image
                src={item.cover}
                alt={`Capa de ${item.title}`}
                width={920}
                height={620}
                className="member-card-cover"
                priority
              />
            </div>

            <div className="member-card-body">
              <h2 className="member-card-title">{item.title}</h2>
              <p className="member-card-description">{item.description}</p>

              <Link href={item.href} prefetch={false} className="member-card-cta">
                {item.cta}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
