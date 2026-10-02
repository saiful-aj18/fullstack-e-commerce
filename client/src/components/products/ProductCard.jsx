import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function ProductCard({ id, title, price, image, category }) {
  const navigate = useNavigate();

  const requireLogin = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleAddToCart = async () => {
    if (!requireLogin()) return;
    try {
      await api.post("/cart", { productId: id, title, price, image, quantity: 1 });
      alert("Added to cart.");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to cart.");
    }
  };

  const handleAddToWishlist = async () => {
    if (!requireLogin()) return;
    try {
      await api.post("/wishlist", { productId: id, title, price, image });
      alert("Added to wishlist.");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to wishlist.");
    }
  };

  return (
    <article className="group">
      <div className="relative aspect-[0.82] overflow-hidden rounded-[2rem] bg-[#e6ebed]">
        <Link to={`/products/${id}`} className="absolute inset-0">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-contain p-8 transition duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] backdrop-blur">
          {category}
        </span>

        <button
          onClick={handleAddToWishlist}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#111313] text-white transition hover:scale-110"
          aria-label="Add to wishlist"
        >
          ♡
        </button>

        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-4 right-4 z-10 translate-y-3 rounded-full bg-[#111313] py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Add to cart →
        </button>
      </div>

      <div className="flex items-start justify-between gap-4 px-1 pt-4">
        <div className="min-w-0">
          <Link
            to={`/products/${id}`}
            className="line-clamp-2 text-sm font-bold leading-5 tracking-[-0.02em] text-black"
          >
            {title}
          </Link>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-black/35">
            Shoply selection
          </p>
        </div>
        <p className="shrink-0 text-sm font-black">${Number(price).toFixed(2)}</p>
      </div>
    </article>
  );
}

export default ProductCard;
