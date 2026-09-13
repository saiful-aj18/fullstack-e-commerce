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

  // Show Cart
  // FIXED: was calling GET /cart/${userId} (route doesn't exist —
  // backend reads the user from the JWT token, not a URL param).
  // Correct call is GET /cart (protected route).
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
    getCart();
  }, []);

  // Remove From Cart
  // FIXED: was calling DELETE /cart/${item._id} — cart items don't have
  // an _id (schema uses { _id: false }). Backend route is
  // DELETE /cart/:productId, so we remove by productId instead.
  const removeCart = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);

      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Checkout -> creates an Order from the current cart, then
  // empties the cart and redirects straight to that order's Invoice.
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

      // Empty the cart after a successful order (existing clearCart route)
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
        title="Shopping Cart"
        description="Review and manage the products in your cart."
      />

      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-2xl border bg-white px-6 shadow-sm">
            <h2 className="font-bold py-5">Cart Items</h2>

            {loading && (
              <p className="pb-5 text-slate-500">Loading cart...</p>
            )}

            {!loading && cartItems.length === 0 && (
              <p className="pb-5 text-slate-500">Your cart is empty.</p>
            )}

            {cartItems.map((item) => (
              <CartItem
                key={item.productId}
                {...item}
                removeCart={removeCart}
              />
            ))}
          </div>

          <CartSummary
            cartItems={cartItems}
            onCheckout={checkout}
          />
        </div>
      </Container>
    </>
  );
}

export default Cart;
