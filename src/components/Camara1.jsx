import React, { useRef, useEffect, useState } from 'react';
import Webcam from "react-webcam";
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import * as drawingUtils from '@mediapipe/drawing_utils';

export const Camara1 = ({setPoint}) => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraActive, setIsCameraActive] = useState(true);
    const [cameraInstance, setCameraInstance] = useState(null);
    const [pointPos, setPointPos] = useState({ x: 0, y: 0 });
    const [transformedPos, setTransformedPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (isCameraActive) {
            const hands = new Hands({
                locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
            });

            hands.setOptions({
                maxNumHands: 1,
                modelComplexity: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5,
            });

            hands.onResults(onResults);

            if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null) {
                const camera = new Camera(webcamRef.current.video, {
                    onFrame: async () => {
                        await hands.send({ image: webcamRef.current.video });
                    },
                    width: 640,
                    height: 480,
                });
                setCameraInstance(camera);
                camera.start();
            }
        } else {
            if (cameraInstance) {
                cameraInstance.stop();
                setCameraInstance(null);
            }
        }

        // Transformar x y y (pointPos) en un valor entre 0 y 180
        const transformPointPos = () => {
            const x = (pointPos.x / canvasRef.current.width) * 180;
            const y = (pointPos.y / canvasRef.current.height) * 180;
            setTransformedPos({ x, y });
        };

        function onResults(results) {
            const video = webcamRef.current.video;
            const canvasElement = canvasRef.current;
            const canvasCtx = canvasElement.getContext('2d');

            // Ajustar el tamaño del canvas al tamaño del video
            canvasElement.width = video.videoWidth;
            canvasElement.height = video.videoHeight;

            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCtx.drawImage(
                results.image, 0, 0, canvasElement.width, canvasElement.height
            );
            if (results.multiHandLandmarks) {
                for (const landmarks of results.multiHandLandmarks) {
                    drawingUtils.drawConnectors(canvasCtx, landmarks, Hands.HAND_CONNECTIONS,
                        { color: '#00FF00', lineWidth: 5 });
                    drawingUtils.drawLandmarks(canvasCtx, landmarks,
                        { color: '#FF0000', lineWidth: 2 });

                    // Actualizar la posición del punto 9
                    const point9 = landmarks[9];
                    setPointPos({ x: point9.x * canvasElement.width, y: point9.y * canvasElement.height });

                    // Convertir la posición al rango de 0 a 180
                    const convertedX = (point9.x) * 180;
                    const convertedY = (point9.y) * 180;
                    setTransformedPos({ x: convertedX, y: convertedY });
                    setPoint({ x: convertedX, y: convertedY });
                }
            }
            canvasCtx.restore();
        }
    }, [isCameraActive]);

    const handleToggleCamera = () => {
        setIsCameraActive(prevState => !prevState);
    };

    const handleRestartCamera = () => {
        setIsCameraActive(false);
        setTimeout(() => {
            setIsCameraActive(true);
        }, 100);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="relative w-5/6">
                <Webcam
                    ref={webcamRef}
                    className='rounded-3xl w-full'
                    style={{ display: "none" }}
                />
                <canvas
                    ref={canvasRef}
                    className='rounded-3xl w-full'
                />
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-full"
                        onClick={handleToggleCamera}
                    >
                        {isCameraActive ? 'Stop Camera' : 'Start Camera'}
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-full"
                        onClick={handleRestartCamera}
                    >
                        Restart Camera
                    </button>
                </div>
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-bold">Position of Point 9:</h3>
                <p>X: {pointPos.x.toFixed(2)}, Y: {pointPos.y.toFixed(2)}</p>
                <h3 className="text-lg font-bold mt-4">Converted Position (0-180):</h3>
                <p>X: {transformedPos.x.toFixed(2)}, Y: {transformedPos.y.toFixed(2)}</p>
            </div>
        </div>
    );
};
