import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Header.css';

const Header = ({ cartCount, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality handled in Home component
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const handleCategoryClick = (category) => {
    navigate(`/?category=${encodeURIComponent(category)}`);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">Flipkart</span>
          <span className="logo-subtitle">Explore Plus</span>
        </Link>
        
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </form>

        <div className="header-actions">
          {!isAuthenticated ? (
            <Link to="/login" className="header-link">
              Login
            </Link>
          ) : (
            <div className="user-menu" onClick={() => setShowUserMenu(!showUserMenu)}>
              <span className="user-greeting">Hello, {user?.name}</span>
              <span className="dropdown-arrow">▼</span>
              {showUserMenu && (
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    My Profile
                  </Link>
                  <Link to="/orders" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    My Orders
                  </Link>
                  <Link to="/wishlist" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    Wishlist
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Cart</span>
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </Link>

          <div className="more-dropdown">
            <span className="more-text">More ▼</span>
            <div className="dropdown-content">
              <a href="#notifications">Notifications</a>
              <a href="#customer-care">Customer Care</a>
              <a href="#advertise">Advertise</a>
              <a href="#download-app">Download App</a>
            </div>
          </div>
        </div>
      </div>
      
      <nav className="nav-categories">
        <button className="category-btn" onClick={() => handleCategoryClick('Electronics')}>Electronics</button>
        <button className="category-btn" onClick={() => handleCategoryClick('Fashion')}>Fashion</button>
        <button className="category-btn" onClick={() => handleCategoryClick('Home & Kitchen')}>Home & Kitchen</button>
        <button className="category-btn" onClick={() => handleCategoryClick('Books')}>Books</button>
        <button className="category-btn" onClick={() => handleCategoryClick('Sports')}>Sports</button>
        <button className="category-btn" onClick={() => handleCategoryClick('Beauty')}>Beauty</button>
        <button className="category-btn" onClick={() => navigate('/')}>All Products</button>
      </nav>
    </header>
  );
};

export default Header;