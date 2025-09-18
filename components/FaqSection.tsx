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
                className="w-full flex justify-between items-center text-left p-6"
                aria-expanded={isOpen}
            >
                <h4 className="text-lg font-semibold text-slate-800 pr-4">{question}</h4>
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
                <div className="px-6 pb-6 text-slate-600 text-base">
                    {children}
                </div>
            </div>
        </div>
    );
}

export const FaqSection: React.FC = () => {
    return (
        <section id="faq" className="p-8 md:p-12 bg-slate-50">
            <div className="max-w-2xl mx-auto">
                <h3 className="text-3xl font-extrabold text-slate-800 mb-8">Perguntas Frequentes</h3>
                <div className="space-y-4">
                    <FAQItem question="Preciso cortar pão, arroz ou café pra sempre?">
                        <p>Não. O PPI te ensina a encaixar esses alimentos na sua rotina sem travar o emagrecimento. Você aprende o que comer, quando comer e em que ordem — sem terrorismo nutricional.</p>
                    </FAQItem>
                     <FAQItem question="Funciona sem exercício?">
                        <p>Sim. A base do PPI é a alimentação para regular a insulina. O exercício é um bônus incrível para acelerar resultados e para a saúde, mas o método funciona mesmo para quem não pode ou não gosta de malhar.</p>
                    </FAQItem>
                    <FAQItem question="É jejum radical?">
                        <p>Não. Você não passa fome. O que o PPI ensina é a dar espaço entre as refeições para que a insulina baixe. Com o prato montado do jeito certo, você fica saciada por mais tempo e não sente necessidade de beliscar.</p>
                    </FAQItem>
                     <FAQItem question="Serve pra quem tem diabetes ou pressão alta?">
                        <p>Sim! Controlar a insulina é fundamental para quem tem diabetes tipo 2, pré-diabetes ou resistência à insulina. Muitos usuários relatam melhora nos exames e na pressão. De qualquer forma, sempre consulte seu médico antes de iniciar.</p>
                    </FAQItem>
                     <FAQItem question="Funciona pra toda a família?">
                        <p>Com certeza. Os princípios do PPI são sobre comer comida de verdade de forma inteligente. É um estilo de vida saudável que beneficia crianças, adultos e idosos, ajustando as porções para cada um.</p>
                    </FAQItem>
                    <FAQItem question="Quando começo a ver resultado?">
                        <p>Muitas pessoas relatam sentir a barriga desinchar e mais energia já nos primeiros 3 a 5 dias. A perda de peso visível costuma aparecer na primeira ou segunda semana.</p>
                    </FAQItem>
                     <FAQItem question="Tem risco?">
                        <p>O PPI é baseado em comida de verdade e princípios científicos seguros. Não há uso de remédios ou práticas extremas. É um método natural e seguro para a grande maioria das pessoas.</p>
                    </FAQItem>
                </div>
            </div>
        </section>
    );
};
