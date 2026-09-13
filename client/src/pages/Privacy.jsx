import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";

function Privacy() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        description="Learn how we handle and protect your information."
      />

      <Container className="py-12">
        <article className="mx-auto max-w-4xl rounded-2xl border bg-white p-6 shadow-sm sm:p-10">
          <h2 className="text-xl font-bold">
            Information We Collect
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            We may collect information such as your name,
            email address, phone number and address when you
            create and use an account.
          </p>

          <h2 className="mt-10 text-xl font-bold">
            How We Use Information
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Your information is used to provide account,
            shopping and customer support functionality.
          </p>

          <h2 className="mt-10 text-xl font-bold">
            Data Security
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            We take reasonable measures to protect user
            information from unauthorized access.
          </p>
        </article>
      </Container>
    </>
  );
}

export default Privacy;