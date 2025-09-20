import React from 'react';
import { XCircleIcon } from './icons';

const FrustrationItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start space-x-3">
        <XCircleIcon className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
        <span className="text-slate-700 leading-relaxed">{children}</span>
    </li>
);

export const ProblemSection: React.FC = () => {
    return (
        <section id="o-problema" className="bg-slate-50 px-6 py-12 md:py-16">
            <div className="mx-auto max-w-2xl space-y-6 md:space-y-8">
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Quantas vezes você já tentou de tudo para emagrecer?</h3>
                <p className="text-xl leading-relaxed text-slate-700">Só pra terminar cansada, frustrada e no mesmo lugar?</p>

                <div className="space-y-4">
                    <ul className="space-y-4 text-lg leading-relaxed">
                        <FrustrationItem>Cortou pão e açúcar</FrustrationItem>
                        <FrustrationItem>Viveu de salada e frango seco</FrustrationItem>
                        <FrustrationItem>Fez jejum na força do ódio</FrustrationItem>
                        <FrustrationItem>Contou calorias até enlouquecer</FrustrationItem>
                        <FrustrationItem>Tentou seguir cardápios impossíveis</FrustrationItem>
                    </ul>
                </div>
                <p className="text-2xl leading-relaxed font-bold text-red-600 py-4 border-y-2 border-red-200">E no fim nada funcionou por muito tempo.</p>

                <div className="space-y-4 rounded-lg border-l-4 border-red-400 bg-red-50 p-6">
                    <h4 className="text-2xl font-semibold text-red-800">E se nada mudar?</h4>
                    <p className="text-lg leading-relaxed text-slate-700">Imagine como vai ser daqui a 6 meses.</p>
                    <div className="space-y-2 text-lg leading-relaxed text-slate-700">
                        <p>Você abre o armário e evita suas roupas favoritas — ainda apertadas.</p>
                        <p>Evita espelhos. Fotos. Piscina.</p>
                        <p>Se sente pesada, inchada, sem energia até para brincar com seus filhos ou curtir o dia.</p>
                    </div>
                    <div className="space-y-2 text-lg leading-relaxed text-slate-700">
                        <p><span className="font-semibold text-red-700">A verdade?</span> Ignorar isso não resolve.</p>
                        <p>Só piora.</p>
                    </div>
                </div>

                <div className="space-y-3 text-xl leading-relaxed text-slate-700">
                    <p><span className="font-bold">Mas não é sua culpa.</span></p>
                    <p>Você só foi ensinada a lutar a guerra errada.</p>
                </div>
            </div>
        </section>
    );
};
