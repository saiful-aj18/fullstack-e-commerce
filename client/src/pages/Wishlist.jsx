import { useEffect, useState } from "react";
import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";
import WishlistItem from "../components/wishlist/WishlistItem";
import api from "../api/axios";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWishlist = async () => {
    try {
      setLoading(true);
      const res = await api.get("/wishlist");
      setWishlistItems(res.data.wishlist.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getWishlist();
  }, []);

  const removeWishlist = async (productId) => {
    try {
      await api.delete(`/wishlist/${productId}`);
      getWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  const clearWishlist = async () => {
    try {
      await api.delete("/wishlist");
      setWishlistItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader
        title="Saved for later."
        description="A personal collection of products you don't want to lose."
        eyebrow="SHOPLY / SAVED"
      />

      <Container className="py-8 sm:py-12">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/35">
              Your selection
            </p>
            <p className="mt-2 text-sm text-black/50">
              {wishlistItems.length} {wishlistItems.length === 1 ? "product" : "products"} saved
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <button
              onClick={clearWishlist}
              className="w-fit rounded-full border border-black/10 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition hover:bg-[#111313] hover:text-white"
            >
              Clear all
            </button>
          )}
        </div>

        {loading ? (
          <div className="rounded-[2rem] bg-white p-10 text-center text-sm text-black/45">
            Loading wishlist...
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="rounded-[2rem] bg-[#111313] px-6 py-20 text-center text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              Saved collection
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">Nothing saved yet.</h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/45">
              Tap the heart on a product whenever you find something worth keeping.
            </p>
          </div>
        ) : (
          <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems.map((item) => (
              <WishlistItem
                key={item.productId}
                {...item}
                removeWishlist={removeWishlist}
              />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}

export default Wishlist;
