import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./util";

const CartPage = ({ cart, setCart }) => {
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== productId));
    handleSuccess(`you item is removed from cart successfully`)
  };

  const totalCost = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Handle checkout logic here
    // alert('Checkout functionality to be implemented!');
    
    handleSuccess('your order is placed and cart is now empty...happy shpooing');
    setCart([])
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <div className="cart">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item._id} className="cart-item">
              <h2>{item.name}</h2>
              <img src='https://via.placeholder.com/150' />
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <>
          <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
      <Link to="/">
        <button>Continue Shopping</button>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default CartPage;
