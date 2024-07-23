import React, { useEffect, useRef } from 'react';
import { connectToRoom, startVideoStream } from '../services/livekitService';

const serverUrl = import.meta.env.VITE_LIVEKIT_SERVER_URL;

export const CameraLive = ({ videoRef, token }) => {
    const isPublishing = useRef(false);
    const roomRef = useRef(null);

    useEffect(() => {
        const startLivekit = async () => {
            if (isPublishing.current || !videoRef.current) {
                return;
            }

            try {
                const room = await connectToRoom(serverUrl, token);
                roomRef.current = room;

                const localTracks = await startVideoStream();
                const videoTrack = localTracks.find(track => track.kind === 'video');
                if (videoTrack) {
                    videoTrack.attach(videoRef.current);
                    room.localParticipant.publishTrack(videoTrack);
                    isPublishing.current = true;
                }
            } catch (error) {
                console.error('Error starting LiveKit video stream:', error);
            }
        };

        startLivekit();

        return () => {
            if (roomRef.current) {
                roomRef.current.disconnect();
                isPublishing.current = false;
            }
        };
    }, [videoRef]);

    return null;
};
