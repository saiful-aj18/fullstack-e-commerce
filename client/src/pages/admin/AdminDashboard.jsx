import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalReviews: 0,
    revenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchDashboard = async () => {
      try {
        const res = await api.get("/admin/dashboard");

        if (!cancelled) {
          setStats(
            res.data?.stats || {
              totalUsers: 0,
              totalProducts: 0,
              totalOrders: 0,
              totalReviews: 0,
              revenue: 0,
            }
          );

          setRecentOrders(
            res.data?.recentOrders || []
          );

          setError("");
        }
      } catch (err) {
        console.error(
          "Failed to load dashboard:",
          err
        );

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Failed to load dashboard."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const cards = [
    {
      label: "Revenue",
      value: `$${Number(stats.revenue || 0).toFixed(2)}`,
    },
    {
      label: "Orders",
      value: stats.totalOrders,
    },
    {
      label: "Products",
      value: stats.totalProducts,
    },
    {
      label: "Customers",
      value: stats.totalUsers,
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white" />

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
          Overview / Shoply
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-[-0.06em]">
          Dashboard.
        </h1>

        <p className="mt-2 text-sm text-white/35">
          Monitor your store performance and activity.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
              {card.label}
            </p>

            <p className="mt-4 text-3xl font-black tracking-[-0.05em]">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Reviews */}
      <div className="mt-4">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
            Reviews
          </p>

          <p className="mt-3 text-2xl font-black">
            {stats.totalReviews}
          </p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03]">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
              Latest activity
            </p>

            <h2 className="mt-2 text-xl font-black tracking-[-0.04em]">
              Recent Orders
            </h2>
          </div>

          <Link
            to="/admin/orders"
            className="rounded-full border border-white/10 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white/50 transition hover:bg-white hover:text-black"
          >
            View all
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-white/30">
              No recent orders.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex flex-col justify-between gap-3 px-6 py-5 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="text-sm font-bold">
                    #
                    {order._id
                      ?.slice(-8)
                      .toUpperCase()}
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    {order.user?.name ||
                      "Unknown customer"}
                  </p>
                </div>

                <div className="flex items-center gap-5">
                  <span className="text-sm font-black">
                    $
                    {Number(
                      order.totalPrice || 0
                    ).toFixed(2)}
                  </span>

                  <span className="rounded-full bg-white/5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white/45">
                    {order.status || "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;