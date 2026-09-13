import './App.css'

import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import HowToBuy from "./pages/HowToBuy";

import NotFound from "./pages/NotFound";
import Orders from './pages/Orders.jsx';
import Invoice from './pages/Invoice.jsx';
import Review from './pages/Review.jsx'; 
import Register from './pages/Register.jsx';

function App() {
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

          {/* NEW — Invoice for one specific order */}
          <Route path="/invoice/:orderId" Component={Invoice} />

          {/* NEW — Write a review for one product */}
          <Route path="/review/:productId" Component={Review} />

          <Route path="/terms" Component={Terms} />
          <Route path="/privacy" Component={Privacy} />
          <Route path="/how-to-buy" Component={HowToBuy} />

          <Route path="*" Component={NotFound} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
