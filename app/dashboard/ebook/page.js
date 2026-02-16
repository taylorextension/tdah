'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EbookPage() {
  const router = useRouter();

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;

    if (isMobile) {
      router.replace('/dashboard/ebook/fullscreen');
      return;
    }

    window.location.replace('/api/content/ebook');
  }, [router]);

  return (
    <main className="content-page">
      <p className="content-subtitle">Carregando leitura...</p>
    </main>
  );
}
