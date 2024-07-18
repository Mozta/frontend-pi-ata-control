import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import player_control from '../assets/player_control.webp';
import player_pinata from '../assets/player_pinata.webp';
import { Player } from '@lottiefiles/react-lottie-player';
import { apiService } from '../services/apiService';
import { Camara1 } from './Camara1';
import { Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, BubbleController, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { getPlayers, updatePlayerState } from '../services/firestoreService';

ChartJS.register(BubbleController, LinearScale, PointElement, Tooltip, Legend);

export const Controls = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pointPos, setPointPos] = useState({ x: 0, y: 0 });

    const navigate = useNavigate();
    const location = useLocation();
    const { role } = location.state || {};
    const camara1Ref = useRef(null);

    useEffect(() => {
        apiService.getInventary()
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error);
                setLoading(false);
                setError(true);
            });

        const handleBeforeUnload = async (event) => {
            event.preventDefault();
            event.returnValue = '';

            // Update player state
            if (role === 'control') {
                await updatePlayerState('p1', false);
            } else if (role === 'hitter') {
                await updatePlayerState('p2', false);
            } else if (role === 'spectator') {
                const updatedPlayers = await getPlayers();
                await updatePlayerState('p3', Math.max(updatedPlayers.p3 - 1, 0));
            }

            // Free the camera
            if (camara1Ref.current) {
                camara1Ref.current.releaseCamera();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('unload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('unload', handleBeforeUnload);
        };
    }, [role]);

    if (loading) {
        return (
            <div>
                <Player
                    autoplay
                    loop
                    src='https://lottie.host/f4cbf879-68e9-4d35-b327-7714ecd51b2c/LUAqjYbmxM.json'
                    className="player"
                ></Player>
            </div>
        );
    }

    if (error) {
        return <div>"Error loading data"</div>;
    }

    // Función para mapear la posición del punto a las coordenadas del div
    const mapPositionToDiv = (x, y) => {
        return {
            x: x,
            y: y * -1 + 180,
        };
    };

    const { x, y } = mapPositionToDiv(pointPos.x, pointPos.y);

    // Datos para la gráfica de burbuja
    const dataBubble = {
        datasets: [
            {
                label: 'Pinata Position',
                data: [{ x: x, y: y, r: 10 }],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Opciones para la gráfica de burbuja
    const options = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: 0,
                max: 180,
            },
            y: {
                min: 0,
                max: 180,
            },
        },
    };

    const handleExitGame = async () => {
        if (role === 'control') {
            await updatePlayerState('p1', false);
        } else if (role === 'hitter') {
            await updatePlayerState('p2', false);
        } else if (role === 'spectator') {
            const updatedPlayers = await getPlayers();
            await updatePlayerState('p3', Math.max(updatedPlayers.p3 - 1, 0));
        }

        // Free the camera
        if (camara1Ref.current) {
            camara1Ref.current.releaseCamera();
        }

        navigate('/');
    };

    return (
        <div className="flex flex-col pt-20 min-h-screen">
            <h1 className="text-5xl font-bold mb-10 text-center">
                #Piñatazostime
            </h1>
            <div className='flex flex-row mx-8'>
                <div className='basis-3/4 mx-8'>
                    <h1 className='flex text-2xl font-bold'>
                        Control camera
                    </h1>
                    <div className='flex'>
                        <Camara1 ref={camara1Ref} setPoint={setPointPos} />
                    </div>
                </div>

                <div className='basis-1/4 mx-8'>
                    <div className='flex flex-col'>
                        <h1 className='text-2xl font-bold'>
                            Control pos
                        </h1>
                        <Bubble data={dataBubble} options={options} height={180} />
                        <div className='bg-gray-200 py-2 rounded-lg text-center'>
                            <p className='font-medium px-2'>X: {x.toFixed(2)} , Y: {y.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className='flex flex-col mt-4'>
                        <h1 className='text-2xl font-bold'>
                            Pinata control
                        </h1>
                        <div className='flex justify-center'>
                            <img
                                className='border border-violet-600  border-n-6 rounded-lg'
                                src={player_pinata} alt="Player control" />
                        </div>
                    </div>

                    <div className='mt-4'>
                        <p className='text-center text-lg font-bold'>
                            You are playing as: {role}
                        </p>
                    </div>
                </div>

            </div>

            <button
                className="bg-red-500 text-light px-10 py-2 rounded-full mt-10 self-center"
                onClick={handleExitGame}
            >
                Exit Game
            </button>
        </div>
    );
};
