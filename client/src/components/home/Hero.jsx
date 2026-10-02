import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import heroImage from "../../assets/hero.png";

function Hero() {
  const sectionRef = useRef(null);
  const metaRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const cursorRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);
  const sideLeftRef = useRef(null);
  const sideRightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleChars = titleRef.current?.querySelectorAll(".hero-char");

      // Initial states
      gsap.set(
        [
          metaRef.current,
          labelRef.current,
          buttonsRef.current,
          imageRef.current,
          sideLeftRef.current,
          sideRightRef.current,
        ],
        {
          opacity: 0,
        }
      );

      gsap.set(
        [
          labelRef.current,
          buttonsRef.current,
          sideLeftRef.current,
          sideRightRef.current,
        ],
        {
          y: 20,
        }
      );

      gsap.set(imageRef.current, {
        y: 50,
        scale: 0.92,
      });

      gsap.set(titleChars, {
        opacity: 0,
      });

      gsap.set(cursorRef.current, {
        opacity: 1,
      });

      // Main timeline
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Top meta
      tl.to(metaRef.current, {
        opacity: 1,
        duration: 0.6,
      });

      // Collection label
      tl.to(
        labelRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.3"
      );

      // Typewriter animation
      if (titleChars?.length) {
        tl.to(
          titleChars,
          {
            opacity: 1,
            duration: 0.045,
            stagger: 0.055,
            ease: "none",
          },
          "-=0.15"
        );
      }

      // Cursor blink after typing
      tl.to(
        cursorRef.current,
        {
          opacity: 0,
          duration: 0.35,
          repeat: 2,
          yoyo: true,
          ease: "power1.inOut",
        },
        "-=0.1"
      );

      // Buttons
      tl.to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
        },
        "-=0.1"
      );

      // Product image
      tl.to(
        imageRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // Side information
      tl.to(
        [sideLeftRef.current, sideRightRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
        },
        "-=0.5"
      );

      // Continuous image floating
      gsap.to(imageRef.current, {
        y: -8,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.2,
      });

      // Cursor blinking continuously
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.55,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
        delay: 1.5,
      });

      // Button hover animation
      const buttons = buttonsRef.current?.querySelectorAll("a");

      buttons?.forEach((button) => {
        const arrow = button.querySelector(".button-arrow");

        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });

          if (arrow) {
            gsap.to(arrow, {
              x: 3,
              duration: 0.25,
            });
          }
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });

          if (arrow) {
            gsap.to(arrow, {
              x: 0,
              duration: 0.25,
            });
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-3 pb-3 pt-3 sm:px-5"
    >
      <div className="mx-auto max-w-[1500px] overflow-hidden rounded-[30px] bg-[#d1d6d8]">
        <div className="relative min-h-[680px] overflow-hidden">

          {/* Top meta */}
          <div
            ref={metaRef}
            className="absolute left-5 right-5 top-5 z-10 flex items-center justify-between sm:left-8 sm:right-8"
          >
            <span className="rounded-full border border-black/10 bg-white/30 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em]">
              FW / 2026
            </span>

            <span className="hidden text-[9px] font-bold uppercase tracking-[0.2em] text-black/50 sm:block">
              Everyday essentials
            </span>
          </div>

          {/* Main title */}
          <div className="relative z-10 px-5 pt-32 text-center sm:px-8 sm:pt-36">

            {/* Collection label */}
            <p
              ref={labelRef}
              className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-black/50"
            >
              SHOPLY COLLECTION
            </p>

            {/* Animated heading */}
            <h1
              ref={titleRef}
              className="mx-auto max-w-[1050px] text-[clamp(48px,8vw,118px)] font-black uppercase leading-[0.82] tracking-[-0.075em]"
              aria-label="Everything You Need."
            >
              {/* First line */}
              <span className="block">
                {"Everything".split("").map((char, index) => (
                  <span
                    key={`everything-${index}`}
                    className="hero-char inline-block"
                  >
                    {char}
                  </span>
                ))}
              </span>

              {/* Second line */}
              <span className="block">
                {"You Need.".split("").map((char, index) => (
                  <span
                    key={`you-need-${index}`}
                    className="hero-char inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}

                {/* Typewriter cursor */}
                <span
                  ref={cursorRef}
                  className="ml-2 inline-block h-[0.72em] w-[5px] translate-y-[0.04em] bg-black align-baseline sm:w-[6px]"
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* Buttons */}
            <div
              ref={buttonsRef}
              className="mt-7 flex justify-center gap-2"
            >
              <Link
                to="/products"
                className="group flex items-center gap-2 rounded-full bg-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white"
              >
                Shop now
                <span className="button-arrow inline-block transition-transform">
                  →
                </span>
              </Link>

              <Link
                to="/wishlist"
                className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-black"
              >
                Favorites
                <span className="button-arrow inline-block transition-transform">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Product visual */}
          <div
            ref={imageRef}
            className="absolute bottom-0 left-1/2 h-[360px] w-[75%] -translate-x-1/2 sm:h-[430px] sm:w-[60%]"
          >
            <img
              src={heroImage}
              alt="Featured Shoply product"
              className="h-full w-full object-contain object-bottom drop-shadow-[0_35px_45px_rgba(0,0,0,0.18)] transition duration-700 hover:scale-105"
            />
          </div>

          {/* Left side text */}
          <div
            ref={sideLeftRef}
            className="absolute bottom-7 left-5 hidden max-w-[180px] sm:block"
          >
            <p className="text-[10px] leading-5 text-black/50">
              Curated pieces designed around everyday life.
              Simple, useful and made to stand out.
            </p>
          </div>

          {/* Right side text */}
          <div
            ref={sideRightRef}
            className="absolute bottom-7 right-5 hidden text-right sm:block"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Scroll to explore
            </p>

            <span className="inline-block text-lg animate-bounce">
              ↓
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;