import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

function isMobileUserAgent(userAgent) {
  return /Android|iPhone|iPad|iPod|Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent || '');
}

export default async function EbookPage() {
  const ua = (await headers()).get('user-agent') || '';

  if (isMobileUserAgent(ua)) {
    redirect('/dashboard/ebook/fullscreen');
  }

  redirect('/api/content/ebook');
}
