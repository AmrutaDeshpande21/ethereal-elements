import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { getCartTotal, toggleCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong shadow-pastel' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold gradient-text-pink-purple">
                    Ethereal Elements
                </Link>

                <div className="flex items-center gap-8">
                    <Link
                        to="/"
                        className="text-gray-700 hover:text-pastel-purple transition-colors duration-300 font-medium"
                    >
                        Home
                    </Link>
                    <Link
                        to="/products"
                        className="text-gray-700 hover:text-pastel-purple transition-colors duration-300 font-medium"
                    >
                        Products
                    </Link>
                    <Link
                        to="/about"
                        className="text-gray-700 hover:text-pastel-purple transition-colors duration-300 font-medium"
                    >
                        About
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search Input */}
                    <div className={`relative flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-10'}`}>
                        {isSearchOpen && (
                            <form onSubmit={handleSearchSubmit} className="w-full absolute right-0">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-pastel-purple bg-white/80 backdrop-blur-sm"
                                    autoFocus
                                />
                            </form>
                        )}
                        <button
                            className={`p-2 hover:bg-pastel-pink/20 rounded-full transition-colors z-10 ${isSearchOpen ? 'absolute right-0' : ''}`}
                            onClick={() => {
                                if (isSearchOpen && searchQuery) {
                                    handleSearchSubmit({ preventDefault: () => { } });
                                } else {
                                    setIsSearchOpen(!isSearchOpen);
                                }
                            }}
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    <button
                        className="p-2 hover:bg-pastel-pink/20 rounded-full transition-colors relative"
                        onClick={toggleCart}
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {getCartTotal() > 0 && (
                            <span className="absolute -top-1 -right-1 bg-gradient-pink-purple text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                                {getCartTotal()}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
