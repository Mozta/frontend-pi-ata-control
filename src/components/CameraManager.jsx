import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { CameraMediapipe } from './CameraMediapipe';
import { CameraLive } from './CameraLive';

export const CameraManager = ({ token, onHandDetected }) => {
    const webcamRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        // Este useEffect asegura que videoRef apunte al elemento de video de react-webcam
        if (webcamRef.current) {
            videoRef.current = webcamRef.current.video;
        }
    }, [webcamRef]);

    return (
        <div className="flex flex-col items-center w-full">
            <Webcam ref={webcamRef} className='rounded-3xl w-full' style={{ display: 'none' }} />
            <canvas ref={canvasRef} className='rounded-3xl w-full' width="1280px" height="720px"></canvas>
            <CameraMediapipe videoRef={videoRef} canvasRef={canvasRef} onHandDetected={onHandDetected} />
            <CameraLive videoRef={videoRef} token={token} />
        </div>
    );
};
