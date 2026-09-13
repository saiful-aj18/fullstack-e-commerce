import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";

function Terms() {
  return (
    <>
      <PageHeader
        title="Terms & Conditions"
        description="Please read these terms before using our services."
      />

      <Container className="py-12">
        <article className="mx-auto max-w-4xl rounded-2xl border bg-white p-6 shadow-sm sm:p-10">
          <div className="prose max-w-none">
            <h2 className="text-xl font-bold">
              1. Acceptance of Terms
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              By accessing and using this website, you agree
              to comply with these terms and conditions.
            </p>

            <h2 className="mt-10 text-xl font-bold">
              2. User Accounts
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Users are responsible for maintaining the
              confidentiality of their account information.
            </p>

            <h2 className="mt-10 text-xl font-bold">
              3. Products and Pricing
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Product information, availability and pricing may
              change without prior notice.
            </p>

            <h2 className="mt-10 text-xl font-bold">
              4. Orders
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Orders are subject to availability and confirmation
              by the store.
            </p>
          </div>
        </article>
      </Container>
    </>
  );
}

export default Terms;