const API_URL = 'http://localhost:5000/api';

const imageMap = {
  '/Assets/Products/product_1.jpg': require('../Assets/Products/product_1.jpg'),
  '/Assets/Products/product_1-1.jpg': require('../Assets/Products/product_1-1.jpg'),
  '/Assets/Products/product_2.jpg': require('../Assets/Products/product_2.jpg'),
  '/Assets/Products/product_2-1.jpg': require('../Assets/Products/product_2-1.jpg'),
  '/Assets/Products/product_3.jpg': require('../Assets/Products/product_3.jpg'),
  '/Assets/Products/product_3-1.jpg': require('../Assets/Products/product_3-1.jpg'),
  '/Assets/Products/product_4.jpg': require('../Assets/Products/product_4.jpg'),
  '/Assets/Products/product_4-1.jpg': require('../Assets/Products/product_4-1.jpg'),
  '/Assets/Products/product_5.jpg': require('../Assets/Products/product_5.jpg'),
  '/Assets/Products/product_5-1.jpg': require('../Assets/Products/product_5-1.jpg'),
  '/Assets/Products/product_6.jpg': require('../Assets/Products/product_6.jpg'),
  '/Assets/Products/product_6-1.jpg': require('../Assets/Products/product_6-1.jpg'),
  '/Assets/Products/product_7.jpg': require('../Assets/Products/product_7.jpg'),
  '/Assets/Products/product_7-1.jpg': require('../Assets/Products/product_7-1.jpg'),
  '/Assets/Products/product_8.jpg': require('../Assets/Products/product_8.jpg'),
  '/Assets/Products/product_8-1.jpg': require('../Assets/Products/product_8-1.jpg'),
  '/Assets/LimitedEdition/limited-1.jpg': require('../Assets/LimitedEdition/limited-1.jpg'),
  '/Assets/LimitedEdition/limited-2.jpg': require('../Assets/LimitedEdition/limited-2.jpg'),
  '/Assets/LimitedEdition/limited-3.jpg': require('../Assets/LimitedEdition/limited-3.jpg'),
  '/Assets/LimitedEdition/limited-4.jpg': require('../Assets/LimitedEdition/limited-4.jpg'),
  '/Assets/LimitedEdition/limited-5.jpg': require('../Assets/LimitedEdition/limited-5.jpg'),
};

export const getImagePath = (path) => {
  return imageMap[path] || path;
};

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    // Transformar las rutas de imágenes
    return data.map(product => ({
      ...product,
      frontImg: getImagePath(product.frontImg),
      backImg: getImagePath(product.backImg)
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    const data = await response.json();
    if (data) {
      data.frontImg = getImagePath(data.frontImg);
      data.backImg = getImagePath(data.backImg);
    }
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};