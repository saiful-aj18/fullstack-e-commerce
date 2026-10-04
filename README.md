# Fullstack E-Commerce

A full-stack e-commerce application built with React on the client side and Node.js/Express on the server side. The platform allows users to browse products, register and sign in, manage a cart and wishlist, place orders, and review products.



## 🌐 Live Demo

https://findbackbd73.vercel.app/


## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router DOM
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT + bcryptjs
- HTTP Client: Axios

## Features

- User registration and login
- Profile management
- Product listing and product details pages
- Cart and wishlist functionality
- Order creation and invoice viewing
- Product reviews and ratings
- Legal pages: Terms, Privacy Policy, and How to Buy
- Responsive storefront UI

## Project Structure

```text
fullstack-e-commerce/
├── client/                 # React frontend
│   ├── src/                # App pages, components, styles
│   ├── public/             # Static assets
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── config/             # Database and app configuration
│   ├── controllers/        # Request handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   ├── middlewares/        # Error and auth middleware
│   ├── server.js
│   └── package.json
├── .gitignore
├── README.md
└── package.json
```

## Prerequisites

Before running the app, make sure you have:

- Node.js installed
- npm or yarn installed
- MongoDB running locally or a MongoDB Atlas connection string

## Installation

### 1) Clone the repository

```bash
git clone https://github.com/saiful-aj18/fullstack-e-commerce.git
cd fullstack-e-commerce
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

## License

This project is currently unlicensed unless otherwise specified in the repository.

## Author

Built as a full-stack e-commerce demo project for learning and portfolio purposes.
