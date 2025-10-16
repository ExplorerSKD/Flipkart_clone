import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import '../styles/Orders.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/my`);
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return '#388e3c';
      case 'Shipped':
        return '#1976d2';
      case 'Processing':
        return '#f57c00';
      case 'Pending':
        return '#fbc02d';
      case 'Cancelled':
        return '#d32f2f';
      default:
        return '#757575';
    }
  };

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading">
          <h2>Loading your orders...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={fetchOrders} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-wrapper">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>View and track your order history</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon">📦</div>
            <h2>No orders yet</h2>
            <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
            <Link to="/" className="shop-now-btn">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <div className="order-id">
                      <strong>Order #{order.trackingNumber}</strong>
                    </div>
                    <div className="order-date">
                      Ordered on {formatDate(order.createdAt)}
                    </div>
                  </div>
                  <div className="order-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-price">
                          {formatPrice(item.price)} × {item.quantity}
                        </p>
                      </div>
                      <div className="item-total">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-summary">
                  <div className="summary-row">
                    <span>Items:</span>
                    <span>{formatPrice(order.itemsPrice)}</span>
                  </div>
                  {order.taxPrice > 0 && (
                    <div className="summary-row">
                      <span>Tax:</span>
                      <span>{formatPrice(order.taxPrice)}</span>
                    </div>
                  )}
                  {order.shippingPrice > 0 && (
                    <div className="summary-row">
                      <span>Shipping:</span>
                      <span>{formatPrice(order.shippingPrice)}</span>
                    </div>
                  )}
                  <div className="summary-row total">
                    <span><strong>Total:</strong></span>
                    <span><strong>{formatPrice(order.totalPrice)}</strong></span>
                  </div>
                </div>

                <div className="order-actions">
                  <Link 
                    to={`/orders/${order._id}`} 
                    className="view-details-btn"
                  >
                    View Details
                  </Link>
                  
                  {order.status === 'Delivered' && (
                    <button className="review-btn">
                      Write Review
                    </button>
                  )}
                  
                  {(order.status === 'Pending' || order.status === 'Processing') && (
                    <button className="cancel-btn">
                      Cancel Order
                    </button>
                  )}
                </div>

                {order.shippingAddress && (
                  <div className="shipping-address">
                    <h5>Shipping Address:</h5>
                    <p>
                      {order.shippingAddress.name}<br />
                      {order.shippingAddress.street}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                      {order.shippingAddress.country}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;