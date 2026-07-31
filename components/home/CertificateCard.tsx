"use client";

import { useState, useEffect, useRef } from "react";

type Certification = {
  title: string;
  issuer: string;
  link: string;
  pdf: string | null;
  image?: string;
};

/* Renders first page of a PDF dynamically to canvas using pdf.js */
function PDFThumbnail({ pdfUrl }: { pdfUrl: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function renderPDF() {
      try {
        const globalWin = window as any;
        if (!globalWin.pdfjsLib) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
            script.onload = () => resolve();
            script.onerror = () => reject();
            document.head.appendChild(script);
          });
        }

        const lib = globalWin.pdfjsLib;
        lib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

        const pdf = await lib.getDocument(pdfUrl).promise;
        if (!active) return;

        const page = await pdf.getPage(1);
        if (!active) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const viewport = page.getViewport({ scale: 1.0 });
        // Scale to fit card dimensions nicely
        const scale = 300 / viewport.height;
        const scaledViewport = page.getViewport({ scale });

        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        };

        await page.render(renderContext).promise;
        if (active) {
          setLoading(false);
        }
      } catch (err) {
        console.error("Error rendering PDF thumbnail:", err);
        if (active) {
          setError(true);
          setLoading(false);
        }
      }
    }

    renderPDF();

    return () => {
      active = false;
    };
  }, [pdfUrl]);

  if (error) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-canvas-raised to-canvas select-none">
        <div className="w-12 h-12 rounded-full border border-red-500/30 bg-red-500/5 flex items-center justify-center mb-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-red-500">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <span className="type-label text-ink-faint text-[9px] uppercase tracking-wider text-center px-4">
          Preview Unavailable
        </span>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full bg-canvas flex items-center justify-center">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-canvas-raised to-canvas select-none">
          <div className="w-6 h-6 border border-gold/30 border-t-gold rounded-full animate-spin mb-3" />
          <span className="type-label text-ink-faint text-[9px] uppercase tracking-wider text-center">
            Rendering Preview...
          </span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
      />
    </div>
  );
}

export function CertificateCard({ cert }: { cert: Certification }) {
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" } // Pre-load 300px before entering viewport
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group block border border-line rounded-xl overflow-hidden hover:border-ink-faint transition-colors duration-300 bg-canvas-raised"
    >
      <a
        href={cert.pdf || cert.link}
        target="_blank"
        rel="noreferrer"
        className="block"
      >
        <div className="aspect-[4/3] bg-canvas relative overflow-hidden flex items-center justify-center border-b border-line">
          {cert.image ? (
            <img
              src={cert.image}
              alt={cert.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          ) : cert.pdf && inView ? (
            /* Render Dynamic PDF Canvas Thumbnail on scroll-in for all devices */
            <PDFThumbnail pdfUrl={cert.pdf} />
          ) : (
            /* Fallback loader state before viewport intersection */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-canvas-raised to-canvas select-none">
              <div className="w-12 h-12 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 11l2 2 4-4" />
                </svg>
              </div>
              <span className="type-label text-[10px] text-gold tracking-widest uppercase mb-1">
                {cert.issuer === "IIT Bombay" ? "IIT BOMBAY" : "GOOGLE DEVELOPERS"}
              </span>
              <span className="type-label text-ink-faint text-[9px] uppercase tracking-wider text-center px-4">
                Verified Credential
              </span>
            </div>
          )}
        </div>
        <div className="p-5">
          <p className="type-subhead text-ink text-sm leading-snug group-hover:opacity-80 transition-opacity duration-300">
            {cert.title}
          </p>
          <div className="flex justify-between items-baseline mt-3">
            <p className="type-label text-ink-faint">{cert.issuer}</p>
            <span className="type-label text-[10px] text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
              {cert.pdf ? "View PDF ↗" : "Verify ↗"}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
