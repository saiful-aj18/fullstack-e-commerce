import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-black"
        : "text-[#66747a] hover:text-black"
    }`;

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto max-w-[1500px] rounded-[22px] border border-black/5 bg-[#dce2e4]/90 px-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl sm:px-6">

        <div className="flex h-[68px] items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-[24px] font-black tracking-[-0.08em] text-black"
          >
            SHOPLY
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.14em] md:flex">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            <NavLink to="/products" className={navClass}>
              Shop
            </NavLink>

            <NavLink to="/wishlist" className={navClass}>
              Wishlist
            </NavLink>

            <NavLink to="/profile" className={navClass}>
              Profile
            </NavLink>

            <NavLink to="/orders" className={navClass}>
              Orders
            </NavLink>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">

            <Link
              to="/cart"
              className="flex h-10 items-center gap-2 rounded-full bg-black px-4 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition hover:scale-[1.03]"
            >
              Cart
              <span className="text-white/50">→</span>
            </Link>

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
                className="hidden h-10 rounded-full border border-black/10 bg-white/50 px-4 text-[11px] font-bold uppercase tracking-[0.1em] text-black transition hover:bg-white sm:flex sm:items-center"
              >
                Login
              </Link>
            )}

            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/50 md:hidden"
              aria-label="Toggle menu"
            >
              <span className="text-lg">{open ? "×" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;