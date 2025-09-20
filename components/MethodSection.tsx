import React from 'react';

const Step: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 text-white text-2xl font-bold rounded-full flex items-center justify-center">
            {number}
        </div>
        <div>
            <h4 className="text-xl font-bold text-slate-800">{title}</h4>
            <div className="mt-1 text-slate-600 text-lg space-y-3">{children}</div>
        </div>
    </div>
);

export const MethodSection: React.FC = () => {
    return (
        <section id="o-metodo" className="bg-slate-50 p-8 md:p-12">
            <div className="max-w-2xl mx-auto">
                <h3 className="text-3xl font-bold text-slate-800 mb-4">Como Funciona o PPI</h3>
                <p className="text-xl text-slate-600 mb-10">Nada de contar caloria. Só 3 regras simples — que cabem na vida real.</p>

                <div className="space-y-8">
                    <Step number="1" title="Espere a fome de verdade">
                        <p>Ao acordar, hidrate-se, movimente-se, e espere o sinal de fome real.</p>
                        <p>Não precisa forçar jejum. Só não precisa comer sem estar com fome.</p>
                    </Step>
                    <Step number="2" title="Monte o prato na ordem certa">
                        <p>A sequência que muda tudo:</p>
                        <ol className="list-decimal list-inside space-y-1 font-semibold text-slate-700 pl-2">
                            <li>Proteína primeiro</li>
                            <li>Gordura natural em seguida</li>
                            <li>Vegetais depois</li>
                            <li>Carboidratos por último (se quiser)</li>
                        </ol>
                        <p>Essa simples ordem suaviza o pico de insulina, aumenta a saciedade e reduz a compulsão.</p>
                    </Step>
                    <Step number="3" title="Pare de beliscar entre as refeições">
                       <p>Cada mordida fora de hora manda um novo sinal de armazenamento pro seu corpo.</p>
                       <p>Quando você dá espaço, o corpo responde.</p>
                       <p>Simples assim.</p>
                    </Step>
                </div>

                <div className="my-12">
                    <p className="text-2xl font-bold text-emerald-700">Esse é o segredo.</p>
                    <p className="text-xl text-slate-600 mt-1">Não é mágica. É biologia.</p>
                </div>
            </div>
        </section>
    );
};
