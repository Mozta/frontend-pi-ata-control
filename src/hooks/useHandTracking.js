// hooks/useHandTracking.js
import { useState, useCallback, useRef, useEffect } from 'react';
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import * as drawingUtils from '@mediapipe/drawing_utils';

const useHandTracking = (webcamRef, canvasRef, setPoint) => {
  const [cameraInstance, setCameraInstance] = useState(null);
  const handsRef = useRef(null);

  const onResults = useCallback((results) => {
    const video = webcamRef.current?.video;
    const canvasElement = canvasRef.current;
    if (!video || !canvasElement) return;

    const canvasCtx = canvasElement.getContext('2d');

    canvasElement.width = video.videoWidth;
    canvasElement.height = video.videoHeight;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        drawingUtils.drawConnectors(canvasCtx, landmarks, Hands.HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
        drawingUtils.drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });

        const point9 = landmarks[9];
        const convertedX = point9.x * 180;
        const convertedY = point9.y * 180;
        setPoint({ x: convertedX, y: convertedY });
      }
    }
    canvasCtx.restore();
  }, [webcamRef, canvasRef, setPoint]);

  const initializeHandTracking = useCallback(() => {
    if (webcamRef.current && webcamRef.current.video && !handsRef.current) {
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
      handsRef.current = hands;

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
  }, [webcamRef, onResults]);

  const stopHandTracking = useCallback(() => {
    if (cameraInstance) {
      cameraInstance.stop();
      setCameraInstance(null);
    }
    if (handsRef.current) {
      handsRef.current.close();
      handsRef.current = null;
    }
  }, [cameraInstance]);

  useEffect(() => {
    return () => {
      stopHandTracking();
    };
  }, [stopHandTracking]);

  return { initializeHandTracking, stopHandTracking };
};

export default useHandTracking;