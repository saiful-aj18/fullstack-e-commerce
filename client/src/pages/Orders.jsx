import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";
import api from "../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/order/${userId}`);
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getOrders();
  }, []);

  return (
    <>
      <PageHeader
        title="Order history."
        description="Everything you've purchased, kept in one clean place."
        eyebrow="SHOPLY / ORDERS"
      />

      <Container className="py-8 sm:py-12">
        {loading ? (
          <div className="rounded-[2rem] bg-white p-10 text-center text-sm text-black/45">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-[2rem] bg-[#111313] px-6 py-20 text-center text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Order history</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">No orders yet.</h2>
            <Link to="/products" className="mt-8 inline-block rounded-full bg-white px-7 py-3 text-sm font-bold text-[#111313]">
              Start shopping ↗
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order, index) => (
              <article key={order._id} className="rounded-[2rem] bg-white p-5 sm:p-7">
                <div className="flex flex-col gap-5 border-b border-black/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                      Order {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 break-all text-sm font-black">{order._id}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#e8edef] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em]">
                      {order.status}
                    </span>
                    <Link
                      to={`/invoice/${order._id}`}
                      className="rounded-full bg-[#111313] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white"
                    >
                      Invoice ↗
                    </Link>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {order.products?.map((item) => (
                    <div key={item._id} className="flex items-center justify-between gap-4 rounded-2xl bg-[#f4f6f6] p-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{item.title}</p>
                        <p className="mt-1 text-xs text-black/40">Qty {item.quantity} · ${item.price}</p>
                      </div>
                      <Link
                        to={`/review/${item.productId}?title=${encodeURIComponent(item.title)}`}
                        className="shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-black/55 hover:text-black"
                      >
                        Review ↗
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.15em] text-black/35">Total</span>
                  <span className="text-2xl font-black">${order.totalPrice}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}

export default Orders;
