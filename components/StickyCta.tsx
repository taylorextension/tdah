
import React from 'react';
import { CtaButton } from './CtaButton';

export const StickyCta: React.FC = () => {
    return (
        <div className="sticky bottom-0 left-0 right-0 md:hidden p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200 shadow-lg">
            <CtaButton href="https://pay.kiwify.com.br/duI4bxH" className="text-lg py-3">
                COMEÇAR AGORA
            </CtaButton>
        </div>
    );
};
