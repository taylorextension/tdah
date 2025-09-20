import React from 'react';

interface CtaButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const CtaButton: React.FC<CtaButtonProps> = ({ children, className, onClick, href }) => {
  const targetHref = href || '#oferta';
  const isExternal = targetHref.startsWith('http');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isExternal) {
      // Deixa o navegador lidar com links externos
      return;
    }
    
    // Para links internos, previne o padrão e rola suavemente
    e.preventDefault();
    if (onClick) {
      onClick();
    }
    const targetSection = document.getElementById(targetHref.substring(1));
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={targetHref}
      onClick={isExternal ? undefined : handleClick}
      className={`block w-full text-center bg-green-500 text-white font-bold text-xl py-4 px-8 rounded-lg shadow-lg shadow-green-900/50 hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 ${className}`}
    >
      {children}
    </a>
  );
};