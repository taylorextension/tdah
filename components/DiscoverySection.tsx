import React from 'react';
import { CheckCircleIcon } from './icons';
import { CtaButton } from './CtaButton';

const NinjaBullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start space-x-4">
        <CheckCircleIcon className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
        <p className="text-xl text-slate-700">{children}</p>
    </li>
);

export const DiscoverySection: React.FC = () => {
    return (
        <section id="descobertas" className="p-8 md:p-12 bg-emerald-50">
            <div className="max-w-2xl mx-auto">
                <h3 className="text-3xl font-extrabold text-slate-800 mb-8">O que você vai descobrir no PPI:</h3>
                <ul className="space-y-6">
                    <NinjaBullet>O <span className="font-bold text-slate-900">erro matinal</span> que faz sua insulina disparar (e como corrigi-lo em 1 minuto).</NinjaBullet>
                    <NinjaBullet>A <span className="font-bold text-slate-900">ordem secreta</span> dos alimentos no prato que elimina compulsão sem cortar o que você ama.</NinjaBullet>
                    <NinjaBullet>Por que beliscar “só uma coisinha” pode <span className="font-bold text-slate-900">travar seu emagrecimento por 48h.</span></NinjaBullet>
                    <NinjaBullet>Como emagrecer mesmo se você <span className="font-bold text-slate-900">odeia academia</span> (e prefere sofá + Netflix).</NinjaBullet>
                </ul>
                <div className="mt-10 max-w-md mx-auto">
                    <CtaButton href="https://pay.kiwify.com.br/duI4bxH" className="text-lg py-4 leading-tight">
                        SIM, QUERO DESINCHAR E EMAGRECER COM O PPI
                    </CtaButton>
                </div>
            </div>
        </section>
    );
};