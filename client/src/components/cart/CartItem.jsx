import { Link } from "react-router-dom";

function CartItem({ image, title, price, quantity, productId, removeCart }) {
  return (
    <div className="group flex gap-4 border-b border-black/10 py-5 sm:gap-6">
      <Link
        to={`/products/${productId}`}
        className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#e7ebec] sm:h-32 sm:w-32"
      >
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3">
            <Link
              to={`/products/${productId}`}
              className="line-clamp-2 max-w-md text-sm font-bold tracking-tight text-[#111313] sm:text-base"
            >
              {title}
            </Link>
            <p className="shrink-0 text-sm font-black sm:text-base">
              ${(price * (quantity || 1)).toFixed(2)}
            </p>
          </div>
          <p className="mt-2 text-xs uppercase tracking-[0.15em] text-black/40">
            ${Number(price).toFixed(2)} / unit · Qty {quantity || 1}
          </p>
        </div>

        <button
          onClick={() => removeCart(productId)}
          className="mt-3 w-fit text-[10px] font-bold uppercase tracking-[0.18em] text-black/45 transition hover:text-red-600"
        >
          Remove item
        </button>
      </div>
    </div>
  );
}

export default CartItem;
