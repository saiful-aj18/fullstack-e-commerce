import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import api from "../../api/axios";

function Header() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // =========================
  // Auth / Role
  // =========================
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const isAdmin = token && userRole === "admin";

  // =========================
  // Get Cart Count
  // =========================
  const getCartCount = useCallback(async () => {
    const currentToken = localStorage.getItem("token");

    // User is not logged in
    if (!currentToken) {
      setCartCount(0);
      return;
    }

    try {
      const res = await api.get("/cart");

      const cart = res.data?.cart || res.data;

      const items = Array.isArray(cart?.items)
        ? cart.items
        : [];

      const totalQuantity = items.reduce(
        (total, item) =>
          total + Number(item.quantity || 0),
        0
      );

      setCartCount(totalQuantity);
    } catch (error) {
      console.log(
        "Failed to load cart count:",
        error
      );

      setCartCount(0);
    }
  }, []);

  // =========================
  // Initial Cart Count
  // =========================
  useEffect(() => {
    const timer = window.setTimeout(() => {
      getCartCount();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [getCartCount]);

  // =========================
  // Listen for Cart Updates
  // =========================
  useEffect(() => {
    const handleCartUpdate = () => {
      getCartCount();
    };

    window.addEventListener(
      "cartUpdated",
      handleCartUpdate
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdate
      );
    };
  }, [getCartCount]);

  // =========================
  // Logout
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");

    setCartCount(0);
    setOpen(false);

    navigate("/login");
  };

  // =========================
  // Navigation Class
  // =========================
  const navClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-black"
        : "text-[#66747a] hover:text-black"
    }`;

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto max-w-[1500px] rounded-[22px] border border-black/5 bg-[#dce2e4]/90 px-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl sm:px-6">

        {/* =========================
            Header Row
        ========================= */}
        <div className="flex h-[68px] items-center justify-between">

          {/* =========================
              Logo
          ========================= */}
          <Link
            to="/"
            className="text-[24px] font-black tracking-[-0.08em] text-black"
          >
            SHOPLY
          </Link>

          {/* =========================
              Desktop Navigation
          ========================= */}
          <nav className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.14em] md:flex">

            <NavLink
              to="/"
              className={navClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={navClass}
            >
              Shop
            </NavLink>

            <NavLink
              to="/wishlist"
              className={navClass}
            >
              Wishlist
            </NavLink>

            <NavLink
              to="/profile"
              className={navClass}
            >
              Profile
            </NavLink>

            <NavLink
              to="/orders"
              className={navClass}
            >
              Orders
            </NavLink>

            {/* =========================
                ADMIN DASHBOARD
            ========================= */}
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? "text-black"
                      : "text-[#66747a] hover:text-black"
                  }`
                }
              >
                Admin
              </NavLink>
            )}

          </nav>

          {/* =========================
              Right Actions
          ========================= */}
          <div className="flex items-center gap-2">

            {/* =========================
                Cart
            ========================= */}
            <Link
              to="/cart"
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition duration-300 hover:scale-105 hover:bg-black/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-[18px] w-[18px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6"
                />

                <circle
                  cx="9"
                  cy="20"
                  r="1.2"
                />

                <circle
                  cx="18"
                  cy="20"
                  r="1.2"
                />
              </svg>

              {/* Cart Badge */}
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-white px-1 text-[9px] font-black leading-none text-black shadow-sm ring-1 ring-black/10">
                  {cartCount > 99
                    ? "99+"
                    : cartCount}
                </span>
              )}
            </Link>

            {/* =========================
                ADMIN DASHBOARD BUTTON
                Desktop
            ========================= */}
            {isAdmin && (
              <Link
                to="/admin"
                className="hidden h-10 items-center rounded-full bg-black px-4 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-black/90 sm:flex"
              >
                Dashboard
              </Link>
            )}

            {/* =========================
                Desktop Login / Logout
            ========================= */}
            {token ? (
              <button
                onClick={handleLogout}
                className="hidden h-10 rounded-full border border-black/10 bg-white/50 px-4 text-[11px] font-bold uppercase tracking-[0.1em] text-black transition hover:bg-white sm:block"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden h-10 items-center rounded-full border border-black/10 bg-white/50 px-4 text-[11px] font-bold uppercase tracking-[0.1em] text-black transition hover:bg-white sm:flex"
              >
                Login
              </Link>
            )}

            {/* =========================
                Mobile Menu Button
            ========================= */}
            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/50 transition hover:bg-white md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? (
                <span className="text-[25px] font-light leading-none">
                  ×
                </span>
              ) : (
                <span className="flex flex-col gap-[4px]">
                  <span className="h-[1.5px] w-[15px] bg-black" />
                  <span className="h-[1.5px] w-[15px] bg-black" />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* =========================
            Mobile Menu
        ========================= */}
        {open && (
          <div className="border-t border-black/5 py-5 md:hidden">

            <nav className="flex flex-col gap-4 text-xs font-bold uppercase tracking-[0.14em]">

              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className={navClass}
              >
                Home
              </NavLink>

              <NavLink
                to="/products"
                onClick={() => setOpen(false)}
                className={navClass}
              >
                Shop
              </NavLink>

              <NavLink
                to="/wishlist"
                onClick={() => setOpen(false)}
                className={navClass}
              >
                Wishlist
              </NavLink>

              <NavLink
                to="/profile"
                onClick={() => setOpen(false)}
                className={navClass}
              >
                Profile
              </NavLink>

              <NavLink
                to="/orders"
                onClick={() => setOpen(false)}
                className={navClass}
              >
                Orders
              </NavLink>

              {/* =========================
                  ADMIN DASHBOARD
                  Mobile
              ========================= */}
              {isAdmin && (
                <NavLink
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-full px-4 py-3 transition ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-black/5 text-black hover:bg-black/10"
                    }`
                  }
                >
                  <span>Admin Dashboard</span>
                  <span>↗</span>
                </NavLink>
              )}

              {/* =========================
                  Mobile Auth
              ========================= */}
              <div className="mt-2 border-t border-black/5 pt-4">

                {token ? (
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-full bg-black px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-black/90"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="block w-full rounded-full bg-black px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-black/90"
                  >
                    Login / Sign in
                  </Link>
                )}

              </div>

            </nav>
          </div>
        )}

      </div>
    </header>
  );
}

export default Header;