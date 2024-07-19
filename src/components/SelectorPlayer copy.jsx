import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import player_control from '../assets/player_control0.webp';
import player_hitter from '../assets/player_hitter.webp';
import spectator from '../assets/player_spectator.webp';
import { getPlayers, updatePlayerState } from '../services/firestoreService';

export const SelectorPlayer = ({ backState }) => {
    const [players, setPlayers] = useState({ p1: false, p2: false, p3: 0 });
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlayers = async () => {
            const playersData = await getPlayers();
            if (playersData) {
                setPlayers(playersData);
            }
        };
        fetchPlayers();
    }, []);

    const handlePlayerSelect = async (role) => {
        // Reset previous selection in Firestore
        if (selectedPlayer === 'control') {
            await updatePlayerState('p1', false);
        } else if (selectedPlayer === 'hitter') {
            await updatePlayerState('p2', false);
        } else if (selectedPlayer === 'spectator') {
            const updatedPlayers = await getPlayers();
            await updatePlayerState('p3', Math.max(updatedPlayers.p3 - 1, 0));
        }

        // Update Firestore and local state with new selection
        if (role === 'control' && !players.p1) {
            await updatePlayerState('p1', true);
            setSelectedPlayer(role);
        } else if (role === 'hitter' && !players.p2) {
            await updatePlayerState('p2', true);
            setSelectedPlayer(role);
        } else if (role === 'spectator') {
            const updatedPlayers = await getPlayers();
            await updatePlayerState('p3', updatedPlayers.p3 + 1);
            setSelectedPlayer(role);
        }
    };

    const handleStartGame = () => {
        navigate('/game', { state: { role: selectedPlayer } });
    };

    const handleCancelSelection = async () => {
        if (selectedPlayer === 'control') {
            await updatePlayerState('p1', false);
        } else if (selectedPlayer === 'hitter') {
            await updatePlayerState('p2', false);
        } else if (selectedPlayer === 'spectator') {
            const updatedPlayers = await getPlayers();
            await updatePlayerState('p3', Math.max(updatedPlayers.p3 - 1, 0));
        }
        setSelectedPlayer(null);
    }

    return (
        <div className="flex flex-col pt-20 min-h-screen">
            <h1 className="text-5xl font-bold mb-10 text-center">Select player</h1>
            <div className="flex flex-row mx-8">
                <div
                    className={`basis-1/4 mx-8 cursor-pointer ${selectedPlayer === 'control' ? 'border-4 border-green-500' : ''} ${players.p1 ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                    className={`basis-1/4 mx-8 cursor-pointer ${selectedPlayer === 'hitter' ? 'border-4 border-green-500' : ''} ${players.p2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handlePlayerSelect('hitter')}
                >
                    <div className="flex flex-col transition-transform transform hover:scale-105">
                        <h1 className="text-2xl font-bold">Pinata hitter</h1>
                        <div className="flex justify-center">
                            <img
                                className="rounded-lg w-64"
                                src={player_hitter}
                                alt="Player hitter"
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={`basis-1/4 mx-8 cursor-pointer ${selectedPlayer === 'spectator' ? 'border-4 border-green-500' : ''}`}
                    onClick={() => handlePlayerSelect('spectator')}
                >
                    <div className="flex flex-col transition-transform transform hover:scale-105">
                        <h1 className="text-2xl font-bold">Spectator</h1>
                        <div className="flex justify-center">
                            <img
                                className="rounded-lg w-64"
                                src={spectator}
                                alt="Spectator"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {selectedPlayer && (
                <div className="space-x-4 mt-10">
                    <button
                        className="bg-green-500 text-light px-10 py-2 rounded-full"
                        onClick={handleStartGame}
                    >
                        Start Game
                    </button>
                    <button
                        className="bg-red-500 text-light px-10 py-2 rounded-full"
                        onClick={handleCancelSelection}
                    >
                        Cancel
                    </button>
                </div>
            )}
            <div className="space-x-4 mt-10">
                <button
                    className="bg-primary text-light px-10 py-2 rounded-full"
                    onClick={backState}
                >
                    Back
                </button>
            </div>
        </div>
    );
};
