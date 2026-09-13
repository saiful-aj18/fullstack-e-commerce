import { Link } from "react-router-dom";
import Container from "../common/Container";

function Footer() {
  return (
    <footer className="mt-16 border-t bg-slate-950 text-slate-300">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold text-white">
              Shop<span className="text-indigo-400">ly</span>
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              A modern e-commerce experience built with React,
              Tailwind CSS and a REST API.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white">Shop</h4>

            <div className="mt-4 space-y-3 text-sm">
              <Link
                to="/"
                className="block hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/wishlist"
                className="block hover:text-white"
              >
                Wishlist
              </Link>

              <Link
                to="/cart"
                className="block hover:text-white"
              >
                Cart
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white">Account</h4>

            <div className="mt-4 space-y-3 text-sm">
              <Link
                to="/login"
                className="block hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/profile"
                className="block hover:text-white"
              >
                My Profile
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white">Information</h4>

            <div className="mt-4 space-y-3 text-sm">
              <Link
                to="/terms"
                className="block hover:text-white"
              >
                Terms & Conditions
              </Link>

              <Link
                to="/privacy"
                className="block hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                to="/how-to-buy"
                className="block hover:text-white"
              >
                How To Buy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © 2026 Shoply. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;