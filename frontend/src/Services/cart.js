import { getToken } from './auth';

const API_URL = 'http://localhost:5000/api';

// Obtener headers con autenticación
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Obtener carrito del usuario
export const fetchCart = async () => {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error('Error fetching cart:', error);
    return { ok: false, data: { message: error.message } };
  }
};

// Agregar producto al carrito
export const addToCartAPI = async (productId, quantity = 1) => {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId, quantity })
    });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { ok: false, data: { message: error.message } };
  }
};

// Actualizar cantidad
export const updateCartItemAPI = async (productId, quantity) => {
  try {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ quantity })
    });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error('Error updating cart:', error);
    return { ok: false, data: { message: error.message } };
  }
};

// Eliminar producto del carrito
export const removeFromCartAPI = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error('Error removing from cart:', error);
    return { ok: false, data: { message: error.message } };
  }
};

// Vaciar carrito
export const clearCartAPI = async () => {
  try {
    const response = await fetch(`${API_URL}/cart/clear`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error('Error clearing cart:', error);
    return { ok: false, data: { message: error.message } };
  }
};