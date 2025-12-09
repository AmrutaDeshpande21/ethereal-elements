// Filter products by price range
export const filterByPriceRange = (products, minPrice, maxPrice) => {
    return products.filter(product => {
        const price = parseFloat(product.price);
        return price >= minPrice && price <= maxPrice;
    });
};

// Get unique brands from products
export const getUniqueBrands = (products) => {
    const brands = products.map(p => p.brand).filter(Boolean);
    return [...new Set(brands)].sort();
};

// Get unique product types
export const getUniqueTypes = (products) => {
    const types = products.map(p => p.product_type).filter(Boolean);
    return [...new Set(types)].sort();
};

// Format price
export const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};
