import { Link } from "react-router-dom";
import Hero from "../components/home/Hero";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";

import heroImage from "../assets/hero.png";

function Home() {
  return (
    <div className="bg-[#dce2e4] text-[#0b0808]">

      <Hero />

      {/* Marquee */}
      <section className="overflow-hidden border-y border-black/10 bg-[#dce2e4] py-4">
    <div className="flex w-max animate-marquee whitespace-nowrap">
    {/* First text */}
    <div className="flex shrink-0 items-center">
      <span className="px-5 text-[11px] font-bold uppercase tracking-[0.25em] text-black/60">
        New Season
      </span>
      <span className="text-black/30">✳</span>

      <span className="px-5 text-[11px] font-bold uppercase tracking-[0.25em] text-black/60">
        Everyday Essentials
      </span>
      <span className="text-black/30">✳</span>

      <span className="px-5 text-[11px] font-bold uppercase tracking-[0.25em] text-black/60">
        Curated Products
      </span>
      <span className="text-black/30">✳</span>

      <span className="px-5 text-[11px] font-bold uppercase tracking-[0.25em] text-black/60">
        Shoply
      </span>
      <span className="text-black/30">✳</span>
    </div>

    {/* Duplicate for seamless loop */}
    <div className="flex shrink-0 items-center" aria-hidden="true">
      <span className="px-5 text-[11px] font-bold uppercase tracking-[0.25em] text-black/60">
        New Season
      </span>
      <span className="text-black/30">✳</span>

      <span className="px-5 text-[11px] font-bold uppercase tracking-[0.25em] text-black/60">
        Everyday Essentials
      </span>
      <span className="text-black/30">✳</span>

      <span className="px-5 text-[11px] font-bold uppercase tracking-[0.25em] text-black/60">
        Curated Products
      </span>
      <span className="text-black/30">✳</span>

      <span className="px-5 text-[11px] font-bold uppercase tracking-[0.25em] text-black/60">
        Shoply
      </span>
      <span className="text-black/30">✳</span>
      </div>
      </div>
      </section>

      <CategorySection />

      <FeaturedProducts />

      {/* Editorial banner */}
      <section className="px-3 pb-4 sm:px-5">
        <div className="mx-auto grid max-w-[1500px] overflow-hidden rounded-[30px] bg-[#0b0808] lg:grid-cols-2">

          <div className="flex min-h-[430px] flex-col justify-between p-7 text-white sm:p-10 lg:p-14">

            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                Shoply / 2026
              </span>

              <h2 className="mt-8 max-w-xl text-[clamp(48px,7vw,105px)] font-black leading-[0.85] tracking-[-0.07em]">
                FIND
                <br />
                YOUR
                <br />
                NEXT.
              </h2>
            </div>

            <Link
              to="/products"
              className="mt-10 flex w-fit items-center gap-4 rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black transition hover:scale-[1.03]"
            >
              Explore collection
              <span>↗</span>
            </Link>
          </div>

          <div className="relative min-h-[430px] overflow-hidden bg-[#9a928a]">
            <img
              src=
              {heroImage}
              alt="Shoply collection"
              className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-90 transition duration-700 hover:scale-105"
            />

            <div className="absolute bottom-6 right-6 rounded-full bg-white px-5 py-2 text-[10px] font-bold uppercase tracking-[0.15em]">
              01 / 04
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Home;