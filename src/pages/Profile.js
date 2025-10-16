import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Profile.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || '',
      country: user?.address?.country || 'India'
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData);
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zipCode: user?.address?.zipCode || '',
        country: user?.address?.country || 'India'
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your personal information</p>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="user-info">
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>
              </div>
            </div>
            
            <nav className="profile-nav">
              <button className="nav-item active">Personal Information</button>
              <button className="nav-item">Manage Addresses</button>
              <button className="nav-item">PAN Card Information</button>
            </nav>
          </div>

          <div className="profile-main">
            <div className="profile-section">
              <div className="section-header">
                <h2>Personal Information</h2>
                {!isEditing ? (
                  <button 
                    className="edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button 
                      className="cancel-btn"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button 
                      className="save-btn"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    ) : (
                      <div className="form-value">{user?.name}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Mobile Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="form-input"
                        pattern="[0-9]{10}"
                        maxLength="10"
                      />
                    ) : (
                      <div className="form-value">{user?.phone}</div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  ) : (
                    <div className="form-value">{user?.email}</div>
                  )}
                </div>

                <div className="address-section">
                  <h3>Address Information</h3>
                  
                  <div className="form-group">
                    <label>Street Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                        className="form-input"
                      />
                    ) : (
                      <div className="form-value">{user?.address?.street || 'Not provided'}</div>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleChange}
                          className="form-input"
                        />
                      ) : (
                        <div className="form-value">{user?.address?.city || 'Not provided'}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>State</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address.state"
                          value={formData.address.state}
                          onChange={handleChange}
                          className="form-input"
                        />
                      ) : (
                        <div className="form-value">{user?.address?.state || 'Not provided'}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>ZIP Code</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address.zipCode"
                          value={formData.address.zipCode}
                          onChange={handleChange}
                          className="form-input"
                          pattern="[0-9]{6}"
                          maxLength="6"
                        />
                      ) : (
                        <div className="form-value">{user?.address?.zipCode || 'Not provided'}</div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;