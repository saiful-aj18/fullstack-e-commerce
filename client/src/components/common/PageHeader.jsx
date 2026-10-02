import Container from "./Container";

function PageHeader({ title, description, eyebrow = "SHOPLY / COLLECTION" }) {
  return (
    <section className="px-4 pt-8 sm:px-6 lg:px-8">
      <Container>
        <div className="overflow-hidden rounded-[2rem] bg-[#111313] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#aebcc0]">
                {eyebrow}
              </p>
              <h1 className="text-4xl font-black tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                {title}
              </h1>
              {description && (
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                  {description}
                </p>
              )}
            </div>
            <div className="hidden h-20 w-20 shrink-0 rounded-full border border-white/15 md:flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-white/45">
              SCROLL
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PageHeader;
