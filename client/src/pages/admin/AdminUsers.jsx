import { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");

        if (!cancelled) {
          setUsers(res.data?.users || []);
          setError("");
        }
      } catch (err) {
        console.error(
          "Failed to load users:",
          err
        );

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Failed to load users."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateRole = async (id, role) => {
    try {
      await api.put(
        `/admin/users/${id}/role`,
        { role }
      );

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id
            ? { ...user, role }
            : user
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to update role."
      );
    }
  };

  const updateStatus = async (
    id,
    isActive
  ) => {
    try {
      await api.put(
        `/admin/users/${id}/status`,
        { isActive }
      );

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id
            ? { ...user, isActive }
            : user
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to update user status."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white" />

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
          Customers / Management
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-[-0.06em]">
          Users.
        </h1>

        <p className="mt-2 text-sm text-white/35">
          Manage customer accounts and permissions.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {users.length === 0 && !error ? (
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-12 text-center">
          <p className="text-sm text-white/30">
            No users found.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="px-6 py-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">
                    User
                  </th>

                  <th className="px-6 py-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">
                    Role
                  </th>

                  <th className="px-6 py-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">
                    Status
                  </th>

                  <th className="px-6 py-5 text-right text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold">
                        {user.name}
                      </p>

                      <p className="mt-1 text-xs text-white/30">
                        {user.email}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <select
                        value={
                          user.role || "user"
                        }
                        onChange={(e) =>
                          updateRole(
                            user._id,
                            e.target.value
                          )
                        }
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-white outline-none"
                      >
                        <option
                          value="user"
                          className="bg-[#111313]"
                        >
                          User
                        </option>

                        <option
                          value="admin"
                          className="bg-[#111313]"
                        >
                          Admin
                        </option>
                      </select>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={
                          user.isActive
                            ? "rounded-full bg-emerald-400/10 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-emerald-400"
                            : "rounded-full bg-red-400/10 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-red-400"
                        }
                      >
                        {user.isActive
                          ? "Active"
                          : "Blocked"}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() =>
                          updateStatus(
                            user._id,
                            !user.isActive
                          )
                        }
                        className="rounded-full border border-white/10 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-white/50 transition hover:bg-white hover:text-black"
                      >
                        {user.isActive
                          ? "Block"
                          : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="space-y-3 p-4 md:hidden">
            {users.map((user) => (
              <div
                key={user._id}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <p className="text-sm font-bold">
                  {user.name}
                </p>

                <p className="mt-1 text-xs text-white/30">
                  {user.email}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <select
                    value={
                      user.role || "user"
                    }
                    onChange={(e) =>
                      updateRole(
                        user._id,
                        e.target.value
                      )
                    }
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-[9px] font-bold uppercase text-white outline-none"
                  >
                    <option
                      value="user"
                      className="bg-[#111313]"
                    >
                      User
                    </option>

                    <option
                      value="admin"
                      className="bg-[#111313]"
                    >
                      Admin
                    </option>
                  </select>

                  <button
                    onClick={() =>
                      updateStatus(
                        user._id,
                        !user.isActive
                      )
                    }
                    className="rounded-xl bg-white px-3 py-3 text-[9px] font-bold uppercase text-black"
                  >
                    {user.isActive
                      ? "Block"
                      : "Activate"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;