import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import externalApi from "../../api/externalProducts";

function CategorySection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await externalApi.get(
          "/products/categories"
        );

        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  return (
    <section className="px-3 py-16 sm:px-5 sm:py-24">
      <div className="mx-auto max-w-[1500px]">

        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-black/40">
              Explore
            </p>

            <h2 className="text-[clamp(38px,5vw,72px)] font-black uppercase leading-[0.9] tracking-[-0.06em]">
              Shop by
              <br />
              category.
            </h2>
          </div>

          <Link
            to="/products"
            className="hidden rounded-full border border-black/10 bg-white/40 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition hover:bg-black hover:text-white sm:block"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className="group relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-[24px] bg-[#c7d0d3] p-6 transition duration-500 hover:bg-black hover:text-white"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
                0{index + 1}
              </span>

              <div>
                <h3 className="text-2xl font-black capitalize tracking-[-0.04em]">
                  {category}
                </h3>

                <span className="mt-3 inline-block text-xl transition-transform duration-300 group-hover:translate-x-2">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CategorySection;