import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    stock: "",
  });

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;

    let cancelled = false;

    const fetchProduct = async () => {
      setLoading(true);

      try {
        const res = await api.get(
          `/products/${id}`
        );

        const product = res.data?.product;

        if (!cancelled && product) {
          setForm({
            title: product.title || "",
            price: product.price ?? "",
            description: product.description || "",
            category: product.category || "",
            image: product.image || "",
            stock: product.stock ?? "",
          });
        }
      } catch (err) {
        console.error(
          "Failed to load product:",
          err
        );

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Failed to load product."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.title ||
      !form.price ||
      !form.description ||
      !form.category
    ) {
      setError(
        "Title, price, description and category are required."
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title: form.title,
        price: Number(form.price),
        description: form.description,
        category: form.category,
        image: form.image,
        stock: Number(form.stock || 0),
      };

      if (isEdit) {
        await api.put(
          `/products/${id}`,
          payload
        );
      } else {
        await api.post(
          "/products",
          payload
        );
      }

      navigate("/admin/products");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to save product."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white" />

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/admin/products"
          className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/30 hover:text-white"
        >
          ← Back to products
        </Link>

        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
          Products / {isEdit ? "Edit" : "Create"}
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-[-0.06em]">
          {isEdit
            ? "Edit Product."
            : "Add Product."}
        </h1>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8"
      >
        <div className="grid gap-6 md:grid-cols-2">

          {/* Title */}
          <label className="md:col-span-2">
            <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em] text-white/30">
              Product title
            </span>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Product title"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/30"
            />
          </label>

          {/* Price */}
          <label>
            <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em] text-white/30">
              Price
            </span>

            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"
            />
          </label>

          {/* Stock */}
          <label>
            <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em] text-white/30">
              Stock
            </span>

            <input
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={handleChange}
              placeholder="0"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"
            />
          </label>

          {/* Category */}
          <label>
            <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em] text-white/30">
              Category
            </span>

            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="men's clothing"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"
            />
          </label>

          {/* Image */}
          <label>
            <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em] text-white/30">
              Image URL
            </span>

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"
            />
          </label>

          {/* Description */}
          <label className="md:col-span-2">
            <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em] text-white/30">
              Description
            </span>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={6}
              placeholder="Product description..."
              className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"
            />
          </label>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            to="/admin/products"
            className="rounded-full border border-white/10 px-6 py-3 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-white/45 transition hover:bg-white/5"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-black transition hover:-translate-y-0.5 disabled:opacity-40"
          >
            {saving
              ? "Saving..."
              : isEdit
              ? "Update Product"
              : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminProductForm;