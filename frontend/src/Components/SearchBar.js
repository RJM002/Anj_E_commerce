import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setProduct }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/products/search`, {
                params: { query: searchTerm }
            });
            setProduct(response.data); // Assuming you have a setProducts function to update the product list
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <form onSubmit={handleSearch} style={{ textAlign: 'center', marginBottom: '20px' }}>
            <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', width: '300px', marginRight: '10px' }}
            />
            <button type="submit" style={{ padding: '10px 15px' }}>Search</button>
        </form>
    );
};

export default SearchBar;
