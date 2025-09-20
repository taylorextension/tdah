import React from 'react';
import { CheckCircleIcon } from './icons';

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start space-x-3">
        <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
        <span className="leading-relaxed text-slate-700">{children}</span>
    </li>
);

const TestimonialCard: React.FC<{ quote: string; author: string; location: string }> = ({ quote, author, location }) => (
    <blockquote className="space-y-4 rounded-r-lg border-l-4 border-emerald-500 bg-slate-100 p-6">
        <p className="text-xl leading-relaxed text-slate-700 italic">“{quote}”</p>
        <p className="text-lg font-semibold text-slate-900">— {author}, <span className="font-normal text-slate-500">{location}</span></p>
    </blockquote>
);


export const OfferSection: React.FC = () => {
    return (
        <section id="o-que-voce-recebe" className="bg-white px-6 py-12 md:py-16">
            <div className="mx-auto max-w-2xl space-y-10">
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">O que você recebe com o acesso ao PPI:</h3>
                <ul className="space-y-4 text-xl leading-relaxed text-slate-700">
                    <ListItem>Guia completo, direto ao ponto</ListItem>
                    <ListItem>Cardápio mensal com comida de verdade</ListItem>
                    <ListItem>Planejamento alimentar flexível</ListItem>
                    <ListItem>Dicas para festas, viagens e vida real</ListItem>
                    <ListItem>Respostas para todas as dúvidas comuns</ListItem>
                </ul>

                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Por que o PPI é diferente?</h3>
                <ul className="grid grid-cols-1 gap-4 text-xl leading-relaxed text-slate-700">
                    <ListItem>Você emagrece comendo comida gostosa</ListItem>
                    <ListItem>Nada de contar calorias ou passar fome</ListItem>
                    <ListItem>Pode tomar café com açúcar — do jeito certo</ListItem>
                    <ListItem>Foco em resultados, não em sacrifício</ListItem>
                    <ListItem>Funciona com ou sem academia</ListItem>
                    <ListItem>Cabe na sua rotina (e na da sua família)</ListItem>
                </ul>

                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Resultados visíveis:</h3>
                <ul className="space-y-4 text-xl leading-relaxed text-slate-700">
                    <ListItem>Perda de até 3kg por semana</ListItem>
                    <ListItem>Barriga desinchando em poucos dias</ListItem>
                    <ListItem>Rosto afinando</ListItem>
                    <ListItem>Fome sob controle</ListItem>
                    <ListItem>Energia de volta</ListItem>
                    <ListItem>Autoestima lá em cima</ListItem>
                </ul>

                 <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">O que nossas alunas dizem:</h3>
                 <div className="space-y-6">
                    <TestimonialCard 
                        quote="Eu era a pessoa mais cética do mundo. Já tinha tentado de tudo depois dos 40 e nada funcionava. Em 3 semanas com o PPI, não só a barriga sumiu, como meu rosto afinou. Tive que admitir: isso aqui é diferente."
                        author="Daniela P."
                        location="Juiz de Fora – MG"
                    />
                     <TestimonialCard 
                        quote="Minha rotina é uma loucura e eu sabia que não ia conseguir seguir 100%. Teve festa, teve viagem. E o mais incrível é que, mesmo não sendo perfeita, eu perdi medidas e a compulsão por doce diminuiu 80%. O PPI funciona na vida real."
                        author="Renata S."
                        location="São Paulo – SP"
                    />
                     <TestimonialCard 
                        quote="A maior mudança para mim foi no mercado. Eu entrava e parecia um zumbi, querendo levar tudo. Hoje, passo pelas prateleiras de porcarias e nem sinto vontade. É uma liberdade que eu não achei que fosse possível."
                        author="Adriana V."
                        location="Fortaleza – CE"
                    />
                     <TestimonialCard 
                        quote="Sempre fui aquela pessoa que dizia: meu metabolismo é lento. Em menos de duas semanas com o PPI, minhas roupas começaram a folgar e minha disposição voltou. Pela primeira vez, eu senti que estava no caminho certo."
                        author="Luciana T."
                        location="Belo Horizonte – MG"
                    />
                     <TestimonialCard 
                        quote="O mais louco é que eu não sinto que estou de dieta. Eu como bem, fico satisfeita e, mesmo assim, continuo emagrecendo. É uma paz saber que finalmente encontrei algo sustentável."
                        author="Fernanda M."
                        location="Curitiba – PR"
                    />
                     <TestimonialCard 
                        quote="Tentei tantas coisas que já tinha desistido. Mas o PPI foi diferente. Emagreci 4kg no primeiro mês e, o mais importante, parei de me sabotar. Eu voltei a confiar em mim."
                        author="Carla D."
                        location="Recife – PE"
                    />
                 </div>
            </div>
        </section>
    );
};


