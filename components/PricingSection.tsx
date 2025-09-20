import React from 'react';
import { CtaButton } from './CtaButton';
import { CheckCircleIcon } from './icons';

const IncludedItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start space-x-3">
        <CheckCircleIcon className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
        <span className="leading-relaxed text-slate-700">{children}</span>
    </li>
);

export const PricingSection: React.FC = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const launchDeadline = tomorrow.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <section id="oferta" className="bg-emerald-50 px-6 py-12 md:py-16 text-slate-800">
            <div className="mx-auto max-w-5xl grid grid-cols-1 gap-12 items-start">
                
                {/* Left Column: Value Proposition */}
                <div className="md:pr-8 space-y-6">
                    <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">Acesso Completo e Vitalício ao <span className="text-emerald-600">Método PPI</span></h3>
                    <p className="text-xl leading-relaxed text-slate-700">Tudo o que você precisa para reprogramar seu metabolismo, com acesso a todas as futuras atualizações.</p>
                    
                    <div className="space-y-4">
                        <h4 className="text-2xl font-semibold leading-relaxed text-slate-900">O que está incluso:</h4>
                        <ul className="space-y-3 text-xl leading-relaxed text-slate-700">
                            <IncludedItem>Guia completo e direto ao ponto</IncludedItem>
                            <IncludedItem>Cardápio mensal com comida de verdade</IncludedItem>
                            <IncludedItem>Planejamento alimentar simples e flexível</IncludedItem>
                            <IncludedItem>Dicas para festas, saídas e vida real</IncludedItem>
                            <IncludedItem>Respostas às dúvidas mais comuns</IncludedItem>
                        </ul>
                    </div>
                </div>

                {/* Right Column: Offer */}
                <div className="space-y-8">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                        Oferta Especial de Lançamento — Só até {launchDeadline}
                    </h4>
                    
                    <div className="space-y-4 text-left">
                        <div className="flex flex-wrap items-baseline gap-x-3">
                            <span className="text-3xl md:text-4xl text-slate-500 line-through">De R$297</span>
                            <span className="text-5xl md:text-6xl font-bold leading-tight text-emerald-700">por apenas</span>
                        </div>
                        <p className="text-6xl md:text-8xl font-extrabold tracking-tight leading-tight text-emerald-700">
                            R$147
                        </p>
                        <p className="text-xl leading-relaxed text-slate-700">Ou em até 12x no cartão.</p>
                    </div>
                    
                    <div className="max-w-md mx-auto">
                      <CtaButton href="https://pay.kiwify.com.br/duI4bxH" className="w-full text-lg py-4 leading-tight">
                          SIM, QUERO DESINCHAR E EMAGRECER COM O PPI
                      </CtaButton>
                    </div>

                    <p className="text-center text-base leading-relaxed text-slate-700">Pagamento único — sem mensalidades.</p>

                    <div className="space-y-4 border-t border-emerald-200 pt-6">
                         <p className="text-xl font-semibold leading-relaxed text-slate-900">Bônus exclusivos:</p>
                         <ul className="space-y-3 text-xl leading-relaxed text-slate-700">
                            <li className="flex items-start space-x-3">
                                <CheckCircleIcon className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span className="leading-relaxed text-slate-700">E-book com 10 receitas que saciam e emagrecem (inclui sobremesas!)</span>
                            </li>
                             <li className="flex items-start space-x-3">
                                <CheckCircleIcon className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span className="leading-relaxed text-slate-700">Acesso vitalício com todas as futuras atualizações incluídas</span>
                            </li>
                             <li className="flex items-start space-x-3">
                                <CheckCircleIcon className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span className="leading-relaxed text-slate-700">Garantia dupla — sem risco para você</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};













