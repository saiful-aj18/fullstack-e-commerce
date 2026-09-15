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
      <>
        <PageHeader
          title="My Profile"
          description="Manage your personal account information."
        />
        <Container className="py-12">
          <p className="text-center text-slate-500">Loading profile...</p>
        </Container>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="My Profile"
        description="Manage your personal account information."
      />

      <Container className="py-12">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            {/* Profile Header */}
            <div className="bg-slate-950 px-6 py-8 sm:px-10">
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                {form.avatar ? (
                  <img
                    src={form.avatar}
                    alt={form.name}
                    className="h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600 text-3xl font-bold text-white">
                    {initials}
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                  <p className="mt-1 text-slate-400">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-10">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Update your account information below.
                </p>
              </div>

              {error && (
                <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border bg-slate-100 px-4 py-3 text-slate-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="01700000000"
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">Avatar URL</label>
                  <input
                    type="text"
                    name="avatar"
                    value={form.avatar}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold">Address</label>
                  <textarea
                    rows="4"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Your address"
                    className="w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div className="flex justify-end sm:col-span-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Update Profile"}
                  </button>
                </div>
              </form>

              <div className="mt-10 border-t pt-8">
                <h3 className="font-bold text-slate-900">Account</h3>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-4 rounded-lg border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Profile;