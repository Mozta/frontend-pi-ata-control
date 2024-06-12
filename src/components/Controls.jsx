import React, { useEffect, useState } from 'react';
import player_control from '../assets/player_control.webp'
import player_pinata from '../assets/player_pinata.webp'
import { Player } from '@lottiefiles/react-lottie-player';
import { apiService } from '../services/apiService';

export const Controls = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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
    }, []);

    if (loading) {
        return <div>
            <Player
                autoplay
                loop
                src='https://lottie.host/f4cbf879-68e9-4d35-b327-7714ecd51b2c/LUAqjYbmxM.json'
                className="player"
            ></Player>
        </div>;
    }

    if (error) {
        return <div>"Error loading data"</div>;
    }

    return (
        <>
            <div className="flex flex-col pt-20 min-h-screen">
                <h1 className="text-5xl font-bold mb-10 text-center">
                    #Piñatazostime
                </h1>
                <div className='flex flex-row mx-8'>
                    <div className='basis-3/4 mx-8'>
                        <h1 className='flex text-2xl font-bold'>
                            Control camera
                        </h1>
                        <div className='flex justify-center'>
                            <img
                                className='border border-violet-600  border-n-6 rounded-lg'
                                src={player_control} alt="Player control" />
                        </div>
                    </div>

                    <div className='basis-1/4 mx-8'>
                        <div className='flex flex-col'>
                            <h1 className='text-2xl font-bold'>
                                Control pos
                            </h1>
                            <div className='flex flex-col justify-end items-end text-right size-40 w-64 bg-gray-300 rounded-lg'>
                                <p className='font-medium px-2'>X: 90 Y: 120</p>
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

                    </div>

                </div>

                <div className="bg-white p-4 rounded-lg shadow-md mt-20 mx-10">
                    <h2 className="font-bold text-lg text-center">
                        Controls
                    </h2>
                    <div className="flex items-center justify-center mt-4">
                        <button className="bg-primary text-light px-10 py-2 rounded-full mr-4">
                            Move up
                        </button>
                        <button className="bg-primary text-light px-10 py-2 rounded-full mr-4">
                            Move down
                        </button>
                        <button className="bg-primary text-light px-10 py-2 rounded-full">
                            Reset
                        </button>

                    </div>

                </div>
            </div>
        </>
    )
}
