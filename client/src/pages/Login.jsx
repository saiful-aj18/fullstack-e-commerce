import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import api from "../api/axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);

      window.location.href = "/";

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-64px)] items-center py-16">
      <Container>
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border bg-white shadow-xl lg:grid-cols-2">
          <div className="hidden bg-slate-950 p-12 lg:block">
            <div className="flex h-full flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Welcome back.
                </h2>

                <p className="mt-4 leading-7 text-slate-400">
                  Login to manage your profile, cart and wishlist.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-sm text-slate-400">
                  "A simple shopping experience with everything you need."
                </p>

                <p className="mt-4 text-sm font-semibold text-white">
                  — Shoply Team
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            <div className="mx-auto max-w-md">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">
                  Login
                </h1>

                <p className="mt-2 text-slate-500">
                  Enter your credentials to continue.
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link to="/register" className="font-semibold text-indigo-600">
                  Create one
                </Link>
              </div>

              <Link
                to="/"
                className="mt-6 block text-center text-sm font-medium text-slate-500 hover:text-slate-900"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Login;