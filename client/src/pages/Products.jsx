import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";
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
    <>
      <PageHeader
        title="All Products"
        description="Browse our full product catalog."
      />

      <Container className="py-12">
        <ProductFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
        />

        {loading ? <LoadingSkeleton /> : <ProductGrid products={visibleProducts} />}
      </Container>
    </>
  );
}

export default Products;