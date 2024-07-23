import React, { useRef, useEffect, useState, useCallback } from 'react';
import Webcam from "react-webcam";
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import * as drawingUtils from '@mediapipe/drawing_utils';
import { connectToRoom, startVideoStream } from '../services/livekitService';
import useHandTracking from '../hooks/useHandTracking';
import useLiveKitRoom from '../hooks/useLiveKitRoom';

const CameraControls = ({ isCameraActive, onToggleCamera, onRestartCamera }) => (
  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-4">
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-full"
      onClick={onToggleCamera}
    >
      {isCameraActive ? 'Stop Camera' : 'Start Camera'}
    </button>
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-full"
      onClick={onRestartCamera}
    >
      Restart Camera
    </button>
  </div>
);

export const Camera2 = ({ token, username, setPoint, autoStart = false }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(autoStart);

  const { room, localVideoTrack } = useLiveKitRoom(token, isCameraActive);
  const { initializeHandTracking, stopHandTracking } = useHandTracking(webcamRef, canvasRef, setPoint);

  useImperativeHandle(ref, () => ({
    releaseCamera: () => {
        stopHandTracking();
        setIsCameraActive(false);
        if (room) {
            room.disconnect();
        }
    }
}));

  useEffect(() => {
    if (isCameraActive) {
      initializeHandTracking();
      if (localVideoTrack) {
        localVideoTrack.attach(videoRef.current);
        room.localParticipant.publishTrack(localVideoTrack);
      }
    } else {
      stopHandTracking();
    }

    return () => {
      stopHandTracking();
      if (room) {
        room.disconnect();
      }
    };
  }, [isCameraActive, initializeHandTracking, stopHandTracking, localVideoTrack, room]);

  const handleToggleCamera = useCallback(() => {
    setIsCameraActive(prev => !prev);
  }, []);

  const handleRestartCamera = useCallback(() => {
    setIsCameraActive(false);
    setTimeout(() => setIsCameraActive(true), 100);
  }, []);

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
        <video ref={videoRef} autoPlay playsInline className="hidden" />
        <CameraControls
          isCameraActive={isCameraActive}
          onToggleCamera={handleToggleCamera}
          onRestartCamera={handleRestartCamera}
        />
      </div>
    </div>
  );
};