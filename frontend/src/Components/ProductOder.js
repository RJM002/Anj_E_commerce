import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useNavigate  } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./util";
import './Product.css'
const ProductList = ({cart,setCart,product,setProduct}) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

//   const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8080/api/products/products'); // Adjust the URL accordingly
  //       console.log('checking product response',response)
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  const handleAddToCart = (product) => {

      setCart((prevCart) => {
          const existingProduct = prevCart.find(item => item._id === product._id);
          if (existingProduct) {
              return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
    }
    const cartData=[...prevCart, { ...product, quantity: 1 }]
    handleSuccess(`${product.name} is added to your cart`)
    console.log('rohit handleAddToCart product',cartData)
      return cartData;
    });
};

const viewProductDetail = (productId) => {
  const id=productId
  if (productId) {
    navigate(`/product/${id}`);
}
};

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-list">
        {product.map(product => (
          <div key={product._id} className="product-card">
            <h2>{product.name}</h2>
            <img src='https://via.placeholder.com/150' alt={product.name} />
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <button onClick={() => viewProductDetail(product._id)}>View Product</button>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <Link to="/cart">
        <button>View Cart</button>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default ProductList;
