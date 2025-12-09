import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';

const CartSidebar = () => {
    const {
        cart,
        isCartOpen,
        closeCart,
        removeFromCart,
        updateQuantity,
        getCartTotalPrice
    } = useCart();

    const navigate = useNavigate();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                onClick={closeCart}
            ></div>

            {/* Sidebar panel */}
            <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
                <div className="h-full w-full bg-white/90 backdrop-blur-md shadow-2xl flex flex-col animate-slide-in">

                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white/50">
                        <h2 className="text-xl font-bold gradient-text-pink-purple">Your Cart</h2>
                        <button
                            onClick={closeCart}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                    <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
                                    <p className="text-sm text-gray-500 mt-1">Looks like you haven't added anything yet.</p>
                                </div>
                                <button
                                    onClick={closeCart}
                                    className="mt-4 px-6 py-2 bg-gradient-pink-purple text-white rounded-full hover:shadow-pastel transition-all"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 bg-white/50 p-4 rounded-2xl hover:shadow-sm transition-shadow">
                                        {/* Image */}
                                        <div className="w-20 h-20 flex-shrink-0 bg-white rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center">
                                            <img
                                                src={item.image_link}
                                                alt={item.name}
                                                className="max-w-full max-h-full object-contain"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                                }}
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                                                <p className="text-sm text-gray-500 capitalize">{item.brand}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 px-2 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-pastel-purple"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-pastel-purple"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <p className="font-bold text-pastel-purple">
                                                    ${formatPrice((parseFloat(item.price) || 0) * item.quantity)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Remove */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-1 self-start"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="p-6 bg-white/80 border-t border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-2xl font-bold gradient-text-pink-purple">
                                    ${formatPrice(getCartTotalPrice())}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mb-6 text-center">
                                Shipping and taxes calculated at checkout.
                            </p>
                            <button
                                className="w-full bg-gradient-pink-purple text-white py-4 rounded-xl font-bold shadow-pastel hover:shadow-pastel-lg transform hover:-translate-y-1 transition-all"
                                onClick={() => {
                                    closeCart();
                                    navigate('/checkout');
                                }}
                            >
                                Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;
