import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";
import api from "../api/axios";

function Invoice() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const getOrder = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/order/single/${orderId}`);
      setOrder(res.data.order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getOrder();
  }, [orderId]);

  return (
    <>
      <PageHeader
        title="Invoice."
        description="Your order summary and purchase details."
        eyebrow="SHOPLY / RECEIPT"
      />
      <Container className="py-8 sm:py-12">
        {loading ? (
          <div className="rounded-[2rem] bg-white p-10 text-center text-sm text-black/45">Loading invoice...</div>
        ) : !order ? (
          <div className="rounded-[2rem] bg-[#111313] p-16 text-center text-white">Order not found.</div>
        ) : (
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-white">
            <div className="bg-[#111313] p-7 text-white sm:p-10">
              <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/35">Order invoice</p>
                  <h2 className="mt-3 break-all text-xl font-black">{order._id}</h2>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">Status</p>
                  <p className="mt-2 text-sm font-bold">{order.status}</p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-10">
              <div className="space-y-3">
                {order.products?.map((item) => (
                  <div key={item._id} className="flex items-center justify-between gap-5 rounded-2xl bg-[#f4f6f6] p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{item.title}</p>
                      <p className="mt-1 text-xs text-black/40">Qty {item.quantity}</p>
                    </div>
                    <p className="shrink-0 text-sm font-black">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-end justify-between border-t border-black/10 pt-6">
                <span className="text-xs uppercase tracking-[0.16em] text-black/35">Order total</span>
                <span className="text-4xl font-black tracking-tight">${order.totalPrice}</span>
              </div>

              <Link to="/orders" className="mt-8 inline-block rounded-full bg-[#111313] px-6 py-3 text-sm font-bold text-white">
                Back to orders ↗
              </Link>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

export default Invoice;
