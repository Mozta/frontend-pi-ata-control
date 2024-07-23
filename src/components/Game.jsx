import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Controls } from './Controls';
import { Viewer } from './Viewer';

export const Game = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { role, name } = location.state || {};

    // Si no hay role o name, redirigimos al usuario a una ruta segura, por ejemplo, la página de inicio
    React.useEffect(() => {
        if (!role || !name) {
            navigate('/');
        }
    }, [role, name, navigate]);

    return (
        <div className="flex flex-col mt-5 justify-center items-center min-h-screen text-center">
            {role === 'controller' ? <Controls username={name} /> : <Viewer username={name} />}
        </div>
    );
};
