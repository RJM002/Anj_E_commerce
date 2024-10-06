import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductDetail.css'; // Import CSS for styling

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [review, setReview] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId'); // Replace with actual user ID, e.g., from context or state
            const rating = 5; // Replace with the rating value (you might need to get this from a rating input)
            
            await axios.post(`http://localhost:8080/api/reviews/review/${id}`, {productId: id,userId, rating, comment: review });
            setReview('');
    
            // Refresh product data to display new review
            const response = await axios.get(`http://localhost:8080/api/products/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    if (!product) return <div className="loading">Loading...</div>;

    return (
        <div className="product-detail">
            <div className="product-header">
                <h1>{product.name}</h1>
                <img src={product.image || 'https://via.placeholder.com/500'} alt={product.name} className="product-image" />
            </div>
            <div className="product-info">
                <p>{product.description}</p>
                <p className="product-price">${product.price}</p>
            </div>

            <div className="reviews-section">
                <h2>Customer Reviews</h2>
                <div className="reviews">
                    {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((rev, index) => (
                            <div key={index} className="review">
                                <p>{rev}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>

                <form onSubmit={handleReviewSubmit} className="review-form">
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write a review..."
                        className="review-input"
                    />
                    <button type="submit" className="submit-review">Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default ProductDetail;
