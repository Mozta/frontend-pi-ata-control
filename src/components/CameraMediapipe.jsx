import React, { useRef, useEffect } from 'react';

export const CameraMediapipe = ({ videoRef, canvasRef, onHandDetected }) => {
    useEffect(() => {
        const hands = new window.Hands({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        hands.onResults((results) => {
            const canvasElement = canvasRef.current;
            const canvasCtx = canvasElement.getContext('2d');
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
            if (results.multiHandLandmarks) {
                for (const landmarks of results.multiHandLandmarks) {
                    window.drawConnectors(canvasCtx, landmarks, window.Hands.HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
                    window.drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });

                    // show point in color blue
                    canvasCtx.beginPath();
                    canvasCtx.arc(landmarks[9].x * canvasElement.width, landmarks[9].y * canvasElement.height, 10, 0, 2 * Math.PI);
                    canvasCtx.fillStyle = 'blue';
                    canvasCtx.fill();
                }
            }
            canvasCtx.restore();

            if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                const hand = results.multiHandLandmarks[0];
                if (hand && hand.length > 9) {
                    const convertedX = hand[9].x * 180;
                    const convertedY = hand[9].y * 180;
                    onHandDetected({ x: convertedX, y: convertedY });
                }
            }
        });

        if (videoRef.current) {
            const camera = new window.Camera(videoRef.current, {
                onFrame: async () => {
                    await hands.send({ image: videoRef.current });
                },
                width: 640,
                height: 480,
            });
            camera.start();
        }

        return () => {
            hands;
        };
    }, [videoRef, canvasRef, onHandDetected]);

    return null;
};
