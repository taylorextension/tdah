import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section id="inicio" className="bg-emerald-700 text-white px-6 py-12 md:py-16">
      <div className="mx-auto max-w-3xl space-y-6 md:space-y-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          O Segredo Que Ninguém Te Contou: Como Emagrecer De Verdade Controlando Um Único Hormônio — Não Contando Calorias
        </h1>
        <p className="text-xl md:text-2xl text-emerald-100 leading-relaxed">
          Reprograme seu metabolismo para queimar gordura de forma natural — sem remédios, sem passar fome e sem dietas impossíveis.
        </p>
        <p className="text-xl leading-relaxed font-semibold text-white border-t border-b border-white/25 py-6">
          E se o verdadeiro segredo para emagrecer comendo bem — sem fome, sem loucuras e sem efeito rebote — fosse simplesmente aprender a controlar um único hormônio do seu corpo?
        </p>
        <div className="space-y-2 text-lg md:text-xl text-emerald-100 leading-relaxed">
          <p>Parece simples demais?</p>
          <p>É justamente por isso que funciona.</p>
        </div>
      </div>
    </section>
  );
};
