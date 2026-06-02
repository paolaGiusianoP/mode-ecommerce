const API_URL = 'http://localhost:5000/api';

// Registrar usuario
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('userInfo', JSON.stringify(data));
    }
    return { ok: response.ok, data };
  } catch (error) {
    console.error('Error en registro:', error);
    return { ok: false, data: { message: error.message } };
  }
};

// Login usuario
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('userInfo', JSON.stringify(data));
    }
    return { ok: response.ok, data };
  } catch (error) {
    console.error('Error en login:', error);
    return { ok: false, data: { message: error.message } };
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('userInfo');
};

// Obtener usuario actual
export const getCurrentUser = () => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : null;
};

// Verificar si está autenticado
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

// Obtener token
export const getToken = () => {
  const user = getCurrentUser();
  return user?.token || null;
};