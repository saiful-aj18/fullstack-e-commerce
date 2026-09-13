import Container from "./Container";

function PageHeader({ title, description }) {
  return (
    <section className="border-b bg-white">
      <Container className="py-12">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>

        {description && (
          <p className="mt-3 max-w-2xl text-slate-500">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}

export default PageHeader;