import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0b0808] px-4 py-12 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-[1500px]">

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          <div>
            <h2 className="text-4xl font-black tracking-[-0.07em]">
              SHOPLY<span className="text-white/30">®</span>
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/40">
              A modern shopping experience built around
              simplicity, discovery and everyday essentials.
            </p>
          </div>

          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              Explore
            </p>

            <div className="space-y-3 text-sm">
              <Link className="block hover:text-white/50" to="/">
                Home
              </Link>

              <Link className="block hover:text-white/50" to="/products">
                Shop
              </Link>

              <Link className="block hover:text-white/50" to="/wishlist">
                Wishlist
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              Account
            </p>

            <div className="space-y-3 text-sm">
              <Link className="block hover:text-white/50" to="/profile">
                Profile
              </Link>

              <Link className="block hover:text-white/50" to="/orders">
                Orders
              </Link>

              <Link className="block hover:text-white/50" to="/cart">
                Cart
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              Information
            </p>

            <div className="space-y-3 text-sm">
              <Link className="block hover:text-white/50" to="/terms">
                Terms
              </Link>

              <Link className="block hover:text-white/50" to="/privacy">
                Privacy
              </Link>

              <Link className="block hover:text-white/50" to="/how-to-buy">
                How to buy
              </Link>
            </div>
          </div>

        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 sm:flex-row">
          <span>© 2026 Shoply</span>
          <span>Built for modern commerce</span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;