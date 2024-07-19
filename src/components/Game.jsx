import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Controls } from './Controls';
import { Viewer } from './Viewer';

export const Game = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { role, name } = location.state || {};

    return (
        <>
            <div className="flex flex-col mt-5 justify-center items-center min-h-screen text-center">
                {role === 'controller' ? <Controls username={name} /> : <Viewer username={name} />}
                {/* <button
                    className="bg-primary text-light px-10 py-2 rounded-full mt-5 w-full hover:bg-primary-dark"
                    onClick={() => navigate('/')}
                >
                    Back
                </button> */}
            </div>
        </>
    )
}
