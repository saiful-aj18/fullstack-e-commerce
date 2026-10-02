import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

import externalApi from "../../api/externalProducts";

function CategorySection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await externalApi.get("/products/categories");
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  return (
    <section className="bg-slate-50 py-16">
      <Container>
        <SectionTitle title="Shop by Category" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="rounded-2xl border bg-white p-6 text-center capitalize shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="font-bold text-slate-900">{cat}</h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CategorySection;