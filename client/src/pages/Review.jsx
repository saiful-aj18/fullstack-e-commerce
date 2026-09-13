// NEW FILE — this page was an empty placeholder before.
// Route: /review/:productId?title=<product title>
// Reached from the "Write Review" link on the Orders page.

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

  // Create Review
  const submitReview = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Please write a comment before submitting.");
      return;
    }

    try {
      setSubmitting(true);

      await api.post("/review", {
        user: userId,
        productId,
        productTitle,
        rating,
        comment
      });

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
        title="Write a Review"
        description={
          productTitle
            ? `Share your feedback on ${productTitle}.`
            : "Share your feedback on this product."
        }
      />

      <Container className="py-12">
        <form
          onSubmit={submitReview}
          className="mx-auto max-w-xl space-y-5 rounded-2xl border bg-white p-6 shadow-sm"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Rating
            </label>

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value} Star{value > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Comment
            </label>

            <textarea
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you think about this product..."
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </Container>
    </>
  );
}

export default Review;
