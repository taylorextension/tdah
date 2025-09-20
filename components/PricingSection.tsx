
import React from 'react';
import { CtaButton } from './CtaButton';
import { CheckCircleIcon } from './icons';

const IncludedItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start space-x-3">
        <CheckCircleIcon className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
        <span className="text-lg text-slate-700">{children}</span>
    </li>
);

export const PricingSection: React.FC = () => {
    return (
        <section id="oferta" className="p-8 md:py-16 bg-emerald-50 text-slate-800">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                
                {/* Left Column: Value Proposition */}
                <div className="md:pr-8">
                    <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">Acesso Completo e Vitalício ao <span className="text-emerald-600">Método PPI</span></h3>
                    <p className="mt-4 text-xl text-slate-600">Tudo o que você precisa para reprogramar seu metabolismo, com acesso a todas as futuras atualizações.</p>
                    
                    <div className="mt-8">
                        <h4 className="font-bold text-2xl text-slate-800 mb-4">O que está incluso:</h4>
                        <ul className="space-y-3">
                            <IncludedItem>Guia completo e direto ao ponto</IncludedItem>
                            <IncludedItem>Cardápio mensal com comida de verdade</IncludedItem>
                            <IncludedItem>Planejamento alimentar simples e flexível</IncludedItem>
                            <IncludedItem>Dicas pra festas, saídas e vida real</IncludedItem>
                            <IncludedItem>Respostas às dúvidas mais comuns</IncludedItem>
                        </ul>
                    </div>
                </div>

                {/* Right Column: Offer */}
                <div>
                    <h4 className="text-left text-lg font-bold text-emerald-600 uppercase tracking-wider">Oferta Especial de Lançamento</h4>
                    
                    <div className="text-left my-6">
                        <div className="flex flex-wrap items-baseline gap-x-2">
                            <span className="text-3xl md:text-4xl text-slate-500 line-through">
                                De R$297
                            </span>
                            <span className="text-5xl md:text-6xl font-bold text-emerald-700">
                                por
                            </span>
                        </div>
                        <div className="-mt-2">
                            <p className="text-6xl md:text-8xl font-extrabold text-emerald-700 tracking-tighter">
                                apenas R$147
                            </p>
                        </div>
                        <p className="mt-2 text-lg text-slate-700">
                            ou em até 12x no cartão
                        </p>
                    </div>
                    
                    <div className="max-w-md mx-auto my-8">
                      <CtaButton href="https://pay.kiwify.com.br/duI4bxH" className="w-full text-lg py-4 leading-tight">
                          SIM, QUERO DESINCHAR E EMAGRECER COM O PPI
                      </CtaButton>
                    </div>

                    <p className="-mt-4 text-center text-base text-slate-700">
                        Pagamento único. Sem mensalidades.
                    </p>

                    <div className="mt-8 pt-6 border-t border-emerald-200">
                         <p className="font-bold text-slate-800 text-left mb-4">Você ainda recebe de bônus:</p>
                         <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <CheckCircleIcon className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-600">E-book com 10 receitas que saciam e emagrecem (inclui sobremesas)</span>
                            </li>
                             <li className="flex items-start space-x-3">
                                <CheckCircleIcon className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-600">Acesso vitalício com todas as futuras atualizações incluídas</span>
                            </li>
                        </ul>
                    </div>
                     <p className="mt-6 text-left text-sm text-slate-500">
                        <strong className="text-slate-700">Garantia total de 7 dias.</strong> Seu risco é absolutamente zero.
                    </p>
                </div>
            </div>
        </section>
    );
};
