import { createLocalTracks, Room } from 'livekit-client';

let room;

export const connectToRoom = async (url, token) => {
    room = new Room();
    await room.connect(url, token);
    return room;
};

export const startVideoStream = async () => {
    if (!room) {
        throw new Error('You must connect to a room first.');
    }

    const tracks = await createLocalTracks({
        video: {
            resolution: { width: 1280, height: 720 },
        },
        audio: false,
    });

    tracks.forEach(track => {
        room.localParticipant.publishTrack(track);
    });

    return tracks.find(track => track.kind === 'video');
};

export const getRoom = () => room;

export const getToken = async (name) => {
    try {
        const url = `https://livekitserver.onrender.com/getToken?name=${name}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data.token;
    } catch (error) {
        console.error('Error fetching token:', error);
        throw error;
    }
};
