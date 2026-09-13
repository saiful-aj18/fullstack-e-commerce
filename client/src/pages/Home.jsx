import { Link } from "react-router-dom";
import Container from "../components/common/Container";

function Home() {
  return (
    <>
      <section className="bg-slate-950">
        <Container className="grid min-h-[480px] items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300">
              Modern Shopping Experience
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Everything you need,
              <span className="block text-indigo-400">
                all in one place.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              Discover products, manage your cart, save your
              favorite items and manage your account from one
              simple platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/cart"
                className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
              >
                View Cart
              </Link>

              <Link
                to="/wishlist"
                className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-white hover:bg-slate-900"
              >
                View Wishlist
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-6">
                  <div className="text-3xl">🛒</div>
                  <p className="mt-4 font-semibold text-slate-900">
                    Your Cart
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    2 items
                  </p>
                </div>

                <div className="rounded-2xl bg-indigo-600 p-6 text-white">
                  <div className="text-3xl">❤️</div>
                  <p className="mt-4 font-semibold">
                    Wishlist
                  </p>
                  <p className="mt-1 text-sm text-indigo-200">
                    4 items
                  </p>
                </div>

                <div className="col-span-2 rounded-2xl bg-slate-800 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-xl">
                      👤
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        Welcome back!
                      </p>
                      <p className="text-sm text-slate-400">
                        Manage your profile and orders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <Link
              to="/profile"
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-3xl">👤</div>
              <h3 className="mt-5 text-lg font-bold">
                Manage Profile
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                View and manage your account information.
              </p>
            </Link>

            <Link
              to="/cart"
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-3xl">🛒</div>
              <h3 className="mt-5 text-lg font-bold">
                Shopping Cart
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Review products before checkout.
              </p>
            </Link>

            <Link
              to="/wishlist"
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-3xl">❤️</div>
              <h3 className="mt-5 text-lg font-bold">
                Wishlist
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Keep track of products you love.
              </p>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Home;