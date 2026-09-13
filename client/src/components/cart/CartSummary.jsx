// CHANGED: now takes cartItems + onCheckout as props and computes
// real numbers, instead of showing hardcoded dummy totals.
function CartSummary({ cartItems = [], onCheckout }) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = cartItems.length > 0 ? 20 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="text-xl font-bold text-indigo-600">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        disabled={cartItems.length === 0}
        className="mt-6 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default CartSummary;
