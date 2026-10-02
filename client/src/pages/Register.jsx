import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Name, email and password are required.");
      return;
    }
    try {
      setLoading(true);
      const res = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-90px)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[720px] max-w-[1450px] overflow-hidden rounded-[2.5rem] bg-[#111313] lg:grid-cols-[.95fr_1.05fr]">
        <div className="relative order-2 flex items-center bg-[#e7ecee] p-6 sm:p-12 lg:order-1 lg:p-16">
          <div className="mx-auto w-full max-w-md">
            <Link to="/" className="text-xl font-black tracking-[-0.05em] lg:hidden">SHOPLY<span className="text-black/35">.</span></Link>
            <div className="mt-10 lg:mt-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/35">Account / Register</p>
              <h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">Create account.</h1>
              <p className="mt-3 text-sm text-black/45">Join Shoply and start building your collection.</p>
            </div>
            {error && <div className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
            <form onSubmit={handleRegister} className="mt-8 space-y-5">
              {[
                ["name", "Full name", name, setName, "John Doe", "text"],
                ["email", "Email", email, setEmail, "you@example.com", "email"],
                ["password", "Password", password, setPassword, "••••••••", "password"],
              ].map(([key, label, value, setter, placeholder, type]) => (
                <label key={key} className="block">
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">{label}</span>
                  <input type={type} value={value} onChange={(e) => setter(e.target.value)} placeholder={placeholder}
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-sm outline-none transition focus:border-black/35" />
                </label>
              ))}
              <button disabled={loading} className="w-full rounded-full bg-[#111313] py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-40">
                {loading ? "Creating account..." : "Create account"} <span className="ml-2">↗</span>
              </button>
            </form>
            <p className="mt-8 text-center text-sm text-black/45">
              Already have an account? <Link to="/login" className="font-bold text-black">Login</Link>
            </p>
          </div>
        </div>

        <div className="relative order-1 hidden overflow-hidden p-10 text-white lg:order-2 lg:flex lg:flex-col lg:justify-between xl:p-14">
          <Link to="/" className="relative text-xl font-black tracking-[-0.05em]">SHOPLY<span className="text-[#a9b8bc]">.</span></Link>
          <div className="relative max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">Start your collection</p>
            <h2 className="mt-5 text-6xl font-black leading-[.9] tracking-[-0.06em] xl:text-8xl">Find<br />your next.</h2>
            <p className="mt-8 max-w-md text-sm leading-7 text-white/45">
              One account for your cart, wishlist, orders and everything you discover.
            </p>
          </div>
          <div className="absolute -bottom-24 -right-20 h-96 w-96 rounded-full border border-white/10" />
        </div>
      </div>
    </section>
  );
}

export default Register;
