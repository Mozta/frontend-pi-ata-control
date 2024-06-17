import React, { useEffect, useState } from 'react';
import player_control from '../assets/player_control.webp'
import player_pinata from '../assets/player_pinata.webp'
import { Player } from '@lottiefiles/react-lottie-player';
import { apiService } from '../services/apiService';
import { Camara1 } from './Camara1';

export const Controls = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pointPos, setPointPos] = useState({ x: 0, y: 0 });

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
                        <div className='flex'>
                            {/* <img
                                className='border border-violet-600  border-n-6 rounded-lg'
                                src={player_control} alt="Player control" /> */}
                            <Camara1 setPoint={setPointPos} />
                        </div>
                    </div>

                    <div className='basis-1/4 mx-8'>
                        <div className='flex flex-col'>
                            <h1 className='text-2xl font-bold'>
                                Control pos
                            </h1>
                            <div className='flex flex-col justify-end items-end text-right size-40 w-64 bg-gray-300 rounded-lg'>
                                {/* Draw a red point in the middle of div */}
                                <div className='absolute w-1 h-1 bg-red-500' style={{ left: `${pointPos.x}%`, top: `${pointPos.y}%` }}></div>
                                <p className='font-medium px-2'>X: {pointPos.x.toFixed(2)} , Y: {pointPos.y.toFixed(2)}</p>
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

            </div>
        </>
    )
}
