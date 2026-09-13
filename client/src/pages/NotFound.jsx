import { Link } from "react-router-dom";
import Container from "../components/common/Container";

function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="text-7xl font-extrabold text-indigo-600">
            404
          </p>

          <h1 className="mt-6 text-3xl font-bold">
            Page Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            The page you're looking for doesn't exist.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Back to Home
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default NotFound;