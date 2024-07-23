import React, { useState, useRef, useEffect } from 'react';
import { connectToRoom, startVideoStream, getToken } from '../services/livekitService';
import { ConnectionStateToast } from "@livekit/components-react";
import "@livekit/components-styles";

const serverUrl = 'wss://fab-pinata-zt86ze4g.livekit.cloud';

export const VideoEmitter = ({ onHandDetected }) => {
    const [room, setRoom] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const localVideoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const startEmitter = async () => {
            setIsLoading(true);
            const token = await getToken('emitter');
            const room = await connectToRoom(serverUrl, token);
            setRoom(room);
            <ConnectionStateToast />

            const hands = new window.Hands({
                locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
            });

            hands.setOptions({
                maxNumHands: 1,
                modelComplexity: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5,
            });

            hands.onResults(onResults);

            if (localVideoRef.current) {
                const camera = new window.Camera(localVideoRef.current, {
                    onFrame: async () => {
                        await hands.send({ image: localVideoRef.current });
                    },
                    width: 1280,
                    height: 720,
                });
                camera.start();

                const videoTrack = await startVideoStream();
                room.localParticipant.publishTrack(videoTrack);
                setIsLoading(false);
            }
        };

        startEmitter();
    }, []);

    const onResults = (results) => {
        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext('2d');
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
        if (results.multiHandLandmarks) {
            for (const landmarks of results.multiHandLandmarks) {
                window.drawConnectors(canvasCtx, landmarks, window.Hands.HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
                window.drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
            }
        }
        canvasCtx.restore();

        

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const hand = results.multiHandLandmarks[0];
            const convertedX = hand[9].x * 180;
            const convertedY = hand[9].y * 180;
            onHandDetected({ x: convertedX, y: convertedY });


            // const hand = results.multiHandLandmarks[0];
            // const point = { x: hand[0].x, y: hand[0].y };
            // onHandDetected(point);
        }
    };

    return (
        <div>
            <h2>Emitiendo...</h2>
            {isLoading ? <p>Cargando video...</p> : null}
            <video ref={localVideoRef} autoPlay playsInline muted style={{ display: 'none' }}></video>
            <canvas ref={canvasRef} className="output_canvas" width="1280px" height="720px" style={{ width: '400px' }}></canvas>
            {/* <button onClick={onClose}>Detener Emisión</button> */}
        </div>
    );
};