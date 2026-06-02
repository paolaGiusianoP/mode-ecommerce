const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../src/models/Product');

// Datos de productos 
const productsData = [
  {
    productID: 1,
    frontImg: "/Assets/Products/product_1.jpg",
    backImg: "/Assets/Products/product_1-1.jpg",
    productName: "Cropped Faux Leather Jacket",
    productPrice: 29,
    productReviews: "8k+ reviews",
    category: "Jackets"
  },
  {
    productID: 2,
    frontImg: "/Assets/Products/product_2.jpg",
    backImg: "/Assets/Products/product_2-1.jpg",
    productName: "Calvin Shorts",
    productPrice: 62,
    productReviews: "2k+ reviews",
    category: "Shorts"
  },
  {
    productID: 3,
    frontImg: "/Assets/Products/product_3.jpg",
    backImg: "/Assets/Products/product_3-1.jpg",
    productName: "Shirt In Botanical Cheetah Print",
    productPrice: 60,
    productReviews: "7k+ reviews",
    category: "Shirts"
  },
  {
    productID: 4,
    frontImg: "/Assets/Products/product_4.jpg",
    backImg: "/Assets/Products/product_4-1.jpg",
    productName: "Cotton Jersey T-Shirt",
    productPrice: 17,
    productReviews: "5k+ reviews",
    category: "T-Shirts"
  },
  {
    productID: 5,
    frontImg: "/Assets/Products/product_5.jpg",
    backImg: "/Assets/Products/product_5-1.jpg",
    productName: "Cableknit Shawl",
    productPrice: 100,
    productReviews: "9k+ reviews",
    category: "Accessories"
  },
  {
    productID: 6,
    frontImg: "/Assets/Products/product_6.jpg",
    backImg: "/Assets/Products/product_6-1.jpg",
    productName: "Colorful Jacket",
    productPrice: 69,
    productReviews: "1k+ reviews",
    category: "Jackets"
  },
  {
    productID: 7,
    frontImg: "/Assets/Products/product_7.jpg",
    backImg: "/Assets/Products/product_7-1.jpg",
    productName: "Zessi Dresses",
    productPrice: 99,
    productReviews: "3k+ reviews",
    category: "Dresses"
  },
  {
    productID: 8,
    frontImg: "/Assets/Products/product_8.jpg",
    backImg: "/Assets/Products/product_8-1.jpg",
    productName: "Kirby T-Shirt",
    productPrice: 37,
    productReviews: "4k+ reviews",
    category: "T-Shirts"
  },
  {
    productID: 9,
    frontImg: "/Assets/LimitedEdition/limited-1.jpg",
    productName: "Radian Solitario",
    productPrice: 29,
    productReviews: "8k+ reviews",
    category: "Home"
  },
  {
    productID: 10,
    frontImg: "/Assets/LimitedEdition/limited-2.jpg",
    productName: "Gorra Top Gun 9TWENTY",
    productPrice: 32,
    productReviews: "5k+ reviews",
    category: "Home"
  },
  {
    productID: 11,
    frontImg: "/Assets/LimitedEdition/limited-3.jpg",
    productName: "Hermes Kelly 25 Retourne",
    productPrice: 86,
    productReviews: "1k+ reviews",
    category: "Home"
  },
  {
    productID: 12,
    frontImg: "/Assets/LimitedEdition/limited-4.jpg",
    productName: "Belt Saint Laurent",
    productPrice: 27,
    productReviews: "7k+ reviews",
    category: "Home"
  },
  {
    productID: 13,
    frontImg: "/Assets/LimitedEdition/limited-5.jpg",
    productName: "Seiko Astron HAB003J1",
    productPrice: 39,
    productReviews: "71+ reviews",
    category: "Accessories"
  }
];

async function migrateProducts() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    await Product.deleteMany({});

    // Insertar nuevos productos
    const productsToInsert = productsData.map(p => ({
      productName: p.productName,
      productPrice: p.productPrice,
      frontImg: p.frontImg,
      backImg: p.backImg || '',
      productReviews: p.productReviews,
      category: p.category,
      inStock: true,
      stockQuantity: 20
    }));

    const result = await Product.insertMany(productsToInsert);

    result.forEach(p => {
      console.log(`   - ${p.productName} ($${p.productPrice})`);
    });

  } catch (error) {
    console.error('Error en la migración:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log(' Desconectado de MongoDB');
  }
}

migrateProducts();