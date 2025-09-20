import React from 'react';
import { XCircleIcon } from './icons';

const FrustrationItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start space-x-3">
        <XCircleIcon className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
        <span className="text-slate-600">{children}</span>
    </li>
);

export const ProblemSection: React.FC = () => {
    return (
        <section id="o-problema" className="p-8 md:p-12 bg-slate-50">
            <div className="max-w-2xl mx-auto">
                <p className="text-lg text-slate-700 mb-6">Parece simples demais, né? Mas é por isso que funciona.</p>
                <h3 className="text-3xl font-bold text-slate-800 mb-4 leading-snug">Quantas vezes você começou uma dieta achando que finalmente ia emagrecer…</h3>
                <p className="text-lg text-slate-600 mb-8">Só pra acabar frustrada, com mais fome, menos energia, e o mesmo corpo?</p>
                
                <h4 className="text-xl font-semibold text-slate-800 mb-4">Você já:</h4>
                <ul className="space-y-4 mb-8 text-lg">
                    <FrustrationItem>tentou cortar pão e açúcar,</FrustrationItem>
                    <FrustrationItem>viveu de salada e frango seco,</FrustrationItem>
                    <FrustrationItem>fez jejum intermitente na força do ódio,</FrustrationItem>
                    <FrustrationItem>contou calorias,</FrustrationItem>
                    <FrustrationItem>tentou seguir um cardápio impossível,</FrustrationItem>
                </ul>
                <p className="text-2xl font-bold text-red-600 my-8 py-4 border-y-2 border-red-200">e no fim… nada funcionou por muito tempo.</p>

                <div className="my-12 p-6 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <h4 className="text-xl font-bold text-red-800">E se nada mudar?</h4>
                    <p className="mt-2 text-slate-700 text-lg">Imagine daqui a um ano. As mesmas roupas apertadas no armário. A mesma frustração ao se olhar no espelho, evitando fotos. A energia cada vez mais baixa, te impedindo de brincar com seus filhos ou de ter disposição para seus projetos.</p>
                    <p className="mt-2 text-slate-700 text-lg font-semibold">A verdade é que ignorar o problema só o torna maior.</p>
                </div>

                <div className="mt-8 text-lg text-slate-700 space-y-2">
                    <p>Se isso soa familiar, <span className="font-bold">a culpa não é sua.</span> Não é falta de esforço ou força de vontade.</p>
                    <p>É que te ensinaram a lutar a guerra errada. Te fizeram focar em calorias, quando o verdadeiro inimigo era outro.</p>
                </div>
            </div>
        </section>
    );
};
