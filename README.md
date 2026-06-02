# 🛍️ MODE - E-commerce Platform

## 📌 Live Demo

🔗 **Frontend:** https://mode-ecommerce.vercel.app/

📡 **Backend API:** https://mode-ecommerce-zeyi.onrender.com/api

---

## 📋 Descripción

**MODE** es una plataforma de e-commerce moderna para la venta de ropa y accesorios. Construida con **React.js** en el frontend y **Node.js/Express** en el backend, ofrece una experiencia de compra completa con autenticación de usuarios, carrito persistente y un modelo 3D interactivo.

---

## ✨ Características

### 🛒 Funcionalidades Principales

| Característica            | Descripción                                                   |
| ------------------------- | ------------------------------------------------------------- |
| **Catálogo de productos** | Visualización de productos con imágenes, precios y categorías |
| **Autenticación JWT**     | Registro e inicio de sesión seguro de usuarios                |
| **Carrito persistente**   | Guardado del carrito en MongoDB por usuario                   |
| **Checkout simulado**     | Proceso de compra con múltiples métodos de pago               |
| **Filtros avanzados**     | Por categoría, color, talla, marca y precio                   |
| **Diseño responsive**     | Experiencia optimizada en móvil, tablet y desktop             |

### 🎮 Experiencia Interactiva

* Modelo 3D interactivo con Three.js
* Cambio dinámico de colores en productos
* Galería de imágenes con múltiples vistas
* Sliders y carruseles de productos destacados

### 🔧 Tecnologías Backend

* API REST completa
* MongoDB Atlas
* Autenticación JWT
* Encriptación con bcrypt
* Carrito persistente sincronizado con base de datos

---

## 🛠️ Tecnologías Utilizadas

### Frontend

| Tecnología        | Versión | Propósito                    |
| ----------------- | ------- | ---------------------------- |
| React.js          | 18.2.0  | Framework principal          |
| React Router DOM  | 6.15.0  | Navegación entre páginas     |
| Redux Toolkit     | 1.9.5   | Estado global                |
| Material UI (MUI) | 5.14.0  | Componentes UI               |
| Three.js          | 0.128.0 | Renderizado 3D               |
| React Three Fiber | 8.9.2   | Integración React + Three.js |
| Swiper            | 10.3.0  | Carruseles                   |
| React Hot Toast   | 2.4.1   | Notificaciones               |
| React Icons       | 4.11.0  | Iconografía                  |

### Backend

| Tecnología     | Versión | Propósito     |
| -------------- | ------- | ------------- |
| Node.js        | 18.x    | Runtime       |
| Express.js     | 4.18.2  | Framework web |
| MongoDB        | 8.0.0   | Base de datos |
| Mongoose       | 8.0.0   | ODM           |
| JSON Web Token | 9.0.2   | Autenticación |
| bcryptjs       | 2.4.3   | Encriptación  |
| CORS           | 2.8.5   | Seguridad     |

---

## 📁 Estructura del Proyecto

```text
mode-ecommerce/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Assets/
│   │   ├── Components/
│   │   ├── Features/
│   │   ├── Services/
│   │   └── Pages/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── config/
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🚀 Instalación y Ejecución Local

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/paolaGiusianoP/mode-ecommerce.git
cd mode-ecommerce
```

### 2️⃣ Configurar el Backend

```bash
cd backend
npm install
```

Crear un archivo `.env` dentro de `backend/`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://tu_usuario:tu_password@cluster.mongodb.net/mode_db
JWT_SECRET=tu_secreto_aqui
```

Ejecutar el backend:

```bash
npm run dev
```

### 3️⃣ Configurar el Frontend

```bash
cd ../frontend
npm install
npm start
```

### 4️⃣ Abrir la Aplicación

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:5000
```

---

## 📡 API Endpoints

| Método | Endpoint             | Descripción                 |
| ------ | -------------------- | --------------------------- |
| GET    | /api/products        | Obtener todos los productos |
| GET    | /api/products/:id    | Obtener producto por ID     |
| POST   | /api/users/register  | Registrar usuario           |
| POST   | /api/users/login     | Iniciar sesión              |
| GET    | /api/cart            | Obtener carrito             |
| POST   | /api/cart            | Agregar producto            |
| PUT    | /api/cart/:productId | Actualizar cantidad         |
| DELETE | /api/cart/:productId | Eliminar producto           |
| GET    | /api/health          | Health Check                |

---

## 🚧 Próximas Mejoras

* Integración con Mercado Pago
* Integración con PayPal
* Panel de administración
* Historial de órdenes
* Búsqueda avanzada
* Sistema de reseñas
* Recuperación de contraseña por email

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

