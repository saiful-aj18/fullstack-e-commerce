import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";

const steps = [
  {
    number: "01",
    title: "Choose a Product",
    description:
      "Browse the available products and open the product you want to purchase.",
  },
  {
    number: "02",
    title: "Add to Cart",
    description:
      "Select your desired quantity and add the product to your shopping cart.",
  },
  {
    number: "03",
    title: "Review Your Cart",
    description:
      "Open your cart and review the selected products, quantities and prices.",
  },
  {
    number: "04",
    title: "Checkout",
    description:
      "Continue to checkout and provide the required information to complete your order.",
  },
];

function HowToBuy() {
  return (
    <>
      <PageHeader
        title="How To Buy"
        description="Follow these simple steps to purchase a product."
      />

      <Container className="py-12">
        <div className="mx-auto max-w-4xl space-y-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex gap-5 rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-600">
                {step.number}
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {step.title}
                </h2>

                <p className="mt-2 leading-6 text-slate-500">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default HowToBuy;