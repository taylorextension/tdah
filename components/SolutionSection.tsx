import React from 'react';
import { CheckCircleIcon, XCircleIcon } from './icons';

export const SolutionSection: React.FC = () => {
  return (
    <section id="a-solucao" className="bg-white px-6 py-12 md:py-16 space-y-12">
        <div className="mx-auto max-w-2xl space-y-8">
            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Fizeram você focar nas calorias quando o verdadeiro inimigo era outro.</h3>
            <p className="text-xl leading-relaxed text-slate-700">Durante anos, disseram:</p>
            <blockquote className="space-y-2 border-l-4 border-slate-300 pl-6 text-lg italic text-slate-500 leading-relaxed">
                <p>“Tem que comer de 3 em 3 horas.”</p>
                <p>“Café da manhã é a refeição mais importante.”</p>
                <p>“Gordura engorda.”</p>
                <p>“É só comer menos e se exercitar mais.”</p>
            </blockquote>
            <p className="text-xl leading-relaxed text-slate-700">Mas… <span className="font-semibold">e se tudo isso estiver errado?</span></p>
            <p className="text-xl leading-relaxed text-slate-700">A verdade é dura: seguir essas regras é justamente o que desacelera o seu metabolismo.</p>
            <p className="text-xl leading-relaxed text-slate-700">Enquanto isso, a ciência avançava e mostrava um caminho oposto.</p>
        </div>

        <div className="bg-emerald-50 py-12">
            <div className="mx-auto max-w-2xl px-6 space-y-4">
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-emerald-800">Foi aí que nasceu o PPI: Protocolo da Pirâmide Invertida.</h3>
                <p className="text-xl leading-relaxed text-emerald-900">Enquanto te empurravam a antiga pirâmide alimentar que adoece e engorda, pesquisadores descobriram que o verdadeiro segredo está na <span className="font-bold">Pirâmide INVERTIDA</span>.</p>
                <p className="text-xl leading-relaxed text-emerald-900">E a culpa nunca foi sua. Você só estava usando a estratégia errada.</p>
            </div>
        </div>

        <div className="mx-auto max-w-2xl space-y-8">
            <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Essa é a conclusão do Dr. Ben Bikman.</h3>
                <p className="text-xl leading-relaxed text-slate-700">PhD em fisiologia, pesquisador da Brigham Young University (EUA) e referência mundial no estudo do metabolismo.</p>
                <p className="text-xl leading-relaxed text-slate-700">Depois de anos de estudos, ele chegou a uma resposta que muda tudo:</p>
            </div>

            <div className="space-y-2">
                <p className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-slate-500">Não é sobre calorias.</p>
                <p className="text-5xl md:text-7xl font-extrabold tracking-tight text-emerald-700">É sobre INSULINA.</p>
            </div>

            <p className="text-xl leading-relaxed text-slate-700">A insulina é o hormônio que decide se o seu corpo vai <span className="font-bold">guardar gordura… ou queimar gordura.</span></p>
            <div className="space-y-2 text-xl leading-relaxed text-slate-700">
                <p><span className="font-semibold text-red-600">Quando está alta</span>, você acumula.</p>
                <p><span className="font-semibold text-green-600">Quando está baixa</span>, você queima.</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-3xl font-extrabold tracking-tight text-slate-900">E o que desregula sua insulina no dia a dia?</h3>
                <ul className="space-y-3 text-lg leading-relaxed text-slate-700">
                    <li className="flex items-start space-x-3"><XCircleIcon className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" /><span>Acordar e comer direto</span></li>
                    <li className="flex items-start space-x-3"><XCircleIcon className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" /><span>Beliscar o tempo todo</span></li>
                    <li className="flex items-start space-x-3"><XCircleIcon className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" /><span>Café com açúcar e sem proteína</span></li>
                    <li className="flex items-start space-x-3"><XCircleIcon className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" /><span>Refeições ricas em carboidrato e pobres em proteína e gordura boa</span></li>
                </ul>
            </div>

            <div className="space-y-3 text-xl leading-relaxed text-slate-700">
                <p><span className="font-semibold">O resultado?</span></p>
                <p>Você sente fome o tempo inteiro. Come mais do que deveria. Fica inchada, cansada, sem energia.</p>
                <p>E nada parece funcionar.</p>
            </div>

            <div className="space-y-4 rounded-lg border-l-4 border-emerald-400 bg-emerald-50 p-6">
                <h3 className="text-3xl font-extrabold tracking-tight text-emerald-800">Mas quando você aprende a regular sua insulina, tudo muda.</h3>
                <ul className="space-y-3 text-lg leading-relaxed text-slate-700">
                    <li className="flex items-start space-x-3"><CheckCircleIcon className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" /><span>A fome constante desaparece.</span></li>
                    <li className="flex items-start space-x-3"><CheckCircleIcon className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" /><span>Você come bem e se sente satisfeita por horas.</span></li>
                    <li className="flex items-start space-x-3"><CheckCircleIcon className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" /><span>A barriga desincha e a roupa fica folgada.</span></li>
                    <li className="flex items-start space-x-3"><CheckCircleIcon className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" /><span>A energia volta — do acordar ao dormir.</span></li>
                    <li className="flex items-start space-x-3"><CheckCircleIcon className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" /><span>Você para de pensar em comida o tempo todo.</span></li>
                    <li className="flex items-start space-x-3"><CheckCircleIcon className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" /><span>E se olha no espelho com orgulho.</span></li>
                </ul>
            </div>
        </div>
    </section>
  );
};
