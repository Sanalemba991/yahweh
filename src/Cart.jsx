import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([0]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // Filter out items with 0 quantity
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div>
      <h1>Shopping Cart for Yahweh</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              <h2>{product.title}</h2>
              <img src={product.image} alt={product.title} width="100" />
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <button onClick={() => removeFromCart(product.id)}>Remove</button>
              <button onClick={() => increaseQuantity(product.id)}>+</button>
              <button onClick={() => decreaseQuantity(product.id)}>-</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={clearCart}>Clear Cart</button>
      <button onClick={() => navigate("/")}>Continue Shopping</button>
    </div>
  );
};

export default Cart;
