import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/common/PageHeader";
import Container from "../components/common/Container";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import api from "../api/axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const getCart = async () => {
    try {
      setLoading(true);
      const res = await api.get("/cart");
      setCartItems(res.data.cart.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCart();
  }, []);

  const removeCart = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const checkout = async () => {
    try {
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const res = await api.post("/order", {
        user: userId,
        products: cartItems,
        totalPrice: total
      });

      await api.delete("/cart");
      setCartItems([]);
      alert("Order created successfully!");
      navigate(`/invoice/${res.data.order._id}`);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Checkout failed.");
    }
  };

  return (
    <>
      <PageHeader
        title="Your Cart"
        description="Review your pieces before completing the order."
        eyebrow="SHOPLY / BAG"
      />

      <Container className="py-8 sm:py-12">
        {loading ? (
          <div className="rounded-[2rem] bg-white p-10 text-center text-sm text-black/45">
            Loading your cart...
          </div>
        ) : cartItems.length === 0 ? (
          <div className="rounded-[2rem] bg-[#111313] px-6 py-20 text-center text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              Nothing here yet
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">Your cart is empty.</h2>
            <button
              onClick={() => navigate("/products")}
              className="mt-8 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#111313]"
            >
              Explore collection ↗
            </button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <section className="rounded-[2rem] bg-white p-5 sm:p-7">
              <div className="mb-2 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/35">
                    Selected pieces
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight">Cart items</h2>
                </div>
                <span className="text-xs text-black/40">{cartItems.length} products</span>
              </div>

              {cartItems.map((item) => (
                <CartItem key={item.productId} {...item} removeCart={removeCart} />
              ))}
            </section>

            <CartSummary cartItems={cartItems} onCheckout={checkout} />
          </div>
        )}
      </Container>
    </>
  );
}

export default Cart;
