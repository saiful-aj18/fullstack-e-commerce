import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";

const sections = [
  ["1. Acceptance of Terms", "By accessing and using this website, you agree to comply with these terms and conditions."],
  ["2. User Accounts", "Users are responsible for maintaining the confidentiality of their account information."],
  ["3. Products and Pricing", "Product information, availability and pricing may change without prior notice."],
  ["4. Orders", "Orders are subject to availability and confirmation by the store."],
];

function Terms() {
  return (
    <>
      <PageHeader title="Terms & conditions." description="The terms that apply when using Shoply." eyebrow="SHOPLY / LEGAL" />
      <Container className="py-8 sm:py-12">
        <article className="mx-auto max-w-4xl rounded-[2rem] bg-white p-7 sm:p-10">
          {sections.map(([title, text], index) => (
            <section key={title} className={index ? "mt-10 border-t border-black/10 pt-10" : ""}>
              <h2 className="text-xl font-black tracking-tight">{title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-black/50">{text}</p>
            </section>
          ))}
        </article>
      </Container>
    </>
  );
}

export default Terms;
