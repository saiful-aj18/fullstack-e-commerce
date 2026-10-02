import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Container from "../common/Container";
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
        setProducts(res.data.slice(0, 4));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getFeatured();
  }, []);

  return (
    <section className="px-3 pb-20 sm:px-5 sm:pb-28">
      <Container>

        <div className="mb-10 flex items-end justify-between">

          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-black/40">
              Curated for you
            </p>

            <h2 className="text-[clamp(38px,5vw,72px)] font-black uppercase leading-[0.9] tracking-[-0.06em]">
              Featured
              <br />
              pieces.
            </h2>
          </div>

          <Link
            to="/products"
            className="rounded-full bg-black px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition hover:scale-105"
          >
            Shop all →
          </Link>

        </div>

        {loading ? (
          <LoadingSkeleton count={4} />
        ) : (
          <ProductGrid products={products} />
        )}

      </Container>
    </section>
  );
}

export default FeaturedProducts;