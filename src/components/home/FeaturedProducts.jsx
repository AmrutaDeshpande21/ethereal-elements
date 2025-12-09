import React, { useState, useEffect } from 'react';
import { getProductsByBrand } from '../../services/api';
import ProductCard from '../products/ProductCard';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Optimize: Fetch specific brand instead of all products
                const data = await getProductsByBrand('maybelline');
                setProducts(data.slice(0, 8)); // Get first 8 products
                setLoading(false);
            } catch (error) {
                console.error('Error loading products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-pastel-purple border-t-transparent"></div>
                </div>
            </div>
        );
    }

    return (
        <section className="container mx-auto px-4 py-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                    <span className="gradient-text">Featured</span> Products
                </h2>
                <p className="text-dark-grey">Discover our most popular beauty essentials</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;
