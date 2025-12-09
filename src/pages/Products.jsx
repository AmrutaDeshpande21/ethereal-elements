import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllProducts, getProductsByBrand } from '../services/api';
import { getUniqueBrands, getUniqueTypes, filterByPriceRange } from '../utils/helpers';
import ProductCard from '../components/products/ProductCard';

const Products = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        brand: '',
        type: '',
        minPrice: 0,
        maxPrice: 100,
    });

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

    const [brands, setBrands] = useState([]);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch Maybelline products for better quality images and faster load
                const data = await getProductsByBrand('maybelline');

                // Filter out products with missing or invalid image links
                const validData = data.filter(product =>
                    product.image_link &&
                    product.image_link.length > 0 &&
                    !product.image_link.includes('default')
                );

                // Limit to first 20 products for performance
                const limitedData = validData.slice(0, 20);

                setAllProducts(limitedData);
                setFilteredProducts(limitedData);
                setBrands(getUniqueBrands(limitedData));
                setTypes(getUniqueTypes(limitedData));
                setLoading(false);
            } catch (error) {
                console.error('Error loading products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const [searchParams] = useSearchParams(); // Needs import at top
    const searchQuery = searchParams.get('search');

    useEffect(() => {
        let filtered = [...allProducts];

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.name?.toLowerCase().includes(lowerQuery) ||
                p.brand?.toLowerCase().includes(lowerQuery) ||
                p.product_type?.toLowerCase().includes(lowerQuery) ||
                p.category?.toLowerCase().includes(lowerQuery)
            );
        }

        if (filters.brand) {
            filtered = filtered.filter(p => p.brand === filters.brand);
        }

        if (filters.type) {
            filtered = filtered.filter(p => p.product_type === filters.type);
        }

        filtered = filterByPriceRange(filtered, filters.minPrice, filters.maxPrice);

        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset to first page on filter change
    }, [filters, allProducts, searchQuery]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-pastel-purple border-t-transparent"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">
                    <span className="gradient-text">All</span> Products
                </h1>
                <p className="text-dark-grey">Browse our complete collection of beauty products</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                    <div className="glass rounded-2xl p-6 sticky top-24">
                        <h3 className="font-bold text-lg mb-4 gradient-text-pink-purple">Filters</h3>

                        {/* Brand Filter */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2 text-sm">Brand</label>
                            <select
                                value={filters.brand}
                                onChange={(e) => handleFilterChange('brand', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pastel-purple"
                            >
                                <option value="">All Brands</option>
                                {brands.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                        </div>

                        {/* Type Filter */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2 text-sm">Product Type</label>
                            <select
                                value={filters.type}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pastel-purple"
                            >
                                <option value="">All Types</option>
                                {types.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price Range */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2 text-sm">Price Range</label>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="number"
                                    value={filters.minPrice}
                                    onChange={(e) => handleFilterChange('minPrice', parseFloat(e.target.value))}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pastel-purple"
                                    placeholder="Min"
                                />
                                <span>-</span>
                                <input
                                    type="number"
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange('maxPrice', parseFloat(e.target.value))}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pastel-purple"
                                    placeholder="Max"
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => setFilters({ brand: '', type: '', minPrice: 0, maxPrice: 100 })}
                            className="w-full bg-gradient-pink-purple text-white py-2 rounded-lg hover:shadow-pastel transition-shadow"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="lg:col-span-3">
                    <div className="mb-4 text-dark-grey flex justify-between items-center">
                        <span>Showing {filteredProducts.length} products</span>
                        <span className="text-sm">Page {currentPage} of {totalPages}</span>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-dark-grey">No products found matching your filters</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-12 gap-2">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 rounded-lg transition-colors ${currentPage === 1
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-pastel-purple hover:bg-pastel-purple hover:text-white shadow-sm'
                                            }`}
                                    >
                                        Previous
                                    </button>

                                    {[...Array(totalPages)].map((_, index) => {
                                        // Only show current page, first, last, and surrounding pages
                                        if (
                                            index + 1 === 1 ||
                                            index + 1 === totalPages ||
                                            (index + 1 >= currentPage - 1 && index + 1 <= currentPage + 1)
                                        ) {
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => paginate(index + 1)}
                                                    className={`w-10 h-10 rounded-lg transition-colors ${currentPage === index + 1
                                                        ? 'bg-gradient-pink-purple text-white shadow-pastel'
                                                        : 'bg-white text-pastel-purple hover:bg-pastel-purple hover:text-white shadow-sm'
                                                        }`}
                                                >
                                                    {index + 1}
                                                </button>
                                            );
                                        } else if (
                                            (index + 1 === currentPage - 2 && currentPage > 3) ||
                                            (index + 1 === currentPage + 2 && currentPage < totalPages - 2)
                                        ) {
                                            return <span key={index} className="px-2 self-end">...</span>;
                                        }
                                        return null;
                                    })}

                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 rounded-lg transition-colors ${currentPage === totalPages
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-pastel-purple hover:bg-pastel-purple hover:text-white shadow-sm'
                                            }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;
