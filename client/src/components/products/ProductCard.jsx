import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function ProductCard({ id, title, price, image, category }) {
  const navigate = useNavigate();

  const requireLogin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!requireLogin()) return;

    try {
      await api.post("/cart", {
        productId: id,
        title,
        price,
        image,
        quantity: 1
      });
      alert("Added to cart.");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to cart.");
    }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    if (!requireLogin()) return;

    try {
      await api.post("/wishlist", { productId: id, title, price, image });
      alert("Added to wishlist.");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to wishlist.");
    }
  };

  return (
    <Link
      to={`/products/${id}`}
      className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative flex h-56 items-center justify-center bg-slate-100">
        <img src={image} alt={title} className="h-full w-full object-contain p-6" />

        <button
          onClick={handleAddToWishlist}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow-sm hover:bg-red-50"
        >
          ♥
        </button>
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase text-indigo-600">
          {category}
        </p>

        <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-lg font-bold text-indigo-600">${price}</p>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full rounded-lg border border-indigo-600 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-600 hover:text-white"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;