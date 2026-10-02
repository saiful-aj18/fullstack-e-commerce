import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";

const sections = [
  ["Information We Collect", "We may collect information such as your name, email address, phone number and address when you create and use an account."],
  ["How We Use Information", "Your information is used to provide account, shopping and customer support functionality."],
  ["Data Security", "We take reasonable measures to protect user information from unauthorized access."],
];

function Privacy() {
  return (
    <>
      <PageHeader title="Privacy policy." description="How Shoply handles and protects your information." eyebrow="SHOPLY / LEGAL" />
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

export default Privacy;
