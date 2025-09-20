import React from 'react';

export const GuaranteeSection: React.FC = () => {
    return (
        <section id="garantia" className="p-8 md:p-12 bg-slate-50">
            <div className="max-w-2xl mx-auto">
                <h3 className="text-3xl font-extrabold text-slate-800 mb-8">Garantia Dupla Para Você Testar Sem Medo</h3>
                
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-emerald-700">Garantia incondicional de 7 dias:</h4>
                        <p className="mt-2 text-slate-600 text-lg">Não gostou do conteúdo? Devolvemos 100% do seu dinheiro.</p>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-emerald-700">Garantia de aplicação (30 dias):</h4>
                        <p className="mt-2 text-slate-600 text-lg">Siga as 3 regras do PPI. Se em 30 dias você não notar pelo menos 3 sinais de progresso (menos fome, roupas mais folgadas, energia mais estável), basta pedir reembolso.</p>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                    <p className="text-slate-700 font-semibold text-lg">Sem letras miúdas. Sem risco.</p>
                    <p className="mt-2 text-slate-500 text-base">
                        Após a compra, você receberá um e-mail com o acesso imediato ao material. Nele, você também encontrará as instruções claras para solicitar o reembolso, caso decida acionar a garantia.
                    </p>
                </div>
            </div>
        </section>
    );
};
