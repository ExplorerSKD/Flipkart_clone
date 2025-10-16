import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = ({ cartItems, updateQuantity, removeFromCart, totalPrice }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateSavings = () => {
    return cartItems.reduce((savings, item) => {
      const itemSavings = (item.originalPrice - item.price) * item.quantity;
      return savings + itemSavings;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <div className="empty-cart-content">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <div className="cart-header">
          <h1>My Cart ({getTotalItems()} items)</h1>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <Link 
                    to={`/product/${item.id}`} 
                    className="item-name"
                  >
                    {item.name}
                  </Link>
                  <p className="item-brand">{item.brand}</p>
                  
                  <div className="item-features">
                    {item.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="item-pricing">
                  <div className="current-price">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                  {item.originalPrice > item.price && (
                    <div className="original-price">
                      {formatPrice(item.originalPrice * item.quantity)}
                    </div>
                  )}
                  {item.discount > 0 && (
                    <div className="savings">
                      You save {formatPrice((item.originalPrice - item.price) * item.quantity)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Price Details</h3>
              
              <div className="summary-row">
                <span>Price ({getTotalItems()} items)</span>
                <span>{formatPrice(totalPrice + calculateSavings())}</span>
              </div>
              
              <div className="summary-row discount">
                <span>Discount</span>
                <span>-{formatPrice(calculateSavings())}</span>
              </div>
              
              <div className="summary-row">
                <span>Delivery Charges</span>
                <span className="free">Free</span>
              </div>
              
              <hr />
              
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              
              {calculateSavings() > 0 && (
                <div className="total-savings">
                  You will save {formatPrice(calculateSavings())} on this order
                </div>
              )}
              
              <button className="place-order-btn">
                PLACE ORDER
              </button>
            </div>

            <div className="offers-card">
              <h4>Available Offers</h4>
              <div className="offer">
                <span className="offer-icon">💳</span>
                <span>10% Instant Discount on SBI Credit Cards</span>
              </div>
              <div className="offer">
                <span className="offer-icon">🏦</span>
                <span>No Cost EMI available</span>
              </div>
              <div className="offer">
                <span className="offer-icon">🎁</span>
                <span>Free delivery on orders above ₹500</span>
              </div>
            </div>
          </div>
        </div>

        <div className="continue-shopping">
          <Link to="/" className="continue-shopping-link">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;