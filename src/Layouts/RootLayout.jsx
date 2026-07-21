import React from 'react';
import Nav from '../Component/Nav/Nav';
import { Outlet } from 'react-router';
import Foot from '../Component/Foot/Foot';

const RootLayout = () => {
    return (
        <div className='flex flex-col min-h-screen overflow-hidden'>
           <Nav></Nav>
           <main className='flex-1 w-full max-w-7xl mx-auto px-4 md:px-6'>
                <Outlet></Outlet>
           </main>
           <Foot></Foot>
        </div>
    );
};

export default RootLayout;