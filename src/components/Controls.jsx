import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import { getToken } from '../services/livekitService';
import { updatePlayerState } from '../services/firestoreService';
import { BubbleChart } from './BubbleChart';
import { CameraManager } from './CameraManager';
import { VideoEmitter } from './VideoEmitter';
import player_pinata from '../assets/player_pinata.webp';

export const Controls = ({ username }) => {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pointPos, setPointPos] = useState({ x: 0, y: 0 });

    const location = useLocation();
    const navigate = useNavigate();
    const { role } = location.state || {};

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const newToken = await getToken(`${username}-controller`);
                setToken(newToken);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener token:', error);
                setError(true);
                setLoading(false);
            }
        };
        fetchToken();
    }, [username]);

    const handleExitGame = async () => {
        await updatePlayerState('p1', false);
        navigate('/');
    };

    const handleHandDetected = (point) => {
        setPointPos(point);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Player
                    autoplay
                    loop
                    src='https://lottie.host/f4cbf879-68e9-4d35-b327-7714ecd51b2c/LUAqjYbmxM.json'
                    className="player"
                />
            </div>
        );
    }

    if (error) {
        return <div>Error loading data</div>;
    }

    return (
        <div className="flex flex-col pt-20 min-h-screen">
            <h1 className="text-3xl font-bold mb-10 text-center">#Piñatazostime</h1>
            <div className="flex flex-row mx-8">
                <div className="basis-3/4 mx-8">
                    <div className="flex justify-between mb-4">
                        <h1 className="text-2xl font-bold">Control camera</h1>
                        <button
                            className="bg-red-500 text-white px-10 py-2 rounded-full"
                            onClick={handleExitGame}
                        >
                            Exit Game
                        </button>
                    </div>
                    <div className="flex">
                        {/* <CameraManager token={token} onHandDetected={handleHandDetected} /> */}
                        <VideoEmitter token={token} onHandDetected={handleHandDetected} />
                    </div>
                </div>
                <div className="basis-1/4 mx-8">
                    <div className="flex flex-col mb-4">
                        <h1 className="text-2xl font-bold">Control pos</h1>
                        <BubbleChart pointPos={pointPos} />
                    </div>
                    <div className="flex flex-col mb-4">
                        <h1 className="text-2xl font-bold">Pinata control</h1>
                        <div className="flex justify-center">
                            <img
                                className="border border-violet-600 rounded-lg"
                                src={player_pinata}
                                alt="Player control"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-center text-lg font-bold">
                            You are playing as: {role}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
