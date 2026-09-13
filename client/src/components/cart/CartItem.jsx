function CartItem({
  image,
  title,
  price,
  quantity,
  productId, // CHANGED: was `_id` (cart items don't have an _id)
  removeCart
}) {
  return (
    <div className="flex gap-5 border-b py-5">
      <img
        src={image}
        alt={title}
        className="h-28 w-28 rounded-lg object-cover"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-slate-900">{title}</h3>

        <p className="mt-2 text-slate-600">Price: ${price}</p>

        <p className="text-sm text-slate-500">
          Quantity: {quantity || 1}
        </p>

        <button
          onClick={() => removeCart(productId)}
          className="mt-3 text-sm font-semibold text-red-500 hover:text-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
