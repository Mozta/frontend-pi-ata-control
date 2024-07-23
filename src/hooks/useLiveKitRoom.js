import { useState, useEffect } from 'react';
import { connectToRoom, startVideoStream } from '../services/livekitService';

const useLiveKitRoom = (token, isActive) => {
  const [room, setRoom] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);

  useEffect(() => {
    const initializeRoom = async () => {
      if (isActive && !room) {
        const newRoom = await connectToRoom(import.meta.env.VITE_LIVEKIT_SERVER_URL, token);
        setRoom(newRoom);

        const videoTrack = await startVideoStream();
        setLocalVideoTrack(videoTrack);
      }
    };

    initializeRoom();

    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, [token, isActive]);

  return { room, localVideoTrack };
};

export default useLiveKitRoom;