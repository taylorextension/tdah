import React from 'react';
import { CtaButton } from './CtaButton';

export const FinalCtaSection: React.FC = () => {
    return (
        <section className="bg-white px-6 py-12 md:py-16">
            <div className="mx-auto max-w-2xl space-y-8">
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Pronta Para Parar de Brigar Com a Comida?</h3>
                <div className="text-xl leading-relaxed text-slate-700 space-y-2">
                    <p>Você não precisa de mais uma dieta.</p>
                    <p>Precisa de um corpo que funcione como deveria.</p>
                    <p>Com menos culpa e mais leveza no espelho e na mente.</p>
                </div>

                <p className="text-2xl font-semibold leading-relaxed text-emerald-700">Seu novo corpo começa na próxima refeição.</p>

                <p className="text-xl leading-relaxed text-slate-700">👇 Clique no botão abaixo e comece agora:</p>

                <div className="max-w-md">
                    <CtaButton href="https://pay.kiwify.com.br/duI4bxH" className="text-lg py-4 leading-tight font-semibold">
                        SIM, QUERO DESINCHAR E EMAGRECER COM O PPI
                    </CtaButton>
                </div>
            </div>
        </section>
    );
};

