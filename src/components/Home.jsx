import React from 'react';
import { useNavigate } from 'react-router-dom';


export const Home = () => {
    const navigate = useNavigate();
    
    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-center">
            <h1 className="text-5xl font-bold my-10">
                Welcome to
                <br />
                the PinataFab!
            </h1>
            <h2 className="text-2xl mt-5 text-gray-500">
                A system control for a pinata game
            </h2>
            <p className="mt-5 text-gray-500">
                The PinataFab is a system control for a pinata game, where you can
                control the pinata and the camera to see the pinata.
            </p>

            <div className="bg-white p-4 rounded-lg shadow-md mt-10">
                <h3 className="font-bold text-lg mb-4">Status players</h3>
                <div className="flex items-center mb-4">
                    <img className="w-12 h-12 rounded-full mr-4" src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairShavedSides&accessoriesType=Blank&facialHairType=BeardLight&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=Black&graphicType=Skull&eyeType=Surprised&eyebrowType=UpDownNatural&mouthType=Disbelief&skinColor=Black" alt="Control players" />
                    <div className="text-left">
                        <div className="text-black font-bold">Control players</div>
                        <div className="text-green-500">online</div>
                    </div>
                </div>
                <div className="flex items-center">
                    <img className="w-12 h-12 rounded-full mr-4" src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Prescription02&hairColor=Blue&facialHairType=BeardLight&facialHairColor=Brown&clotheType=ShirtVNeck&clotheColor=Blue02&eyeType=Happy&eyebrowType=Default&mouthType=Twinkle&skinColor=Tanned" alt="Pinata players" />
                    <div className="text-left">
                        <div className="text-black font-bold">Pinata players</div>
                        <div className="text-red-500">offline</div>
                    </div>
                </div>
            </div>

            <button className="bg-primary text-light px-10 py-2 rounded-full mt-10"
            onClick={() => navigate('/game')}>
                Get started
            </button>
            <a href="/game" className="text-primary mt-5">Or play the game</a>
        </div>
    );
}
