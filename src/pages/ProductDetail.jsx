import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllProducts, getProductById } from '../services/api';
import { formatPrice } from '../utils/helpers';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Optimized: Fetch only the specific product
                const data = await getProductById(id);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error loading product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-pastel-purple border-t-transparent"></div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                    <p className="text-dark-grey">Sorry, we couldn't find the product you're looking for.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="flex items-center justify-center">
                    <img
                        src={product.image_link}
                        alt={product.name}
                        className="max-w-full h-auto rounded-3xl shadow-pastel-lg"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                        }}
                    />
                </div>

                {/* Product Info */}
                <div className="glass rounded-3xl p-8">
                    <div className="mb-4">
                        <span className="bg-gradient-soft px-4 py-2 rounded-full text-sm text-dark-grey">
                            {product.product_type || 'Product'}
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold mb-4 gradient-text-pink-purple">
                        {product.name}
                    </h1>

                    <p className="text-xl text-dark-grey mb-6">{product.brand || 'Unknown Brand'}</p>

                    <div className="mb-8">
                        <div className="relative inline-block">
                            <div className="absolute bg-gradient-pink-purple h-16 w-16 rounded-full -z-10 opacity-30"></div>
                            <p className="text-4xl font-bold text-pastel-purple pl-4 pt-2">
                                ${formatPrice(product.price || '0')}
                            </p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-bold text-lg mb-3">Description</h3>
                        <p className="text-dark-grey leading-relaxed">
                            {product.description || 'No description available for this product.'}
                        </p>
                    </div>

                    {product.product_colors && product.product_colors.length > 0 && (
                        <div className="mb-8">
                            <h3 className="font-bold text-lg mb-3">Available Colors</h3>
                            <div className="flex gap-2 flex-wrap">
                                {product.product_colors.slice(0, 10).map((color, index) => (
                                    <div
                                        key={index}
                                        className="w-10 h-10 rounded-full border-2 border-gray-300"
                                        style={{ backgroundColor: color.hex_value }}
                                        title={color.colour_name}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleAddToCart}
                        className={`w-full py-4 rounded-full font-medium text-lg transform hover:scale-105 transition-all duration-300 ${added
                            ? 'bg-green-500 text-white shadow-green-lg'
                            : 'bg-gradient-pink-purple text-white hover:shadow-pastel-lg'
                            }`}
                    >
                        {added ? 'Added to Cart!' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
