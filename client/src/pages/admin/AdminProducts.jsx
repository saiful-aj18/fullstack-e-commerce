import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Plus,
  Pencil,
  Trash2,
  Package,
  Search,
  Loader2,
} from "lucide-react";

import api from "../../api/axios";


function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");


  // ======================================================
  // INITIAL LOAD
  // ======================================================

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");

        const data = res.data?.products || res.data || [];

        if (isMounted) {
          setProducts(
            Array.isArray(data)
              ? data
              : []
          );
        }
      } catch (err) {
        console.error("Failed to load products:", err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
            "Failed to load products."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);


  // ======================================================
  // DELETE PRODUCT
  // ======================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await api.delete(`/products/${id}`);

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) =>
            product.id !== id &&
            product._id !== id
        )
      );

    } catch (err) {
      console.error("Delete failed:", err);

      alert(
        err.response?.data?.message ||
        "Failed to delete product."
      );
    } finally {
      setDeletingId(null);
    }
  };


  // ======================================================
  // SEARCH
  // ======================================================

  const filteredProducts = products.filter(
    (product) => {
      const title =
        product.title?.toLowerCase() || "";

      const category =
        product.category?.toLowerCase() || "";

      const keyword =
        search.toLowerCase().trim();

      return (
        title.includes(keyword) ||
        category.includes(keyword)
      );
    }
  );


  // ======================================================
  // FORMAT PRICE
  // ======================================================

  const formatPrice = (price) => {
    return `$${Number(price || 0).toFixed(2)}`;
  };


  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <section className="min-h-[calc(100vh-68px)]">

        <div className="flex min-h-[60vh] items-center justify-center">

          <div className="flex flex-col items-center gap-4">

            <Loader2
              size={26}
              className="animate-spin text-white/50"
            />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              Loading products...
            </p>

          </div>

        </div>

      </section>
    );
  }


  return (
    <section className="min-w-0">

      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div className="mb-8">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div className="min-w-0">

            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">
              Products / Management
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] sm:text-5xl">
              Products.
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
              Manage your store inventory and product catalog.
            </p>

          </div>


          {/* Add Product */}

          <Link
            to="/admin/products/new"
            className="flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.15em] text-black transition hover:bg-white/90 sm:w-auto"
          >
            <Plus size={15} />

            <span>
              Add Product
            </span>
          </Link>

        </div>

      </div>


      {/* ==================================================
          SEARCH + COUNT
      ================================================== */}

      <div className="mb-6 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Search */}

        <div className="relative w-full sm:max-w-md">

          <Search
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search products..."
            className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.05]"
          />

        </div>


        {/* Product count */}

        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">

          <Package size={14} />

          <span>
            {filteredProducts.length} Products
          </span>

        </div>

      </div>


      {/* ==================================================
          ERROR
      ================================================== */}

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-400">
          {error}
        </div>
      )}


      {/* ==================================================
          EMPTY STATE
      ================================================== */}

      {!error &&
        filteredProducts.length === 0 && (
          <div className="rounded-[24px] border border-white/10 bg-white/[0.025] px-6 py-16 text-center">

            <Package
              size={32}
              className="mx-auto text-white/20"
            />

            <h2 className="mt-5 text-lg font-bold">
              No products found
            </h2>

            <p className="mt-2 text-sm text-white/35">
              Try another search or add a new product.
            </p>

          </div>
        )}


      {/* ==================================================
          PRODUCT GRID
      ================================================== */}

      {filteredProducts.length > 0 && (
        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

          {filteredProducts.map(
            (product) => {

              const productId =
                product.id || product._id;

              return (
                <article
                  key={productId}
                  className="group min-w-0 overflow-hidden rounded-[24px] border border-white/10 bg-[#151717] transition duration-300 hover:border-white/15 hover:bg-[#181a1a]"
                >

                  {/* ========================================
                      PRODUCT IMAGE
                  ======================================== */}

                  <div className="relative h-[220px] overflow-hidden bg-[#101212] sm:h-[240px]">

                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-contain p-8 transition duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">

                        <Package
                          size={40}
                          className="text-white/10"
                        />

                      </div>
                    )}


                    {/* Category */}

                    <div className="absolute left-4 top-4 max-w-[70%]">

                      <span className="inline-block max-w-full truncate rounded-full bg-black/70 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-white/70 backdrop-blur-md">
                        {product.category ||
                          "Uncategorized"}
                      </span>

                    </div>

                  </div>


                  {/* ========================================
                      PRODUCT INFO
                  ======================================== */}

                  <div className="min-w-0 p-4 sm:p-5">

                    <div className="min-w-0">

                      <h2 className="truncate text-base font-bold text-white sm:text-lg">
                        {product.title}
                      </h2>

                      <p className="mt-1 truncate text-[11px] text-white/30">
                        ID: #{product.id}
                      </p>

                    </div>


                    {/* Price + Stock */}

                    <div className="mt-5 flex items-center justify-between gap-3">

                      <div className="min-w-0">

                        <p className="text-xl font-black tracking-[-0.04em] text-white">
                          {formatPrice(product.price)}
                        </p>

                      </div>


                      <div className="shrink-0">

                        <span
                          className={`rounded-full px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] ${
                            Number(product.stock || 0) > 0
                              ? "bg-emerald-400/10 text-emerald-400"
                              : "bg-red-400/10 text-red-400"
                          }`}
                        >
                          {Number(product.stock || 0) > 0
                            ? `${product.stock} Stock`
                            : "Out of stock"}
                        </span>

                      </div>

                    </div>


                    {/* ======================================
                        ACTION BUTTONS
                    ====================================== */}

                    <div className="mt-5 grid grid-cols-2 gap-2">

                      {/* Edit */}

                      <Link
                        to={`/admin/products/edit/${productId}`}
                        className="flex h-11 min-w-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 text-[9px] font-bold uppercase tracking-[0.12em] text-white/60 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                      >
                        <Pencil size={14} />

                        <span>
                          Edit
                        </span>
                      </Link>


                      {/* Delete */}

                      <button
                        type="button"
                        disabled={
                          deletingId === productId
                        }
                        onClick={() =>
                          handleDelete(productId)
                        }
                        className="flex h-11 min-w-0 items-center justify-center gap-2 rounded-full bg-red-500/10 px-3 text-[9px] font-bold uppercase tracking-[0.12em] text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                      >

                        {deletingId === productId ? (
                          <Loader2
                            size={14}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={14} />
                        )}

                        <span>
                          Delete
                        </span>

                      </button>

                    </div>

                  </div>

                </article>
              );
            }
          )}

        </div>
      )}

    </section>
  );
}


export default AdminProducts;