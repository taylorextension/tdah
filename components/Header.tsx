import React, { useState } from 'react';
import { MenuIcon } from './icons';
import { MobileMenu } from './MobileMenu';

const navLinks = [
    { href: '#inicio', label: 'Início' },
    { href: '#o-problema', label: 'O Problema' },
    { href: '#a-solucao', label: 'A Solução' },
    { href: '#o-metodo', label: 'O Método' },
    { href: '#o-que-voce-recebe', label: 'O Que Você Recebe' },
    { href: '#oferta', label: 'Sua Oferta' },
    { href: '#garantia', label: 'Garantia' },
    { href: '#faq', label: 'Dúvidas' }
];

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            if (isMenuOpen) {
                setIsMenuOpen(false);
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            } else {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-emerald-700 shadow-lg">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
                    <a href="#inicio" onClick={(e) => handleLinkClick(e, '#inicio')} className="text-xl font-extrabold text-white">
                        Método PPI
                    </a>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className="px-3 py-2 text-sm font-medium rounded-md transition-colors text-emerald-100 hover:text-white hover:bg-emerald-600"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                    
                    <button 
                        onClick={() => setIsMenuOpen(true)}
                        className="p-2 -mr-2 md:hidden"
                        aria-label="Abrir menu"
                    >
                        <MenuIcon className="h-6 w-6 text-white" />
                    </button>
                </div>
            </header>
            <MobileMenu 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)} 
                navLinks={navLinks}
                onLinkClick={handleLinkClick} 
            />
        </>
    );
};
