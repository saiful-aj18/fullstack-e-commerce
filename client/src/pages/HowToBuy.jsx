import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";

const steps = [
  ["01", "Choose a product", "Browse the collection and open anything that catches your eye."],
  ["02", "Add to cart", "Select your quantity and add the product to your shopping bag."],
  ["03", "Review your cart", "Check your selected products, quantities and prices before checkout."],
  ["04", "Checkout", "Continue through checkout and complete your order."],
];

function HowToBuy() {
  return (
    <>
      <PageHeader title="How to buy." description="A simple four-step path from discovery to checkout." eyebrow="SHOPLY / GUIDE" />
      <Container className="py-8 sm:py-12">
        <div className="grid gap-4 md:grid-cols-2">
          {steps.map(([number, title, description]) => (
            <article key={number} className="group rounded-[2rem] bg-white p-6 sm:p-8">
              <div className="flex items-start justify-between">
                <span className="text-5xl font-black tracking-[-0.06em] text-black/10">{number}</span>
                <span className="rounded-full bg-[#e8edef] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em]">Step</span>
              </div>
              <h2 className="mt-10 text-2xl font-black tracking-tight">{title}</h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-black/45">{description}</p>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}

export default HowToBuy;
