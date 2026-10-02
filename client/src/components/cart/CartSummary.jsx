function CartSummary({ cartItems = [], onCheckout }) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 20 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <aside className="rounded-[2rem] bg-[#111313] p-6 text-white sm:p-8 lg:sticky lg:top-28 lg:h-fit">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
          Summary
        </p>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-white/45">
          {cartItems.length} ITEMS
        </span>
      </div>

      <h2 className="mt-8 text-2xl font-black tracking-tight">Your order</h2>

      <div className="mt-8 space-y-4 text-sm">
        <div className="flex justify-between text-white/55">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-white/55">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-white/55">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="my-5 border-t border-white/10 pt-5">
          <div className="flex items-end justify-between gap-4">
            <span className="text-white/60">Total</span>
            <span className="text-3xl font-black">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        disabled={cartItems.length === 0}
        className="mt-4 w-full rounded-full bg-white px-5 py-4 text-sm font-black text-[#111313] transition hover:-translate-y-0.5 hover:bg-[#d7e0e2] disabled:cursor-not-allowed disabled:opacity-30"
      >
        Proceed to checkout <span className="ml-2">↗</span>
      </button>
    </aside>
  );
}

export default CartSummary;
