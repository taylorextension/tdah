import React from 'react';
import { CtaButton } from './CtaButton';

const Step: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 text-white text-2xl font-bold rounded-full flex items-center justify-center">
            {number}
        </div>
        <div>
            <h4 className="text-2xl font-semibold leading-relaxed text-slate-900">{title}</h4>
            <div className="space-y-3 text-xl leading-relaxed text-slate-700">{children}</div>
        </div>
    </div>
);

export const MethodSection: React.FC = () => {
    return (
        <section id="o-metodo" className="bg-slate-50 px-6 py-12 md:py-16">
            <div className="mx-auto max-w-2xl space-y-10">
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Como Funciona o PPI?</h3>
                <p className="text-xl leading-relaxed text-slate-700">Nada de contar calorias. Só <span className="font-semibold">3 regras simples</span> que funcionam na vida real.</p>

                <div className="space-y-10">
                    <Step number="1" title="Regra #1: Espere a fome de verdade">
                        <p>Ao acordar, hidrate-se, movimente-se rápido e <span className="font-semibold">só coma quando a fome REAL aparecer.</span></p>
                        <p>Não é sobre forçar jejum. É sobre respeitar o corpo.</p>
                    </Step>
                    <Step number="2" title="Regra #2: Monte o prato na ordem certa">
                        <p className="font-semibold">Siga essa sequência:</p>
                        <ol className="list-decimal list-inside space-y-1 pl-2 text-xl leading-relaxed text-slate-700 font-semibold">
                            <li>Proteína primeiro</li>
                            <li>Gordura natural em seguida</li>
                            <li>Vegetais depois</li>
                            <li>Carboidratos por último (se quiser)</li>
                        </ol>
                        <p><span className="font-semibold">Exemplo prático:</span> 250g de frango + 1 colher de azeite + brócolis + 1/2 xícara de batata.</p>
                        <p>Essa ordem suaviza os picos de insulina, aumenta a saciedade e reduz a compulsão.</p>
                        <p className="text-base italic text-slate-500">Ver opções completas no guia (rola para a seção de oferta).</p>
                    </Step>
                    <Step number="3" title="Regra #3: Pare de beliscar entre refeições">
                       <p>Cada mordida fora de hora dispara um novo sinal para guardar gordura.</p>
                       <p>Dê espaço. O corpo responde — e rápido.</p>
                    </Step>
                </div>

                <div className="space-y-2">
                    <p className="text-2xl font-semibold leading-relaxed text-emerald-700">Esse é o segredo.</p>
                    <p className="text-xl leading-relaxed text-slate-700">Não é mágica. É biologia.</p>
                </div>

                <div className="max-w-md">
                    <CtaButton href="https://pay.kiwify.com.br/duI4bxH" className="w-full text-lg py-4 leading-tight">
                        SIM, QUERO DESINCHAR E EMAGRECER COM O PPI
                    </CtaButton>
                </div>
            </div>
        </section>
    );
};



