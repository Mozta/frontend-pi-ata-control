import React from 'react';
import { useTranslation } from 'react-i18next';

export const Hero = () => {
    const { t } = useTranslation();

    return (
        <div className="text-center">
            <h1 className="text-6xl font-bold my-10">
                {t('welcomeMessage')}
            </h1>
            <h2 className="text-2xl mt-5 text-gray-500">
                {t('subtitle')} 🪅
            </h2>
        </div>
    );
};
