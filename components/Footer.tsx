import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-800 px-6 py-8 text-slate-300 text-sm">
            <div className="mx-auto max-w-2xl space-y-4">
                <p className="text-sm font-semibold text-slate-100">MÉTODO PPI © 2025 - Todos os direitos reservados.</p>
                <p className="leading-relaxed">Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site. Fazemos todos os esforços para indicar claramente e mostrar todas as provas do produto e usamos resultados reais. Nós não vendemos o seu e-mail ou qualquer informação para terceiros. Jamais fazemos nenhum tipo de spam.</p>
            </div>
        </footer>
    );
};
