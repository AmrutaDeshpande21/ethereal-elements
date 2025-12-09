import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

import CartSidebar from '../cart/CartSidebar';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <CartSidebar />
            <main className="flex-1 pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
