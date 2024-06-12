import React from 'react'

export const Tutorial = () => {
    return (
        <>
            <div className="flex flex-col pt-20 min-h-screen">
                <h1 className="text-5xl font-bold mb-10 text-center">
                    Tutorial
                </h1>

                {/* Tutorial of gameplay */}
                <div className='flex flex-row mx-8'>
                    <div className='basis-3/4 mx-8'>
                        <h1 className='flex text-2xl font-bold'>
                            Gameplay
                        </h1>
                        <div className='flex justify-center'>
                            <p>
                                The game is simple, you have to hit the pinata to get the candies.
                                You can control the pinata and the camera to see the pinata.
                            </p>
                        </div>
                    </div>
                    <div className='basis-1/4 mx-8'>
                        <div className='flex flex-col'>
                            <h1 className='text-2xl font-bold'>
                                Controls
                            </h1>
                            <div className='flex justify-center'>
                                <img
                                    className='border border-violet-600  border-n-6 rounded-lg'
                                    src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Prescription02&hairColor=Blue&facialHairType=BeardLight&facialHairColor=Brown&clotheType=ShirtVNeck&clotheColor=Blue02&eyeType=Happy&eyebrowType=Default&mouthType=Twinkle&skinColor=Tanned"
                                    alt="Player control" />
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
