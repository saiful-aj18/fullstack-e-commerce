import { Link } from "react-router-dom";

function WishlistItem({ image, title, price, productId, removeWishlist }) {
  return (
    <article className="group">
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[2rem] bg-[#e6ebed]">
        <Link to={`/products/${productId}`} className="absolute inset-0">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain p-8 transition duration-700 group-hover:scale-105"
          />
        </Link>

        <button
          onClick={() => removeWishlist(productId)}
          aria-label="Remove from wishlist"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-sm shadow-sm backdrop-blur transition hover:bg-[#111313] hover:text-white"
        >
          ♥
        </button>

        <Link
          to={`/products/${productId}`}
          className="absolute bottom-4 left-4 right-4 z-10 translate-y-3 rounded-full bg-[#111313] px-4 py-3 text-center text-xs font-bold text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          View product ↗
        </Link>
      </div>

      <div className="flex items-start justify-between gap-4 px-1 pt-4">
        <Link
          to={`/products/${productId}`}
          className="line-clamp-2 text-sm font-bold leading-5 tracking-tight"
        >
          {title}
        </Link>
        <p className="shrink-0 text-sm font-black">${price}</p>
      </div>
    </article>
  );
}

export default WishlistItem;
