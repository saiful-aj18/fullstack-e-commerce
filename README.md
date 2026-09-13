# E-Commerce Backend API

Backend API for the E-Commerce project built with **Node.js, Express.js, MongoDB, and Mongoose**.

This API provides authentication, user profile management, cart, wishlist, and legal information features for the frontend application.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- CORS
- dotenv

---

# Base URL

After deployment, replace the URL below with the actual backend URL.

```bash
https://your-backend-url.com
```

For frontend environment configuration:

```env
VITE_API_BASE_URL=https://your-backend-url.com/api
```

---

# Authentication

Protected APIs require a JWT token.

Send the token using the following request header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

The token is returned after successful login.

---

# API Endpoints

## AUTH

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

---

## PROFILE

```text
GET    /api/users/profile
PUT    /api/users/profile
```

---

## CART

```text
GET    /api/cart
POST   /api/cart
PUT    /api/cart/:productId
DELETE /api/cart/:productId
DELETE /api/cart
```

---

## WISHLIST

```text
GET    /api/wishlist
POST   /api/wishlist
DELETE /api/wishlist/:productId
```

---

## LEGAL

```text
GET    /api/legal/terms
GET    /api/legal/privacy
GET    /api/legal/how-to-buy
```

---

# 1. Authentication APIs

## Register User

Create a new user account.

### Endpoint

```http
POST /api/auth/register
```

### Authentication

```text
Public
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Example Request

```bash
curl -X POST https://your-backend-url.com/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}'
```

---

## Login User

Login with email and password.

### Endpoint

```http
POST /api/auth/login
```

### Authentication

```text
Public
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Example Request

```bash
curl -X POST https://your-backend-url.com/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john@example.com",
  "password": "123456"
}'
```

### Response

A successful login returns a JWT token and user information.

```json
{
  "token": "YOUR_JWT_TOKEN",
  "user": {
    "_id": "USER_ID",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "",
    "address": "",
    "avatar": ""
  }
}
```

### Frontend

Store the token after successful login:

```js
localStorage.setItem("token", data.token);
```

---

## Get Current User

Get the currently authenticated user.

### Endpoint

```http
GET /api/auth/me
```

### Authentication

```text
Required
```

### Headers

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Example Request

```bash
curl -X GET https://your-backend-url.com/api/auth/me \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

# 2. Profile APIs

## Get User Profile

Get the profile of the currently authenticated user.

### Endpoint

```http
GET /api/users/profile
```

### Authentication

```text
Required
```

### Headers

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Example Request

```bash
curl -X GET https://your-backend-url.com/api/users/profile \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Update User Profile

Update the authenticated user's profile information.

### Endpoint

```http
PUT /api/users/profile
```

### Authentication

```text
Required
```

### Headers

```http
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

### Request Body

```json
{
  "name": "John Updated",
  "phone": "01700000000",
  "address": "Dhaka, Bangladesh",
  "avatar": "https://example.com/avatar.jpg"
}
```

### Example Request

```bash
curl -X PUT https://your-backend-url.com/api/users/profile \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "name": "John Updated",
  "phone": "01700000000",
  "address": "Dhaka, Bangladesh",
  "avatar": "https://example.com/avatar.jpg"
}'
```

---

# 3. Cart APIs

All cart APIs require authentication.

## Get Cart

Get the authenticated user's cart.

### Endpoint

```http
GET /api/cart
```

### Authentication

```text
Required
```

### Headers

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Example Request

```bash
curl -X GET https://your-backend-url.com/api/cart \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Add Product to Cart

Add a product to the authenticated user's cart.

If the product already exists in the cart, its quantity will be increased.

### Endpoint

```http
POST /api/cart
```

### Authentication

```text
Required
```

### Headers

```http
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

### Request Body

```json
{
  "productId": 1,
  "title": "iPhone 15",
  "price": 799,
  "image": "https://example.com/iphone.jpg",
  "quantity": 1
}
```

### Example Request

```bash
curl -X POST https://your-backend-url.com/api/cart \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "productId": 1,
  "title": "iPhone 15",
  "price": 799,
  "image": "https://example.com/iphone.jpg",
  "quantity": 1
}'
```

---

## Update Cart Item

Update the quantity of a specific product in the cart.

### Endpoint

```http
PUT /api/cart/:productId
```

### Example

```http
PUT /api/cart/1
```

### Authentication

```text
Required
```

### Headers

```http
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

### Request Body

```json
{
  "quantity": 3
}
```

### Example Request

```bash
curl -X PUT https://your-backend-url.com/api/cart/1 \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "quantity": 3
}'
```

---

## Remove Product from Cart

Remove a specific product from the cart.

### Endpoint

```http
DELETE /api/cart/:productId
```

### Example

```http
DELETE /api/cart/1
```

### Authentication

```text
Required
```

### Headers

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Example Request

```bash
curl -X DELETE https://your-backend-url.com/api/cart/1 \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Clear Cart

Remove all products from the authenticated user's cart.

### Endpoint

```http
DELETE /api/cart
```

### Authentication

```text
Required
```

### Headers

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Example Request

```bash
curl -X DELETE https://your-backend-url.com/api/cart \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

# 4. Wishlist APIs

