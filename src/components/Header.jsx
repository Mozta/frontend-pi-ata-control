import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';

export const Header = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const languages = [
        { code: 'es', name: 'Español', flag: 'MX' },
        { code: 'en', name: 'English', flag: 'GBR' },
        { code: 'pt', name: 'Português', flag: 'PRT' },
        { code: 'ja', name: '日本語', flag: 'JPN' },
        { code: 'hi', name: 'हिन्दी', flag: 'IND' },
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setLanguage(lng);
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="fixed top-0 z-50 w-full bg-n-8/90 backdrop-blur-sm border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm">
            <div className='flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-4'>
                <a className='flex items-center' href='/'>
                    <img src={logo} alt="FabPinata" className="h-12" />
                    <h1 className='text-2xl font-medium ml-2'>
                        FabPinata
                    </h1>
                </a>
                <nav className='flex space-x-6 items-center'>
                    <a className='text-lg hover:text-gray-400' href='/tutorial'>{t('tutorial')}</a>
                    <a className='text-lg hover:text-gray-400' href='/settings'>{t('settings')}</a>
                    <a className='text-lg hover:text-gray-400' href='/help'>{t('help')}</a>
                    <div className="relative">
                        <button onClick={toggleDropdown} className="text-lg border border-gray-300 rounded-md py-2 px-4 bg-white text-gray-700 flex items-center">
                            <Flag code={languages.find(l => l.code === language)?.flag} className="inline-block w-5 h-3 mr-2" />
                            {languages.find(l => l.code === language)?.name}
                            <svg className="w-4 h-4 ml-2 fill-current text-gray-400" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        <Flag code={lang.flag} className="inline-block w-5 h-3 mr-2" />
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </nav>
            </div>
        </div>
    );
}
