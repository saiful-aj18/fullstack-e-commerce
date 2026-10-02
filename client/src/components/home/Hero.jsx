import { Link } from "react-router-dom";
import Container from "../common/Container";

function Hero() {
  return (
    <section className="bg-slate-950">
      <Container className="grid min-h-[480px] items-center gap-10 py-16 lg:grid-cols-2">
        <div>
          <span className="inline-flex rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300">
            Modern Shopping Experience
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Everything you need,
            <span className="block text-indigo-400">all in one place.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
            Discover products, manage your cart, save your favorite items and
            manage your account from one simple platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Shop Now
            </Link>

            <Link
              to="/wishlist"
              className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-white hover:bg-slate-900"
            >
              View Wishlist
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;