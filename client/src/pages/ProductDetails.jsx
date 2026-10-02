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
    <Container className="py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex items-center justify-center rounded-2xl border bg-slate-50 p-10">
          <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase text-indigo-600">
            {product.category}
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            {product.title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
          </p>

          <p className="mt-5 text-3xl font-bold text-indigo-600">${product.price}</p>

          <p className="mt-5 leading-7 text-slate-600">{product.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <label className="text-sm font-semibold">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-20 rounded-lg border px-3 py-2 text-center outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mt-6 flex gap-4">
            <Button onClick={handleAddToCart}>Add to Cart</Button>
            <Button variant="outline" onClick={handleAddToWishlist}>
              ♥ Wishlist
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ProductDetails;