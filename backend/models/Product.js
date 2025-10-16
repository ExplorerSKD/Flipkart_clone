const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot be more than 200 characters']
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Electronics', 'Fashion', 'Books', 'Home & Kitchen', 'Sports', 'Beauty']
  },
  subcategory: {
    type: String,
    required: [true, 'Subcategory is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    required: [true, 'Original price is required'],
    min: [0, 'Original price cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot be more than 100%']
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot be more than 5']
  },
  reviews: {
    type: Number,
    default: 0,
    min: [0, 'Reviews count cannot be negative']
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  images: [{
    type: String
  }],
  features: [{
    type: String,
    required: true
  }],
  specifications: {
    type: Map,
    of: String
  },
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 0,
    min: [0, 'Stock quantity cannot be negative']
  },
  fastDelivery: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String
  }],
  seller: {
    type: String,
    default: 'Flipkart'
  },
  warranty: {
    type: String,
    default: 'No warranty'
  },
  returnPolicy: {
    type: String,
    default: '7 days return policy'
  }
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({
  name: 'text',
  brand: 'text',
  category: 'text',
  description: 'text'
});

// Virtual for discount calculation
productSchema.virtual('discountAmount').get(function() {
  return this.originalPrice - this.price;
});

// Calculate discount percentage
productSchema.pre('save', function(next) {
  if (this.originalPrice && this.price) {
    this.discount = Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);