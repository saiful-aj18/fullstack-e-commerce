# Fullstack E-Commerce

A modern full-stack e-commerce application built with **React, Vite, Tailwind CSS, Node.js, Express.js, and MongoDB**.

The platform provides a complete online shopping experience where users can browse products, create accounts, manage their cart and wishlist, place orders, write reviews, and manage their profiles. It also includes a dedicated **Admin Dashboard** for managing products, users, orders, inventory, and reviews.

---

## 🌐 Live Demo

**Frontend:**  
https://shoply73.vercel.app/

---

## ✨ Features

### 👤 User Features

- User registration and secure login
- JWT-based authentication
- User profile management
- Browse products
- Product details page
- Product search and category browsing
- Shopping cart management
- Wishlist functionality
- Add and manage cart items
- Place orders
- View order history
- Order invoice generation and viewing
- Product reviews and ratings
- Terms & Conditions page
- Privacy Policy page
- How to Buy page
- Responsive design for desktop, tablet, and mobile

### 🛠️ Admin Features

- Dedicated Admin Dashboard
- Admin authentication and protected routes
- Dashboard overview and store statistics
- Product management
- Add new products
- Edit existing products
- Delete products
- Product search
- Inventory and stock management
- Order management
- Update order status
- User management
- Activate/deactivate users
- Manage user roles
- Review management
- Delete inappropriate reviews
- Protected admin API endpoints

### 🎨 UI & Performance

- Modern and responsive storefront UI
- Premium minimal design
- Mobile-friendly admin dashboard
- Responsive admin sidebar
- Mobile admin navigation drawer
- Smooth hover and transition effects
- Fast Vite development environment
- Vercel Analytics integration

### 🚀 Deployment

- Frontend deployed on Vercel
- Backend deployed on Render
- MongoDB Atlas database support
- SPA routing configuration for Vercel
- Environment-based API configuration

---

## 🧰 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React
- GSAP
- Vercel Analytics

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

### Deployment

- Vercel
- Render
- MongoDB Atlas

---

## 📁 Project Structure

```text
fullstack-e-commerce/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── common/
│   │   │   └── layout/
│   │   │
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── ...
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── seedProducts.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
├── README.md
└── package.json


```

### 2) Install frontend dependencies

```bash
cd client
npm install
```

### 3) Install backend dependencies

```bash
cd ../server
npm install
```

## Environment Variables

Create a `.env` file in the `server` directory with the following values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key
```

You can adjust the values depending on your MongoDB setup.

## Running the App

### Start the backend

```bash
cd server
npm run dev
```

### Start the frontend

```bash
cd client
npm run dev
```

The frontend will typically run on:

- http://localhost:5173

The backend API will run on:

- http://localhost:5000

## API Overview

The backend exposes REST APIs for:

- Authentication
- Users
- Cart
- Wishlist
- Orders
- Reviews
- Legal content

## 📄 License

This project is currently unlicensed unless otherwise specified in the repository.

## 👨‍💻 Author

Saiful Islam

Full-Stack Developer
Bangladesh

GitHub:

https://github.com/saiful-aj18
