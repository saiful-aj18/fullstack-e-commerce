import { useState } from "react";
import { Link } from "react-router-dom";
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
        password,
      });

      const token = res.data?.token;
      const user = res.data?.user;

      if (!token || !user) {
        setError("Invalid login response from server.");
        return;
      }

      // Save authentication data
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userRole", user.role || "user");

      // Redirect based on role
      if (user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-90px)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[720px] max-w-[1450px] overflow-hidden rounded-[2.5rem] bg-[#111313] lg:grid-cols-[1.05fr_.95fr]">

        {/* LEFT SIDE */}
        <div className="relative hidden overflow-hidden p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />

          <div className="absolute bottom-10 right-10 h-44 w-44 rounded-full bg-[#cad4d7]/10 blur-2xl" />

          <Link
            to="/"
            className="relative text-xl font-black tracking-[-0.05em]"
          >
            SHOPLY<span className="text-[#a9b8bc]">.</span>
          </Link>

          <div className="relative max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">
              Welcome back
            </p>

            <h1 className="mt-5 text-6xl font-black leading-[.9] tracking-[-0.06em] xl:text-8xl">
              Good to
              <br />
              see you.
            </h1>

            <p className="mt-8 max-w-md text-sm leading-7 text-white/45">
              Sign in to access your saved collection, orders and a more
              personal Shoply experience.
            </p>
          </div>

          <p className="relative text-[10px] uppercase tracking-[0.2em] text-white/25">
            SHOPLY / 2026
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center bg-[#e7ecee] p-6 sm:p-12 lg:p-16">
          <div className="mx-auto w-full max-w-md">

            {/* Mobile Logo */}
            <Link
              to="/"
              className="text-xl font-black tracking-[-0.05em] lg:hidden"
            >
              SHOPLY<span className="text-black/35">.</span>
            </Link>

            <div className="mt-10 lg:mt-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/35">
                Account / Sign in
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-[-0.05em]">
                Login.
              </h2>

              <p className="mt-3 text-sm text-black/45">
                Enter your credentials to continue.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="mt-8 space-y-5">

              {/* Email */}
              <label className="block">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
                  Email
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-sm outline-none transition focus:border-black/35"
                />
              </label>

              {/* Password */}
              <label className="block">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
                  Password
                </span>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-sm outline-none transition focus:border-black/35"
                />
              </label>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#111313] py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-40"
              >
                {loading ? "Logging in..." : "Login"}

                <span className="ml-2">
                  ↗
                </span>
              </button>
            </form>

            {/* Register */}
            <p className="mt-8 text-center text-sm text-black/45">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-black"
              >
                Create one
              </Link>
            </p>

            {/* Back Home */}
            <Link
              to="/"
              className="mt-5 block text-center text-[10px] font-bold uppercase tracking-[0.15em] text-black/35"
            >
              ← Back home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;