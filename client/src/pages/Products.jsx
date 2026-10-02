import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductFilter from "../components/products/ProductFilter";
import ProductGrid from "../components/products/ProductGrid";
import LoadingSkeleton from "../components/common/LoadingSkeleton";

import externalApi from "../api/externalProducts";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const activeCategory = searchParams.get("category") || "";

  const getProducts = async () => {
    try {
      setLoading(true);

      const res = await externalApi.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const res = await externalApi.get("/products/categories");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProducts();
    getCategories();
  }, []);

  const handleCategoryChange = (cat) => {
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  const visibleProducts = products
    .filter((p) => (activeCategory ? p.category === activeCategory : true))
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });

    return (
  <div className="min-h-screen bg-[#dce2e4] px-3 py-8 sm:px-5 sm:py-12">
    <div className="mx-auto max-w-[1500px]">

      <ProductFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
      />

      <div className="mb-8 flex items-center justify-between border-b border-black/10 pb-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
          {visibleProducts.length} products
        </p>

        <p className="hidden text-[10px] uppercase tracking-[0.15em] text-black/30 sm:block">
          Curated selection / Shoply
        </p>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <ProductGrid products={visibleProducts} />
      )}

    </div>
  </div>
);

 
}

export default Products;

