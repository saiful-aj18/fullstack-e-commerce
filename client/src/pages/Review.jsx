import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";
import api from "../api/axios";

function Review() {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const productTitle = searchParams.get("title") || "";
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const submitReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Please write a comment before submitting.");
      return;
    }
    try {
      setSubmitting(true);
      await api.post("/review", { user: userId, productId, productTitle, rating, comment });
      alert("Review submitted successfully!");
      navigate("/orders");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Your review."
        description={productTitle ? `Share your experience with ${productTitle}.` : "Share your experience with this product."}
        eyebrow="SHOPLY / REVIEW"
      />
      <Container className="py-8 sm:py-12">
        <form onSubmit={submitReview} className="mx-auto max-w-2xl rounded-[2rem] bg-white p-6 sm:p-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/35">Product feedback</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">{productTitle || "Product review"}</h2>

          <div className="mt-8">
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">Rating</label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`rounded-2xl py-3 text-sm font-bold transition ${rating === value ? "bg-[#111313] text-white" : "bg-[#f0f3f4] text-black/50 hover:bg-[#e4e9ea]"}`}
                >
                  {value} ★
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">Comment</label>
            <textarea
              rows="6"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you think..."
              className="w-full resize-none rounded-2xl border border-black/10 bg-[#f4f6f6] px-4 py-4 text-sm outline-none focus:border-black/35"
            />
          </div>

          <button disabled={submitting} className="mt-6 w-full rounded-full bg-[#111313] py-4 text-sm font-bold text-white disabled:opacity-40">
            {submitting ? "Submitting..." : "Submit review"} <span className="ml-2">↗</span>
          </button>
        </form>
      </Container>
    </>
  );
}

export default Review;
