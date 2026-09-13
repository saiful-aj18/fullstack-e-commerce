import { Link, NavLink } from "react-router-dom";
import Container from "../common/Container";

function Header() {
  const navClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-indigo-600"
        : "text-slate-600 hover:text-indigo-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight text-slate-900"
        >
          Shop<span className="text-indigo-600">ly</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/wishlist" className={navClass}>
            Wishlist
          </NavLink>

          <NavLink to="/cart" className={navClass}>
            Cart
          </NavLink>

          <NavLink to="/profile" className={navClass}>
            Profile
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          >
            🛒
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
              2
            </span>
          </Link>

          <Link
            to="/login"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Login
          </Link>
        </div>
      </Container>
    </header>
  );
}

export default Header;