import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Container from "../components/common/Container";
import Button from "../components/common/Button";

import externalApi from "../api/externalProducts";
import api from "../api/axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const getProduct = async () => {
    try {
      setLoading(true);
      const res = await externalApi.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProduct();
  }, [id]);

  const requireLogin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleAddToCart = async () => {
    if (!requireLogin()) return;

    try {
      await api.post("/cart", {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity
      });
      alert("Added to cart.");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to cart.");
    }
  };

  const handleAddToWishlist = async () => {
    if (!requireLogin()) return;

    try {
      await api.post("/wishlist", {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image
      });
      alert("Added to wishlist.");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to wishlist.");
    }
  };

  if (loading) {
    return (
      <Container className="py-20">
        <p className="text-center text-slate-500">Loading product...</p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-20">
        <p className="text-center text-slate-500">Product not found.</p>
      </Container>
    );
  }

 return (
  <div className="min-h-screen bg-[#dce2e4] px-3 py-8 sm:px-5 sm:py-12">

    <div className="mx-auto max-w-[1500px]">

      <div className="grid overflow-hidden rounded-[30px] bg-[#eef0f0] lg:grid-cols-[1.15fr_0.85fr]">

        {/* Image */}
        <div className="relative flex min-h-[550px] items-center justify-center bg-[#d1d6d8] p-8 sm:p-14">

          <span className="absolute left-6 top-6 rounded-full bg-white/70 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em]">
            Product / 01
          </span>

          <button
            onClick={handleAddToWishlist}
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-black text-lg text-white"
          >
            ♡
          </button>

          <img
            src={product.image}
            alt={product.title}
            className="max-h-[540px] w-full object-contain transition duration-700 hover:scale-105"
          />

        </div>

        {/* Details */}
        <div className="flex flex-col justify-between p-7 sm:p-12 lg:p-16">

          <div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                {product.category}
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/40">
                ★ {product.rating?.rate}
              </span>
            </div>

            <h1 className="mt-8 text-[clamp(42px,5vw,78px)] font-black leading-[0.88] tracking-[-0.07em]">
              {product.title}
            </h1>

            <p className="mt-8 max-w-lg text-sm leading-7 text-black/50">
              {product.description}
            </p>

          </div>

          <div className="mt-12">

            <div className="mb-6 flex items-end justify-between border-b border-black/10 pb-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                Price
              </span>

              <span className="text-4xl font-black tracking-[-0.05em]">
                ${product.price}
              </span>
            </div>

            <div className="mb-5 flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/50">
                Quantity
              </label>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.max(
                      1,
                      Number(e.target.value)
                    )
                  )
                }
                className="w-20 rounded-full bg-white px-4 py-3 text-center text-sm outline-none"
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-2">

              <Button
                onClick={handleAddToCart}
                className="rounded-full bg-black py-4 text-xs font-bold uppercase tracking-[0.15em] text-white hover:bg-black"
              >
                Add to cart →
              </Button>

              <Button
                variant="outline"
                onClick={handleAddToWishlist}
                className="rounded-full border-black/10 bg-white py-4 text-xs font-bold uppercase tracking-[0.15em] text-black"
              >
                Save ♡
              </Button>

            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
);
}

export default ProductDetails;