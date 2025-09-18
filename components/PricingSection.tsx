
import React from 'react';
import { CtaButton } from './CtaButton';
import { CheckCircleIcon } from './icons';

export const PricingSection: React.FC = () => {
    return (
        <section id="oferta" className="p-8 md:p-12 bg-emerald-700 text-slate-800">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
                <h3 className="text-2xl font-bold text-emerald-600 uppercase tracking-wider">Oferta Especial — Acesso Vitalício ao PPI</h3>
                <p className="text-xl mt-4 text-slate-700 font-semibold">Emagreça comendo bem, sem cortar o que você ama, e sem depender de remédio</p>

                <div className="my-8">
                    <p className="text-slate-500">R$ <span className="text-7xl font-extrabold text-slate-900">147</span> à vista</p>
                    <p className="text-slate-500 mt-1 text-lg">Ou parcele em até 12x no cartão</p>
                </div>
                
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-6 rounded-lg my-8">
                    <p className="font-bold text-lg mb-4">Garantindo Hoje Você Leva de Bônus:</p>
                    <ul className="space-y-3">
                        <li className="flex items-start space-x-3">
                            <CheckCircleIcon className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>E-book exclusivo com 10 receitas que saciam e ajudam a emagrecer (inclui sobremesas)</span>
                        </li>
                         <li className="flex items-start space-x-3">
                            <CheckCircleIcon className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>Acesso vitalício com todas as atualizações futuras incluídas</span>
                        </li>
                    </ul>
                </div>
                
                <div className="max-w-md">
                    <CtaButton href="https://pay.kiwify.com.br/duI4bxH">
                        COMEÇAR AGORA
                    </CtaButton>
                </div>

                <div className="mt-8 text-slate-500">
                    <p className="font-bold text-lg">Garantia total de 7 dias</p>
                    <p className="text-sm text-slate-600">se não gostar, seu dinheiro de volta. Sem perguntas. Sem letras miúdas.</p>
                </div>
            </div>
        </section>
    );
};
