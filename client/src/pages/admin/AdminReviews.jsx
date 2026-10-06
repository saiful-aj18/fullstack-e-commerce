import { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchReviews = async () => {
      try {
        const res = await api.get(
          "/admin/reviews"
        );

        if (!cancelled) {
          setReviews(res.data?.reviews || []);
          setError("");
        }
      } catch (err) {
        console.error(
          "Failed to load reviews:",
          err
        );

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Failed to load reviews."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchReviews();

    return () => {
      cancelled = true;
    };
  }, []);

  const deleteReview = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/admin/reviews/${id}`
      );

      setReviews((prev) =>
        prev.filter(
          (review) => review._id !== id
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to delete review."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white" />

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            Loading reviews...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
          Sales / Reviews
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-[-0.06em]">
          Reviews.
        </h1>

        <p className="mt-2 text-sm text-white/35">
          Manage customer feedback and product reviews.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {reviews.length === 0 && !error ? (
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-12 text-center">
          <p className="text-sm text-white/30">
            No reviews found.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="flex flex-col justify-between gap-5 sm:flex-row">
                <div>
                  <p className="text-sm font-bold">
                    {review.user?.name ||
                      "Anonymous"}
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    {review.user?.email ||
                      "No email"}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-black">
                    {"★".repeat(
                      Math.min(
                        5,
                        Number(
                          review.rating || 0
                        )
                      )
                    )}
                  </span>

                  <button
                    onClick={() =>
                      deleteReview(
                        review._id
                      )
                    }
                    className="rounded-full border border-red-500/20 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-red-400 transition hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {review.productTitle && (
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/25">
                  Product:{" "}
                  {review.productTitle}
                </p>
              )}

              <p className="mt-4 text-sm leading-7 text-white/50">
                {review.comment ||
                  review.text ||
                  "No review content."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminReviews;