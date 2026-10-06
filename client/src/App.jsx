import "./App.css";

import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

// Customer Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Customer Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders.jsx";
import Invoice from "./pages/Invoice.jsx";
import Review from "./pages/Review.jsx";

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import HowToBuy from "./pages/HowToBuy";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";

// Admin
import AdminRoute from "./components/admin/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReviews from "./pages/admin/AdminReviews";


/* =========================
   CUSTOMER LAYOUT
========================= */

function CustomerLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" Component={Home} />

          <Route path="/register" Component={Register} />
          <Route path="/login" Component={Login} />

          <Route path="/profile" Component={Profile} />
          <Route path="/cart" Component={Cart} />
          <Route path="/wishlist" Component={Wishlist} />

          <Route path="/orders" Component={Orders} />

          {/* Invoice */}
          <Route
            path="/invoice/:orderId"
            Component={Invoice}
          />

          {/* Product Review */}
          <Route
            path="/review/:productId"
            Component={Review}
          />

          <Route path="/terms" Component={Terms} />
          <Route path="/privacy" Component={Privacy} />
          <Route path="/how-to-buy" Component={HowToBuy} />

          <Route path="/products" Component={Products} />
          <Route
            path="/products/:id"
            Component={ProductDetails}
          />

          <Route path="*" Component={NotFound} />
        </Routes>
      </main>

      <Footer />

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}


/* =========================
   MAIN APP
========================= */

function App() {
  return (
    <Routes>

      {/* =====================
          ADMIN ROUTES
      ===================== */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >

        {/* /admin */}
        <Route
          index
          element={<AdminDashboard />}
        />

        {/* /admin/products */}
        <Route
          path="products"
          element={<AdminProducts />}
        />

        {/* /admin/products/new */}
        <Route
          path="products/new"
          element={<AdminProductForm />}
        />

        {/* /admin/products/edit/:id */}
        <Route
          path="products/edit/:id"
          element={<AdminProductForm />}
        />

        {/* /admin/orders */}
        <Route
          path="orders"
          element={<AdminOrders />}
        />

        {/* /admin/users */}
        <Route
          path="users"
          element={<AdminUsers />}
        />

        {/* /admin/reviews */}
        <Route
          path="reviews"
          element={<AdminReviews />}
        />

      </Route>


      {/* =====================
          CUSTOMER ROUTES
      ===================== */}

      <Route
        path="/*"
        element={<CustomerLayout />}
      />

    </Routes>
  );
}

export default App;