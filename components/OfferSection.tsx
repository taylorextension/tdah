import React from 'react';
import { CheckCircleIcon } from './icons';

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start space-x-3">
        <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
        <span className="text-slate-600">{children}</span>
    </li>
);

const TestimonialCard: React.FC<{ quote: string; author: string; location: string }> = ({ quote, author, location }) => (
    <blockquote className="p-6 bg-slate-100 border-l-4 border-emerald-500 rounded-r-lg">
        <p className="text-slate-700 italic text-lg">“{quote}”</p>
        <p className="mt-4 font-bold text-slate-800 text-left">— {author}, <span className="font-normal text-slate-500">{location}</span></p>
    </blockquote>
);


export const OfferSection: React.FC = () => {
    return (
        <section id="o-que-voce-recebe" className="p-8 md:p-12 bg-white">
            <div className="max-w-2xl mx-auto">
                <h3 className="text-3xl font-extrabold text-slate-800 mb-6">O que você recebe ao acessar o PPI:</h3>
                <ul className="space-y-4 text-lg">
                    <ListItem>Guia completo e direto ao ponto</ListItem>
                    <ListItem>Cardápio mensal com comida de verdade</ListItem>
                    <ListItem>Planejamento alimentar simples e flexível</ListItem>
                    <ListItem>Dicas pra festas, saídas e vida real</ListItem>
                    <ListItem>Respostas às dúvidas mais comuns</ListItem>
                </ul>

                <h3 className="text-3xl font-extrabold text-slate-800 my-10">Por que o PPI é diferente?</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-lg">
                    <ListItem>Emagreça comendo comida gostosa</ListItem>
                    <ListItem>Esqueça contar caloria ou passar fome</ListItem>
                    <ListItem>Café com açúcar? Pode — do jeito certo</ListItem>
                    <ListItem>Foco em resultado, não em sacrifício</ListItem>
                    <ListItem>Funciona com ou sem academia</ListItem>
                    <ListItem>Cabe na sua rotina (e na da sua família)</ListItem>
                </ul>

                <h3 className="text-3xl font-extrabold text-slate-800 my-10">Resultados visíveis:</h3>
                <ul className="space-y-4 text-lg">
                    <ListItem>Perda de até 3kg por semana</ListItem>
                    <ListItem>Barriga desinchando em poucos dias</ListItem>
                    <ListItem>Rosto afinando</ListItem>
                    <ListItem>Fome sob controle</ListItem>
                    <ListItem>Energia de volta</ListItem>
                    <ListItem>Autoestima em alta</ListItem>
                </ul>

                 <h3 className="text-3xl font-extrabold text-slate-800 my-10">Depoimentos reais:</h3>
                 <div className="space-y-6">
                    <TestimonialCard 
                        quote="Em 3 semanas já vi a barriga sumir e meu rosto afinar. Achei que era impossível emagrecer depois dos 40. Estava errada."
                        author="Daniela"
                        location="Juiz de Fora – MG"
                    />
                     <TestimonialCard 
                        quote="Achava que era fraca por sentir fome o dia inteiro. Era só insulina desregulada. Hoje eu como de verdade, fico saciada, e ainda estou emagrecendo."
                        author="Renata"
                        location="São Paulo – SP"
                    />
                     <TestimonialCard 
                        quote="Não tenho mais compulsão no mercado. Antes, eu queria trazer o mundo. Agora eu passo pelas prateleiras de doce e nem sinto falta."
                        author="Adriana"
                        location="Fortaleza – CE"
                    />
                 </div>
            </div>
        </section>
    );
};
