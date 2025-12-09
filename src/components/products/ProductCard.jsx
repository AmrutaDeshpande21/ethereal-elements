import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, truncateText } from '../../utils/helpers';

const ProductCard = ({ product }) => {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Ensure image URL uses HTTPS
    const getSecureImageUrl = (url) => {
        if (!url) return null;
        return url.replace('http://', 'https://');
    };

    const imageUrl = getSecureImageUrl(product.image_link);

    return (
        <Link
            to={`/product/${product.id}`}
            className="glass rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-pastel-lg group flex flex-col h-full"
        >
            <div className="relative mb-4 h-48 flex items-center justify-center overflow-hidden rounded-xl bg-white/50">
                {isLoading && !imageError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-pastel-purple border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {!imageError ? (
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className={`max-h-full max-w-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setIsLoading(false)}
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1522335789203-abd7fe01d169?q=80&w=300&auto=format&fit=crop';
                            // If the fallback also fails, show the SVG placeholder
                            e.target.onerror = () => {
                                setImageError(true);
                                setIsLoading(false);
                            };
                        }}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                        <svg className="w-12 h-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs">No Image</span>
                    </div>
                )}
            </div>

            <div className="flex-grow flex flex-col justify-between">
                <div>
                    <p className="gradient-text-pink-purple font-bold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                        {truncateText(product.name, 40)}
                    </p>

                    <p className="text-dark-grey text-sm mb-3">{product.brand || 'Unknown Brand'}</p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div className="relative">
                        <div className="absolute bg-gradient-pink-purple h-10 w-10 rounded-full -z-10 opacity-30"></div>
                        <p className="font-bold text-lg text-pastel-purple pl-2 pt-1">
                            ${formatPrice(product.price || '0')}
                        </p>
                    </div>

                    <span className="text-xs bg-gradient-soft px-3 py-1 rounded-full text-dark-grey capitalize">
                        {product.product_type?.replace('_', ' ') || 'Product'}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
