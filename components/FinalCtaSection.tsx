
import React from 'react';
import { CtaButton } from './CtaButton';

export const FinalCtaSection: React.FC = () => {
    return (
        <section className="p-8 md:p-12 bg-white">
            <div className="max-w-2xl mx-auto">
                <h3 className="text-4xl font-extrabold text-slate-800 leading-tight">Pronta Pra Parar de Brigar Com a Comida?</h3>
                <div className="text-lg text-slate-600 mt-6 space-y-2">
                    <p>Você não precisa de mais uma dieta.</p>
                    <p>Precisa de um corpo funcionando como deveria.</p>
                    <p>Com menos culpa e mais leveza — no espelho e na mente.</p>
                </div>
                
                <p className="text-2xl font-bold text-emerald-700 mt-8">Seu novo corpo começa na próxima refeição.</p>
                
                <p className="text-lg text-slate-600 my-8">Clique abaixo e destrave o seu metabolismo com o PPI:</p>

                <div className="max-w-md">
                    <CtaButton href="https://pay.kiwify.com.br/duI4bxH" className="text-lg py-4 leading-tight">
                        SIM, QUERO DESINCHAR E EMAGRECER COM O PPI
                    </CtaButton>
                </div>
            </div>
        </section>
    );
};