const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');

// Load environment variables
const path = require('path');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const products = [
  {
    name: "iPhone 14 Pro",
    brand: "Apple",
    category: "Electronics",
    subcategory: "Mobile",
    price: 89900,
    originalPrice: 99900,
    rating: 4.5,
    reviews: 1256,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    description: "Latest iPhone with A16 Bionic chip and Pro camera system",
    features: ["A16 Bionic chip", "Pro camera system", "6.1-inch display", "5G enabled"],
    inStock: true,
    stockQuantity: 50,
    fastDelivery: true
  },
  {
    name: "Samsung Galaxy S23 Ultra",
    brand: "Samsung",
    category: "Electronics",
    subcategory: "Mobile",
    price: 79999,
    originalPrice: 89999,
    rating: 4.4,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
    description: "Premium Android smartphone with S Pen and advanced camera",
    features: ["200MP camera", "S Pen included", "6.8-inch display", "5G enabled"],
    inStock: true,
    stockQuantity: 30,
    fastDelivery: true
  },
  {
    name: "MacBook Air M2",
    brand: "Apple",
    category: "Electronics",
    subcategory: "Laptop",
    price: 114900,
    originalPrice: 119900,
    rating: 4.7,
    reviews: 543,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
    description: "Lightweight laptop with M2 chip and all-day battery life",
    features: ["M2 chip", "13.6-inch display", "Up to 18hrs battery", "8GB RAM"],
    inStock: true,
    stockQuantity: 25,
    fastDelivery: false
  },
  {
    name: "Dell XPS 13",
    brand: "Dell",
    category: "Electronics",
    subcategory: "Laptop",
    price: 89999,
    originalPrice: 94999,
    rating: 4.3,
    reviews: 324,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    description: "Compact laptop with Intel Core i7 and premium build quality",
    features: ["Intel Core i7", "13.3-inch FHD", "16GB RAM", "512GB SSD"],
    inStock: true,
    stockQuantity: 20,
    fastDelivery: true
  },
  {
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Electronics",
    subcategory: "Headphones",
    price: 29990,
    originalPrice: 34990,
    rating: 4.6,
    reviews: 789,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
    description: "Premium noise-cancelling wireless headphones",
    features: ["Active Noise Cancelling", "30hr battery", "Quick charge", "Bluetooth 5.2"],
    inStock: true,
    stockQuantity: 100,
    fastDelivery: true
  },
  {
    name: "Nike Air Force 1",
    brand: "Nike",
    category: "Fashion",
    subcategory: "Shoes",
    price: 7495,
    originalPrice: 8995,
    rating: 4.2,
    reviews: 1432,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    description: "Classic basketball shoes with timeless design",
    features: ["Leather upper", "Air-Sole unit", "Classic design", "Multiple colors"],
    inStock: true,
    stockQuantity: 200,
    fastDelivery: true
  },
  {
    name: "Levi's 501 Original Jeans",
    brand: "Levi's",
    category: "Fashion",
    subcategory: "Clothing",
    price: 2999,
    originalPrice: 3499,
    rating: 4.1,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    description: "Original straight fit jeans in classic blue denim",
    features: ["100% Cotton", "Straight fit", "Classic 5-pocket", "Button fly"],
    inStock: true,
    stockQuantity: 150,
    fastDelivery: false
  },
  {
    name: "The Alchemist",
    brand: "HarperCollins",
    category: "Books",
    subcategory: "Fiction",
    price: 199,
    originalPrice: 299,
    rating: 4.8,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    description: "Paulo Coelho's masterpiece about following your dreams",
    features: ["Bestseller", "Inspirational", "163 pages", "Paperback"],
    inStock: true,
    stockQuantity: 500,
    fastDelivery: true
  },
  {
    name: "Samsung 55\" 4K Smart TV",
    brand: "Samsung",
    category: "Electronics",
    subcategory: "TV",
    price: 49999,
    originalPrice: 59999,
    rating: 4.3,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
    description: "4K UHD Smart TV with HDR and built-in streaming apps",
    features: ["4K UHD", "HDR10+", "Smart TV", "Multiple HDMI ports"],
    inStock: true,
    stockQuantity: 15,
    fastDelivery: false
  },
  {
    name: "Instant Pot Duo 7-in-1",
    brand: "Instant Pot",
    category: "Home & Kitchen",
    subcategory: "Appliances",
    price: 7999,
    originalPrice: 9999,
    rating: 4.5,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    description: "Multi-functional electric pressure cooker",
    features: ["7-in-1 functions", "6L capacity", "Safe pressure cooking", "Easy cleanup"],
    inStock: true,
    stockQuantity: 75,
    fastDelivery: true
  }
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany();
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    // Create admin user if it doesn't exist
    const adminExists = await User.findOne({ email: 'admin@flipkart.com' });
    if (!adminExists) {
      const adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@flipkart.com',
        password: 'admin123',
        phone: '9999999999',
        role: 'admin',
        address: {
          street: 'Admin Street',
          city: 'Bangalore',
          state: 'Karnataka',
          zipCode: '560001',
          country: 'India'
        }
      });
      console.log('Admin user created:', adminUser.email);
    }

    console.log('Database seeding completed!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedProducts();