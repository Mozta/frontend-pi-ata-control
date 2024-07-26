// src/components/Viewer.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LiveKitRoom,
    ConnectionStateToast,
    VideoConference,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { getToken } from '../services/livekitService';
import { Player } from '@lottiefiles/react-lottie-player';

const serverUrl = import.meta.env.VITE_LIVEKIT_SERVER_URL;
// const serverUrl = 'wss://fab-pinata-zt86ze4g.livekit.cloud';

export const ViewerPinata = ({ username, onHandleExitGame }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');

    useEffect(() => {
        const fetchToken = async () => {
            const newToken = await getToken(username);
            setToken(newToken);
        };
        fetchToken();
    }, []);

    const handleLeave = () => {
        onHandleExitGame();
        navigate('/');
    };

    if (!token) {
        return <div>
            Loading...
            <Player
                autoplay
                loop
                src='https://lottie.host/f4cbf879-68e9-4d35-b327-7714ecd51b2c/LUAqjYbmxM.json'
                className="player"
            ></Player>
        </div>;
    }

    return (
        <LiveKitRoom
            video={false}
            audio={false}
            token={token}
            serverUrl={serverUrl}
            data-lk-theme="default"
            style={{ height: '70vh' }}
            onDisconnected={handleLeave}
        >
            <VideoConference />
            <ConnectionStateToast />
        </LiveKitRoom>
    );
};