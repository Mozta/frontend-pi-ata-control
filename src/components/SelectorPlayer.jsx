import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import player_control from '../assets/player_control0.webp';
import player_hitter from '../assets/player_hitter.webp';
import spectator from '../assets/player_spectator.webp';

export const SelectorPlayer = ({ backState }) => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const navigate = useNavigate();

    const handlePlayerSelect = (role) => {
        setSelectedPlayer(role);
    };

    const handleStartGame = () => {
        navigate('/game', { state: { role: selectedPlayer } });
    };

    return (
        <div className="flex flex-col pt-20 min-h-screen">
            <h1 className="text-5xl font-bold mb-10 text-center">Select player</h1>
            <div className="flex flex-row mx-8">
                <div
                    className={`basis-1/4 mx-8 cursor-pointer ${selectedPlayer === 'control' ? 'border-4 border-green-500' : ''
                        }`}
                    onClick={() => handlePlayerSelect('control')}
                >
                    <div className="flex flex-col transition-transform transform hover:scale-105">
                        <h1 className="text-2xl font-bold">Pinata control</h1>
                        <div className="flex justify-center">
                            <img
                                className="rounded-lg w-64"
                                src={player_control}
                                alt="Player control"
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={`basis-1/4 mx-8 cursor-pointer ${selectedPlayer === 'hitter' ? 'border-4 border-green-500' : ''
                        }`}
                    onClick={() => handlePlayerSelect('hitter')}
                >
                    <div className="flex flex-col transition-transform transform hover:scale-105">
                        <h1 className="text-2xl font-bold">Pinata hitter</h1>
                        <div className="flex justify-center">
                            <img
                                className=" rounded-lg w-64"
                                src={player_hitter}
                                alt="Player hitter"
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={`basis-1/4 mx-8 cursor-pointer ${selectedPlayer === 'spectator' ? 'border-4 border-green-500' : ''
                        }`}
                    onClick={() => handlePlayerSelect('spectator')}
                >
                    <div className="flex flex-col transition-transform transform hover:scale-105">
                        <h1 className="text-2xl font-bold">Spectator</h1>
                        <div className="flex justify-center">
                            <img
                                className=" rounded-lg w-64"
                                src={spectator}
                                alt="Spectator"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {selectedPlayer && (
                <button
                    className="bg-green-500 text-light px-10 py-2 rounded-full mt-10"
                    onClick={handleStartGame}
                >
                    Start Game
                </button>
            )}

            <button
                className="bg-primary text-light px-10 py-2 rounded-full mt-10"
                onClick={backState}
            >
                Back
            </button>
        </div>
    );
};