All wishlist APIs require authentication.

## Get Wishlist

Get the authenticated user's wishlist.

### Endpoint

```http
GET /api/wishlist
```

### Authentication

```text
Required
```

### Headers

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Example Request

```bash
curl -X GET https://your-backend-url.com/api/wishlist \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Add Product to Wishlist

Add a product to the authenticated user's wishlist.

Duplicate products will not be added.

### Endpoint

```http
POST /api/wishlist
```

### Authentication

```text
Required
```

### Headers

```http
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

### Request Body

```json
{
  "productId": 5,
  "title": "MacBook Pro",
  "price": 1999,
  "image": "https://example.com/macbook.jpg"
}
```

### Example Request

```bash
curl -X POST https://your-backend-url.com/api/wishlist \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "productId": 5,
  "title": "MacBook Pro",
  "price": 1999,
  "image": "https://example.com/macbook.jpg"
}'
```

---

## Remove Product from Wishlist

Remove a specific product from the wishlist.

### Endpoint

```http
DELETE /api/wishlist/:productId
```

### Example

```http
DELETE /api/wishlist/5
```

### Authentication

```text
Required
```

### Headers

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Example Request

```bash
curl -X DELETE https://your-backend-url.com/api/wishlist/5 \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

# 5. Legal APIs

Legal APIs are public and do not require authentication.

## Terms & Conditions

### Endpoint

```http
GET /api/legal/terms
```

### Example Request

```bash
curl -X GET https://your-backend-url.com/api/legal/terms
```

---

## Privacy Policy

### Endpoint

```http
GET /api/legal/privacy
```

### Example Request

```bash
curl -X GET https://your-backend-url.com/api/legal/privacy
```

---

## How to Buy

### Endpoint

```http
GET /api/legal/how-to-buy
```

### Example Request

```bash
curl -X GET https://your-backend-url.com/api/legal/how-to-buy
```

---

# Authentication Flow

The frontend should follow this flow for authentication.

```text
Register
   ↓
Login
   ↓
Receive JWT Token
   ↓
Store Token in localStorage
   ↓
Send Token with Protected API Requests
   ↓
Logout
   ↓
Remove Token from localStorage
```

Example:

```js
localStorage.setItem("token", data.token);
```

For protected API requests:

```js
const token = localStorage.getItem("token");

fetch(`${API_BASE_URL}/users/profile`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

---

# Frontend Integration

The frontend will use two different API sources.

## Product Data

Product list and product details come from the external product API.

```text
External Product API
        ↓
Product List
        ↓
Product Details
```

## User-Specific Data

User-related data comes from this backend.

```text
React Frontend
      ↓
Express Backend
      ↓
MongoDB
```

The following data is stored in this backend:

```text
User
Profile
Cart
Wishlist
```

Product information is sent to the Cart/Wishlist APIs as a product snapshot:

```json
{
  "productId": 1,
  "title": "iPhone 15",
  "price": 799,
  "image": "https://example.com/iphone.jpg"
}
```

---

# Protected vs Public APIs

| API                               | Authentication |
| --------------------------------- | -------------- |
| POST `/api/auth/register`         | Public         |
| POST `/api/auth/login`            | Public         |
| GET `/api/auth/me`                | Required       |
| GET `/api/users/profile`          | Required       |
| PUT `/api/users/profile`          | Required       |
| GET `/api/cart`                   | Required       |
| POST `/api/cart`                  | Required       |
| PUT `/api/cart/:productId`        | Required       |
| DELETE `/api/cart/:productId`     | Required       |
| DELETE `/api/cart`                | Required       |
| GET `/api/wishlist`               | Required       |
| POST `/api/wishlist`              | Required       |
| DELETE `/api/wishlist/:productId` | Required       |
| GET `/api/legal/terms`            | Public         |
| GET `/api/legal/privacy`          | Public         |
| GET `/api/legal/how-to-buy`       | Public         |

---

# API Summary

```text
AUTH
────────────────────────────────

POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me


PROFILE
────────────────────────────────

GET    /api/users/profile
PUT    /api/users/profile


CART
────────────────────────────────

GET    /api/cart
POST   /api/cart
PUT    /api/cart/:productId
DELETE /api/cart/:productId
DELETE /api/cart


WISHLIST
────────────────────────────────

GET    /api/wishlist
POST   /api/wishlist
DELETE /api/wishlist/:productId


LEGAL
────────────────────────────────

GET    /api/legal/terms
GET    /api/legal/privacy
GET    /api/legal/how-to-buy
```

---

# Notes for Learners

- All protected APIs require a valid JWT token.
- The token should be sent using the `Authorization` header.
- Store only the JWT token in `localStorage`.
- Cart and wishlist data should be managed through the backend API.
- Do not store cart or wishlist data permanently in `localStorage`.
- Product data comes from the external product API.
- The backend identifies the logged-in user from the JWT token.
- Each user has their own profile, cart, and wishlist.

---

# Project Status

Current backend features:

```text
Authentication       ✅
Login                ✅
Logout Flow          ✅
User Profile         ✅
Cart                 ✅
Wishlist             ✅
Terms & Conditions   ✅
Privacy Policy       ✅
How To Buy           ✅
```

All current APIs have been tested successfully.