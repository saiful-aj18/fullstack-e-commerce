import { Link } from "react-router-dom";
import Container from "../components/common/Container";

function NotFound() {
  return (
    <section className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Container>
        <div className="flex min-h-[65vh] items-center justify-center rounded-[2rem] bg-[#111313] px-6 py-20 text-center text-white">
          <div>
            <p className="text-8xl font-black tracking-[-0.08em] text-white/10 sm:text-[11rem]">404</p>
            <h1 className="-mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">Lost in the collection.</h1>
            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/45">
              The page you're looking for doesn't exist or has moved somewhere else.
            </p>
            <Link to="/" className="mt-8 inline-block rounded-full bg-white px-7 py-3 text-sm font-bold text-[#111313]">
              Back to home ↗
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default NotFound;
