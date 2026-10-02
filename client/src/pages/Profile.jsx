import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";

import api from "../api/axios";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

 
  const [form, setForm] = useState({
    name: "",
    phone: "",
    avatar: "",
    address: ""
  });

  // NEW — fetch the logged-in user's real profile
  const getProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/users/profile");
      const fetchedUser = res.data.user;

      setUser(fetchedUser);
      setForm({
        name: fetchedUser.name || "",
        phone: fetchedUser.phone || "",
        avatar: fetchedUser.avatar || "",
        address: fetchedUser.address || ""
      });
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
        return;
      }
      setError(err.response?.data?.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // NEW — actually PUTs the update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setSaving(true);

      const res = await api.put("/users/profile", {
        name: form.name,
        phone: form.phone,
        avatar: form.avatar,
        address: form.address
      });

      setUser((prev) => ({ ...prev, ...res.data.user }));
      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const initials = (form.name || user?.email || "?")
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();


  if (loading) {
    return (
      <Container className="py-20">
        <div className="rounded-[2rem] bg-[#111313] p-10 text-center text-white">
          <p className="text-sm text-white/50">Loading your profile...</p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <PageHeader
        title="Your profile."
        description="Keep your account details current and manage your Shoply identity."
        eyebrow="SHOPLY / ACCOUNT"
      />

      <Container className="py-8 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="rounded-[2rem] bg-[#111313] p-7 text-white">
            <div className="flex flex-col items-center text-center">
              {form.avatar ? (
                <img
                  src={form.avatar}
                  alt={form.name}
                  className="h-28 w-28 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#d9e1e3] text-3xl font-black text-[#111313]">
                  {initials}
                </div>
              )}

              <h2 className="mt-6 text-xl font-black tracking-tight">{user?.name}</h2>
              <p className="mt-1 break-all text-xs text-white/45">{user?.email}</p>
            </div>

            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                Account
              </p>
              <p className="mt-3 text-sm leading-6 text-white/55">
                Update your personal details and keep your shopping profile ready.
              </p>
              <button
                type="button"
                onClick={handleLogout}
                className="mt-6 w-full rounded-full border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] transition hover:bg-white hover:text-[#111313]"
              >
                Logout
              </button>
            </div>
          </aside>

          <section className="rounded-[2rem] bg-white p-6 sm:p-9">
            <div className="mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/35">
                Personal details
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">Edit profile</h2>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
            )}
            {success && (
              <div className="mb-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
              {[
                ["name", "Full name", "Saiful Islam"],
                ["phone", "Phone", "01700000000"],
                ["avatar", "Avatar URL", "https://..."],
              ].map(([name, label, placeholder]) => (
                <div key={name} className={name === "avatar" ? "sm:col-span-2" : ""}>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
                    {label}
                  </label>
                  <input
                    type="text"
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full rounded-2xl border border-black/10 bg-[#f4f6f6] px-4 py-3.5 text-sm outline-none transition focus:border-black/30 focus:bg-white"
                  />
                </div>
              ))}

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full cursor-not-allowed rounded-2xl border border-black/10 bg-black/[0.035] px-4 py-3.5 text-sm text-black/40"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
                  Address
                </label>
                <textarea
                  rows="4"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Your address"
                  className="w-full resize-none rounded-2xl border border-black/10 bg-[#f4f6f6] px-4 py-3.5 text-sm outline-none transition focus:border-black/30 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-[#111313] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-black disabled:opacity-40"
                >
                  {saving ? "Saving..." : "Update profile"} <span className="ml-2">↗</span>
                </button>
              </div>
            </form>
          </section>
        </div>
      </Container>
    </>
  );
}

export default Profile;
