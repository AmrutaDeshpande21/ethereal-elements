import axios from 'axios';

const API_BASE_URL = 'https://makeup-api.herokuapp.com/api/v1';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Get all products
export const getAllProducts = async () => {
    try {
        const response = await api.get('/products.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Get products by brand
export const getProductsByBrand = async (brand) => {
    try {
        const response = await api.get(`/products.json?brand=${brand}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by brand:', error);
        throw error;
    }
};

// Get products by type
export const getProductsByType = async (type) => {
    try {
        const response = await api.get(`/products.json?product_type=${type}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by type:', error);
        throw error;
    }
};

// Get product by ID
export const getProductById = async (id) => {
    try {
        // Makeup API doesn't have a reliable single product endpoint that matches our ID structure perfectly 
        // in all cases (endpoints vary), but usually it's /products/{id}.json
        // Let's try to fetch specific product or fallback to filtering if needed.
        // For this API, the ID is standard.
        const response = await api.get(`/products/${id}.json`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
    }
};

// Get products with filters
export const getFilteredProducts = async (filters = {}) => {
    try {
        const params = new URLSearchParams();

        if (filters.brand) params.append('brand', filters.brand);
        if (filters.product_type) params.append('product_type', filters.product_type);
        if (filters.product_tags) params.append('product_tags', filters.product_tags);

        const response = await api.get(`/products.json?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching filtered products:', error);
        throw error;
    }
};

export default api;
