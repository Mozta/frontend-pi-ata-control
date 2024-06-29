import React, { useEffect, useState } from 'react';
import { getPlayers, onPlayersSnapshot } from '../services/firestoreService';

export const Home = ({ onEnterSelector, onEnterGame }) => {
  const [players, setPlayers] = useState({ p1: false, p2: false, p3: 0 });

  useEffect(() => {
    // Escuchar en tiempo real los cambios en el documento "players"
    const unsubscribe = onPlayersSnapshot((data) => {
      setPlayers(data);
    });

    // Limpiar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);


  return (
    <div className="flex flex-col justify-center text-center">
      <div className="bg-white p-4 rounded-lg shadow-md mt-10">
        <h3 className="font-bold text-lg mb-4">Status players</h3>
        <div className="flex items-center mb-4">
          <img
            className="w-12 h-12 rounded-full mr-4"
            src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairShavedSides&accessoriesType=Blank&facialHairType=BeardLight&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=Black&graphicType=Skull&eyeType=Surprised&eyebrowType=UpDownNatural&mouthType=Disbelief&skinColor=Black"
            alt="Control players"
          />
          <div className="text-left">
            <div className="text-black font-bold">Control players</div>
            {players.p1 ?
              <div className="text-green-500">
                online
              </div>
              :
              <div className="text-red-500">
                offline
              </div>
            }
          </div>
        </div>
        <div className="flex items-center mb-4">
          <img
            className="w-12 h-12 rounded-full mr-4"
            src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Prescription02&hairColor=Blue&facialHairType=BeardLight&facialHairColor=Brown&clotheType=ShirtVNeck&clotheColor=Blue02&eyeType=Happy&eyebrowType=Default&mouthType=Twinkle&skinColor=Tanned"
            alt="Pinata players"
          />
          <div className="text-left">
            <div className="text-black font-bold">Pinata players</div>
            {players.p2 ?
              <div className="text-green-500">
                online
              </div>
              :
              <div className="text-red-500">
                offline
              </div>
            }
          </div>
        </div>
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full mr-4"
            src="https://avataaars.io/"
            alt="Pinata players"
          />
          <div className="text-left">
            <div className="text-black font-bold">Viewers</div>
            <div className="text-blue-500">
              {players.p3}
            </div>
          </div>
        </div>

      </div>
      <button
        className="bg-primary text-light px-10 py-2 rounded-full mt-10"
        onClick={onEnterSelector}
      >
        Get started
      </button>
    </div>
  );
};
