import React from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export const Header = () => {
    const navigate = useNavigate();
    
    return (
        <div className="fixed top-0 z-50 w-full bg-n-8/90 backdrop-blur-sm border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm">
            <div className='flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-4'>
                <a className='flex items-center' href='/'>
                    <img src={logo} alt="PinataFab" className="h-12" />
                    <h1 className='text-2xl font-medium ml-2'>
                        PinataFab
                    </h1>
                </a>
                <nav className='flex space-x-6'>
                    <a className='text-lg  hover:text-gray-400' href='/tutorial'>Tutorial</a>
                    <a className='text-lg  hover:text-gray-400' href='/settings'>Settings</a>
                    <a className='text-lg  hover:text-gray-400' href='/help'>Help</a>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </nav>
            </div>
        </div>
    );
}
