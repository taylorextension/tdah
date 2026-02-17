'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authFetch } from '@/lib/authFetch';

const PDF_PAGE_KEY = 'tdah_pdf_page';

export default function EbookFullscreenPage() {
  const router = useRouter();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);

  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [resizeTick, setResizeTick] = useState(0);
  const [isMobile, setIsMobile] = useState(null);

  const canGoPrev = pageNumber > 1;
  const canGoNext = pageCount > 0 && pageNumber < pageCount;

  useEffect(() => {
    function handleViewport() {
      const mobile = window.matchMedia('(max-width: 900px)').matches;
      setIsMobile(mobile);
      if (!mobile) {
        router.replace('/dashboard/ebook');
      }
    }

    handleViewport();
    window.addEventListener('resize', handleViewport);

    return () => {
      window.removeEventListener('resize', handleViewport);
    };
  }, [router]);

  useEffect(() => {
    if (isMobile !== true) return;

    let canceled = false;

    async function loadPdf() {
      try {
        const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
        const workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.min.mjs', import.meta.url).toString();
        pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

        const response = await authFetch('/api/content/ebook');
        if (!response.ok) {
          throw new Error('Unauthorized');
        }
        const data = await response.arrayBuffer();
        const task = pdfjs.getDocument({ data });
        const doc = await task.promise;

        if (canceled) {
          await doc.destroy();
          return;
        }

        const saved = Number.parseInt(localStorage.getItem(PDF_PAGE_KEY) || '1', 10);
        const safePage = Number.isFinite(saved)
          ? Math.min(Math.max(saved, 1), doc.numPages)
          : 1;

        setPdfDoc(doc);
        setPageCount(doc.numPages);
        setPageNumber(safePage);
        setLoading(false);
      } catch {
        if (!canceled) {
          setError('Nao foi possivel carregar o PDF.');
          setLoading(false);
        }
      }
    }

    loadPdf();

    return () => {
      canceled = true;
    };
  }, [isMobile]);

  useEffect(() => {
    return () => {
      if (renderTaskRef.current?.cancel) {
        renderTaskRef.current.cancel();
      }
      if (pdfDoc) {
        pdfDoc.destroy();
      }
    };
  }, [pdfDoc]);

  useEffect(() => {
    if (isMobile !== true) return;

    function onResize() {
      setResizeTick((tick) => tick + 1);
    }

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile !== true || !pdfDoc || !canvasRef.current || !containerRef.current) {
      return;
    }

    let canceled = false;

    async function renderPage() {
      const page = await pdfDoc.getPage(pageNumber);
      if (canceled || !canvasRef.current || !containerRef.current) {
        return;
      }

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      const baseViewport = page.getViewport({ scale: 1 });
      const availableWidth = Math.max(containerRef.current.clientWidth - 12, 280);
      const fitScale = availableWidth / baseViewport.width;
      const viewport = page.getViewport({ scale: fitScale });
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = Math.floor(viewport.width * pixelRatio);
      canvas.height = Math.floor(viewport.height * pixelRatio);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, viewport.width, viewport.height);

      if (renderTaskRef.current?.cancel) {
        renderTaskRef.current.cancel();
      }

      const renderTask = page.render({ canvasContext: context, viewport });
      renderTaskRef.current = renderTask;
      await renderTask.promise.catch(() => undefined);
    }

    renderPage();
    localStorage.setItem(PDF_PAGE_KEY, String(pageNumber));

    return () => {
      canceled = true;
      if (renderTaskRef.current?.cancel) {
        renderTaskRef.current.cancel();
      }
    };
  }, [isMobile, pdfDoc, pageNumber, resizeTick]);

  const progressLabel = useMemo(() => {
    if (!pageCount) return '--/--';
    return `${pageNumber}/${pageCount}`;
  }, [pageNumber, pageCount]);

  if (isMobile !== true) {
    return (
      <main className="content-page">
        <p className="content-subtitle">Carregando leitura...</p>
      </main>
    );
  }

  return (
    <main className="pdf-fullscreen-page">
      <header className="pdf-toolbar">
        <Link href="/dashboard" className="pdf-toolbar-btn">
          Voltar
        </Link>
      </header>

      <section ref={containerRef} className="pdf-canvas-wrap" aria-label="Leitor de PDF em tela cheia">
        {loading && <p className="pdf-status">Carregando PDF...</p>}
        {!loading && error && <p className="pdf-status pdf-status--error">{error}</p>}
        {!loading && !error && (
          <div className="pdf-canvas-viewport pdf-canvas-viewport--mobile">
            <canvas ref={canvasRef} className="pdf-canvas" />
          </div>
        )}
      </section>

      <nav className="pdf-bottom-nav" aria-label="Navegacao de paginas">
        <button
          type="button"
          className="pdf-bottom-btn"
          disabled={!canGoPrev}
          onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
        >
          Pagina Anterior
        </button>

        <span className="pdf-page-indicator">{progressLabel}</span>

        <button
          type="button"
          className="pdf-bottom-btn"
          disabled={!canGoNext}
          onClick={() => setPageNumber((p) => Math.min(pageCount, p + 1))}
        >
          Proxima Pagina
        </button>
      </nav>
    </main>
  );
}
