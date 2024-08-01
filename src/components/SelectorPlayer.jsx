import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPlayers } from '../services/firestoreService';

export const SelectorPlayer = () => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [isControllerAvailable, setIsControllerAvailable] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlayerState = async () => {
            try {
                const players = await getPlayers();
                setIsControllerAvailable(!players.p1);
            } catch (error) {
                console.error('Error fetching player state:', error);
            }
        };

        fetchPlayerState();
    });

    const handleStartGame = (userType) => {
        navigate('/game', { state: { role: userType, name } });
    };

    return (
        <div className="mt-8">
            <div className="flex flex-col mb-4">
                <label className="text-gray-800 mb-2">{t('enterName')}</label>
                <input
                    className="border border-gray-300 rounded-md p-2"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('yourName')}
                />
            </div>
            <h2 className="text-2xl mt-5 text-gray-800">{t('selectPlayer')}</h2>
            <div className="flex flex-row space-x-4">
                <button
                    className="bg-primary text-light px-10 py-2 rounded-full mt-5 w-full hover:bg-primary-dark disabled:opacity-50"
                    onClick={() => handleStartGame('controller')}
                    disabled={!name || !isControllerAvailable}
                >
                    {t('controller')}
                </button>
                <button
                    className="bg-secondary text-light px-10 py-2 rounded-full mt-5 w-full hover:bg-secondary-dark disabled:opacity-50"
                    onClick={() => handleStartGame('viewer')}
                    disabled={!name}
                >
                    {t('viewer')}
                </button>
            </div>
        </div>
    );
}
