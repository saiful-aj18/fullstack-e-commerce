import { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchOrders = async () => {
      try {
        const res = await api.get("/admin/orders");

        if (!cancelled) {
          setOrders(res.data?.orders || []);
          setError("");
        }
      } catch (err) {
        console.error(
          "Failed to load orders:",
          err
        );

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Failed to load orders."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(
        `/admin/orders/${id}/status`,
        { status }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? { ...order, status }
            : order
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to update order status."
      );
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-400/10 text-emerald-400";

      case "Shipped":
        return "bg-blue-400/10 text-blue-400";

      case "Processing":
        return "bg-amber-400/10 text-amber-400";

      case "Cancelled":
        return "bg-red-400/10 text-red-400";

      default:
        return "bg-white/10 text-white/50";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white" />

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            Loading orders...
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
          Sales / Management
        </p>

        <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl font-black tracking-[-0.06em]">
              Orders.
            </h1>

            <p className="mt-2 text-sm text-white/35">
              Manage customer orders and update delivery status.
            </p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
              Total Orders
            </span>

            <span className="ml-2 text-sm font-black">
              {orders.length}
            </span>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Empty */}
      {orders.length === 0 && !error && (
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-12 text-center">
          <p className="text-sm text-white/30">
            No orders found.
          </p>
        </div>
      )}

      {/* Desktop */}
      {orders.length > 0 && (
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="px-6 py-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">
                    Order
                  </th>

                  <th className="px-6 py-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">
                    Customer
                  </th>

                  <th className="px-6 py-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">
                    Date
                  </th>

                  <th className="px-6 py-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">
                    Total
                  </th>

                  <th className="px-6 py-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold">
                        #
                        {order._id
                          ?.slice(-8)
                          .toUpperCase()}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold">
                        {order.user?.name ||
                          "Unknown"}
                      </p>

                      <p className="mt-1 text-xs text-white/30">
                        {order.user?.email ||
                          "No email"}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-xs text-white/40">
                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleDateString()
                        : "—"}
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-sm font-black">
                        $
                        {Number(
                          order.totalPrice || 0
                        ).toFixed(2)}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <select
                        value={
                          order.status ||
                          "Pending"
                        }
                        onChange={(e) =>
                          updateStatus(
                            order._id,
                            e.target.value
                          )
                        }
                        className={`rounded-full border-0 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.1em] outline-none ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Processing">
                          Processing
                        </option>

                        <option value="Shipped">
                          Shipped
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="space-y-3 p-4 md:hidden">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/25">
                      Order
                    </p>

                    <p className="mt-1 text-sm font-black">
                      #
                      {order._id
                        ?.slice(-8)
                        .toUpperCase()}
                    </p>
                  </div>

                  <p className="text-sm font-black">
                    $
                    {Number(
                      order.totalPrice || 0
                    ).toFixed(2)}
                  </p>
                </div>

                <div className="mt-5 border-t border-white/5 pt-4">
                  <p className="text-sm font-semibold">
                    {order.user?.name ||
                      "Unknown"}
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    {order.user?.email ||
                      "No email"}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.15em] text-white/25">
                    Status
                  </p>

                  <select
                    value={
                      order.status ||
                      "Pending"
                    }
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className={`w-full rounded-xl border-0 px-4 py-3 text-[9px] font-bold uppercase tracking-[0.1em] outline-none ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;