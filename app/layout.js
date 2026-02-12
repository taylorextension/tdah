import './style.css';

export const metadata = {
  title: 'TDAH — Guia Para Pais',
  description: 'Guia completo e interativo para pais de crianças com TDAH. Entenda o transtorno, descubra estratégias práticas e saiba que você não está sozinho(a).',
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
  manifest: '/manifest.json',
  themeColor: '#161619',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
