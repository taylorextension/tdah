import React from 'react';
import { CheckCircleIcon } from './icons';

const NinjaBullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start space-x-4">
        <CheckCircleIcon className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
        <p className="text-xl leading-relaxed text-slate-700">{children}</p>
    </li>
);

export const DiscoverySection: React.FC = () => {
    return (
        <section id="descobertas" className="bg-emerald-50 px-6 py-12 md:py-16">
            <div className="mx-auto max-w-2xl space-y-8">
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">O que você vai aprender dentro do PPI:</h3>
                <ul className="space-y-6 text-xl leading-relaxed text-slate-700">
                    <NinjaBullet>O erro matinal que dispara sua insulina (e como resolver em 1 minuto).</NinjaBullet>
                    <NinjaBullet>A ordem dos alimentos que elimina compulsão sem cortar o que você ama.</NinjaBullet>
                    <NinjaBullet>Por que só uma mordida pode travar seu emagrecimento por até 48h.</NinjaBullet>
                    <NinjaBullet>Como emagrecer mesmo odiando academia (sim, sofá + Netflix é permitido).</NinjaBullet>
                </ul>
            </div>
        </section>
    );
};

