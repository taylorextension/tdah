import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section id="inicio" className="bg-emerald-700 text-white p-8 md:p-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">Emagreça com comida de verdade.</h1>
        <p className="text-lg md:text-xl text-emerald-100 max-w-2xl">Sem contar calorias, sem remédios e sem passar fome.</p>
        <p className="mt-10 text-lg md:text-xl font-medium text-white border-t border-b border-white/20 py-6">
          E se o verdadeiro segredo pra emagrecer comendo bem — sem fome, sem loucuras e sem efeito rebote — fosse simplesmente aprender a controlar um único hormônio do seu corpo?
        </p>
      </div>
    </section>
  );
};