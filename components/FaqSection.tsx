import React, { useState } from 'react';
import { ChevronDownIcon } from './icons';

interface FAQItemProps {
  question: string;
  children: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`bg-white rounded-lg shadow-sm transition-all duration-300 ease-in-out ${isOpen ? 'shadow-md' : ''}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-left p-6"
                aria-expanded={isOpen}
            >
                <h4 className="text-xl font-semibold leading-relaxed text-slate-900 pr-4">{question}</h4>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    <ChevronDownIcon className={`h-5 w-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>
            <div
                style={{
                    maxHeight: isOpen ? '1000px' : '0px',
                    transition: 'max-height 0.5s ease-in-out',
                }}
                className="overflow-hidden"
            >
                <div className="px-6 pb-6 text-xl leading-relaxed text-slate-700 space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

export const FaqSection: React.FC = () => {
    return (
        <section id="faq" className="bg-slate-50 px-6 py-12 md:py-16">
            <div className="mx-auto max-w-2xl space-y-8">
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Dúvidas Frequentes</h3>
                <div className="space-y-4">
                    <FAQItem question="Preciso cortar pão, arroz ou café?">
                        <p>Não. O PPI mostra como encaixar esses alimentos de forma inteligente, sem terrorismo nutricional. O foco é entender quando e como comer para não travar o emagrecimento.</p>
                    </FAQItem>
                    <FAQItem question="Funciona depois dos 40?">
                        <p>Sim. O método foi pensado especialmente para quem sente o metabolismo mais lento e já tentou de tudo. Ao regular os hormônios, especialmente a insulina, o corpo responde em qualquer idade.</p>
                    </FAQItem>
                    <FAQItem question="Preciso malhar?">
                        <p>Não. Exercício é ótimo para acelerar resultados, mas o PPI foca na alimentação e no controle da insulina. Mesmo quem não gosta ou não pode malhar vê mudanças visíveis.</p>
                    </FAQItem>
                    <FAQItem question="É jejum radical?">
                        <p>De jeito nenhum. Você aprende a respeitar a fome real e a espaçar as refeições com o prato certo. O resultado é ficar saciada por horas — o jejum acontece naturalmente, sem sofrimento.</p>
                    </FAQItem>
                    <FAQItem question="Serve pra quem tem diabetes ou pressão alta?">
                        <p>Sim, e pode ajudar com acompanhamento médico. O controle da insulina é fundamental nesses casos. O método é baseado em comida de verdade, sem remédios ou extremos.</p>
                    </FAQItem>
                    <FAQItem question="Funciona pra toda a família?">
                        <p>Sim. O PPI usa comida simples e nutritiva que todo mundo pode comer. Dá para ajustar porções, adaptar sabores e envolver a família inteira.</p>
                    </FAQItem>
                    <FAQItem question="Quando vejo resultados?">
                        <p>Muitas alunas relatam mais energia e menos inchaço nos primeiros dias. Roupas folgando costumam aparecer na primeira semana — sem sofrimento.</p>
                    </FAQItem>
                </div>
            </div>
        </section>
    );
};

