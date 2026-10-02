import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import ProductGrid from "../products/ProductGrid";
import LoadingSkeleton from "../common/LoadingSkeleton";

import externalApi from "../../api/externalProducts";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeatured = async () => {
      try {
        const res = await externalApi.get("/products?limit=4");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getFeatured();
  }, []);

  return (
    <section className="py-16">
      <Container>
        <div className="flex items-center justify-between">
          <SectionTitle
            title="Featured Products"
            description="Hand-picked products just for you."
          />

          <Link
            to="/products"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View all →
          </Link>
        </div>

        {loading ? <LoadingSkeleton count={4} /> : <ProductGrid products={products} />}
      </Container>
    </section>
  );
}

export default FeaturedProducts;