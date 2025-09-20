import React from 'react';

export const GuaranteeSection: React.FC = () => {
    return (
        <section id="garantia" className="bg-slate-50 px-6 py-12 md:py-16">
            <div className="mx-auto max-w-2xl space-y-10">
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Garantia Dupla — Zero Risco para Você</h3>
                
                <div className="space-y-6">
                    <div className="space-y-3">
                        <h4 className="text-2xl font-semibold leading-relaxed text-emerald-700">7 dias incondicional</h4>
                        <p className="text-xl leading-relaxed text-slate-700">Não gostou? Devolvemos 100% do seu dinheiro. Sem perguntas, sem letras miúdas.</p>
                    </div>
                    <div className="space-y-3">
                        <h4 className="text-2xl font-semibold leading-relaxed text-emerald-700">30 dias de aplicação</h4>
                        <p className="text-xl leading-relaxed text-slate-700">Siga as 3 regras do PPI. Se não notar pelo menos 3 sinais de progresso — menos fome, mais energia, roupas mais folgadas — é só pedir reembolso.</p>
                    </div>
                </div>

                <p className="text-xl font-semibold leading-relaxed text-slate-700">Sem perguntas. Sem letras miúdas.</p>
            </div>
        </section>
    );
};

