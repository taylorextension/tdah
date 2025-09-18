import React from 'react';
import { XIcon } from './icons';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navLinks: { href: string; label: string }[];
    onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navLinks, onLinkClick }) => {
    return (
        <div className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            {/* Menu Panel */}
            <div className={`relative flex flex-col w-4/5 max-w-sm h-full bg-slate-800 text-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-between items-center p-6 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-emerald-400">Navegação</h2>
                    <button onClick={onClose} className="p-2 -mr-2" aria-label="Fechar menu">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                <nav className="flex-1 p-6">
                    <ul className="space-y-2">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={(e) => onLinkClick(e, link.href)}
                                    className="block py-3 px-4 text-lg font-semibold text-slate-200 rounded-md hover:bg-slate-700 hover:text-white transition-colors"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};