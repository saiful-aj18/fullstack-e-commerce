import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.png";
//import Container from "../common/Container";

function Hero() {
  return (
    <section className="px-3 pb-3 pt-3 sm:px-5">
      <div className="mx-auto max-w-[1500px] overflow-hidden rounded-[30px] bg-[#d1d6d8]">

        <div className="relative min-h-[680px] overflow-hidden">

          {/* Top meta */}
          <div className="absolute left-5 right-5 top-5 z-10 flex items-center justify-between sm:left-8 sm:right-8">
            <span className="rounded-full border border-black/10 bg-white/30 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em]">
              FW / 2026
            </span>

            <span className="hidden text-[9px] font-bold uppercase tracking-[0.2em] text-black/50 sm:block">
              Everyday essentials
            </span>
          </div>

          {/* Main title */}
          <div className="relative z-10 px-5 pt-32 text-center sm:px-8 sm:pt-36">

            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-black/50">
              SHOPLY COLLECTION
            </p>

            <h1 className="mx-auto max-w-[1050px] text-[clamp(48px,8vw,118px)] font-black uppercase leading-[0.82] tracking-[-0.075em]">
              Everything
              <br />
              You Need.
            </h1>

            <div className="mt-7 flex justify-center gap-2">
              <Link
                to="/products"
                className="rounded-full bg-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition hover:scale-105"
              >
                Shop now
              </Link>

              <Link
                to="/wishlist"
                className="rounded-full bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-black transition hover:scale-105"
              >
                Favorites
              </Link>
            </div>
          </div>

          {/* Product visual */}
         <div className="absolute bottom-0 left-1/2 h-[360px] w-[75%] -translate-x-1/2 sm:h-[430px] sm:w-[60%]">
         <img
          src={heroImage}
           alt="Featured Shoply product"
            className="h-full w-full object-contain object-bottom drop-shadow-[0_35px_45px_rgba(0,0,0,0.18)] transition duration-700 hover:scale-105"
            />
         </div>

          {/* Side text */}
          <div className="absolute bottom-7 left-5 hidden max-w-[180px] sm:block">
            <p className="text-[10px] leading-5 text-black/50">
              Curated pieces designed around everyday life.
              Simple, useful and made to stand out.
            </p>
          </div>

          <div className="absolute bottom-7 right-5 hidden text-right sm:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Scroll to explore
            </p>
            <span className="text-lg">↓</span>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;