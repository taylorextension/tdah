import React from 'react';
import { CheckCircleIcon } from './icons';

export const SolutionSection: React.FC = () => {
  return (
    <section id="a-solucao" className="bg-white pt-8 md:pt-12">
        <div className="max-w-2xl mx-auto px-8">
            <p className="text-lg text-slate-600 mb-6">Durante anos, o que mais se ouviu foi:</p>
            <blockquote className="pl-6 my-4 border-l-4 border-slate-300 italic text-slate-500 space-y-2 mb-8 text-lg">
                <p>“tem que comer de 3 em 3 horas”,</p>
                <p>“café da manhã é sagrado”,</p>
                <p>“gordura engorda”,</p>
                <p>“pra emagrecer, é só comer menos e se exercitar mais”...</p>
            </blockquote>
            <p className="text-lg text-slate-700 mb-6">Mas olha que loucura… Seguir essas regras é justamente o que trava o seu metabolismo.</p>
            
            <div className="my-10 p-6 bg-slate-100 rounded-lg">
                <p className="text-xl text-slate-700">Enquanto te empurravam a pirâmide alimentar que adoece e engorda, a ciência descobria o segredo na pirâmide <span className="font-bold text-emerald-700">INVERTIDA</span>.</p>
                <p className="mt-2 text-xl text-slate-700">E foi com base nessa ciência que nasceu o <span className="font-bold">PPI: Protocolo da Pirâmide Invertida</span>.</p>
            </div>

            <div className="my-10">
                <p className="text-lg text-slate-600">A barriga cresce. A fome aumenta. A energia some.</p>
                <p className="mt-4 text-2xl font-bold text-slate-800">E o pior: a culpa recai sobre você.</p>
            </div>
        </div>

        <div className="bg-emerald-50 my-12">
            <div className="max-w-2xl mx-auto p-8">
                <p className="text-2xl md:text-3xl font-bold text-emerald-800 leading-snug">Mas a culpa nunca foi sua. Você só estava usando a estratégia errada.</p>
            </div>
        </div>

        <div className="max-w-2xl mx-auto px-8 pb-8 md:pb-12">
            <p className="text-slate-700 mb-4 text-lg">Foi isso que o Dr. Ben Bikman descobriu. PhD em fisiologia, pesquisador da Brigham Young University (EUA) e referência mundial no estudo do metabolismo, ele dedicou anos da carreira pra responder uma pergunta: por que algumas pessoas acumulam gordura com facilidade, mesmo comendo pouco?</p>
            <p className="text-xl font-bold text-slate-800 my-8">A resposta veio depois de centenas de estudos, testes e revisões:</p>

            <div className="my-12">
                <p className="text-4xl md:text-5xl text-slate-500">Não é sobre calorias.</p>
                <p className="text-5xl md:text-7xl font-extrabold text-emerald-700 tracking-tighter mt-1">É sobre INSULINA.</p>
            </div>

            <p className="text-xl text-slate-700">A insulina é o hormônio que decide se o seu corpo vai <span className="font-bold">guardar gordura… ou queimar gordura.</span></p>
            <p className="text-xl text-slate-700 mt-6"><span className="font-semibold text-red-600">Se ela estiver alta, o corpo armazena.</span><br/><span className="font-semibold text-green-600">Se ela estiver baixa, o corpo queima.</span></p>
            
            <p className="mt-10 text-slate-700 text-lg">E o que mais bagunça a insulina no dia a dia não é só o doce: acordar e comer direto, tomar café com açúcar sem proteína, beliscar o dia todo, refeições ricas em carboidrato e pobres em proteína e gordura natural.</p>
            <p className="mt-4 text-slate-700 text-lg">O resultado? Você sente fome o tempo inteiro. Come mais do que queria. Se sente inchada, pesada, cansada. E nada parece funcionar.</p>

            <div className="mt-12">
                <h3 className="text-3xl font-bold text-slate-800 mb-6">Quando você aprende a regular isso, tudo muda.</h3>
                <ul className="space-y-3 text-xl">
                    <li className="flex items-start space-x-3"><CheckCircleIcon className="h-7 w-7 text-emerald-500 flex-shrink-0 mt-1" /><span>A fome que te assombrava o dia inteiro <span className="font-bold">simplesmente desaparece.</span></span></li>
                    <li className="flex items-start space-x-3"><CheckCircleIcon className="h-7 w-7 text-emerald-500 flex-shrink-0 mt-1" /><span>Você come pratos deliciosos e se sente <span className="font-bold">satisfeita por horas.</span></span></li>
                    <li className="flex items-start space-x-3"><CheckCircleIcon className="h-7 w-7 text-emerald-500 flex-shrink-0 mt-1" /><span>A barriga desincha e as roupas <span className="font-bold">começam a ficar folgadas.</span></span></li>
                    <li className="flex items-start space-x-3"><CheckCircleIcon className="h-7 w-7 text-emerald-500 flex-shrink-0 mt-1" /><span>Sua energia se torna <span className="font-bold">estável e abundante</span>, do acordar ao deitar.</span></li>
                    <li className="flex items-start space-x-3"><CheckCircleIcon className="h-7 w-7 text-emerald-500 flex-shrink-0 mt-1" /><span>Você para de pensar em comida o tempo inteiro e <span className="font-bold">retoma o controle.</span></span></li>
                    <li className="flex items-start space-x-3"><CheckCircleIcon className="h-7 w-7 text-emerald-500 flex-shrink-0 mt-1" /><span>E começa a se olhar no espelho com <span className="font-bold">orgulho e admiração.</span></span></li>
                </ul>
            </div>
        </div>
    </section>
  );
};
