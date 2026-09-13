import { useEffect, useState } from "react";

import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";
import WishlistItem from "../components/wishlist/WishlistItem";

import api from "../api/axios";


function Wishlist() {

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);


  // Load Wishlist
  // FIXED: was calling GET /wishlist/${userId} (route doesn't exist —
  // backend reads the user from the JWT token). Correct call is
  // GET /wishlist (protected route, token attached by api/axios.js).
  const getWishlist = async () => {

    try {
      setLoading(true);

      const res = await api.get("/wishlist");

      setWishlistItems(res.data.wishlist.products);

    } catch(error){

      console.log(error);

    } finally {
      setLoading(false);
    }

  };


  useEffect(()=>{

    getWishlist();

  },[]);



  // Remove Wishlist
  // FIXED: was calling DELETE /wishlist/${item._id} — wishlist items
  // don't have an _id (schema uses { _id: false }). Backend route is
  // DELETE /wishlist/:productId, so we remove by productId instead.
  const removeWishlist = async(productId)=>{

    try{

      await api.delete(`/wishlist/${productId}`);

      getWishlist();

    }catch(error){

      console.log(error);

    }

  };


  // Clear Wishlist
  // FIXED: previously this button only did setWishlistItems([]) locally,
  // so the items came right back after a refresh. Now it calls the
  // new DELETE /wishlist route (clearWishlist) so it actually persists.
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
        title="My Wishlist"
        description="Products you have saved for later."
      />


      <Container className="py-12">

        <div className="mb-8 flex items-center justify-between">

          <p className="text-sm text-slate-500">
            {wishlistItems.length} products saved
          </p>


          {wishlistItems.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-sm font-semibold text-red-500 hover:text-red-600"
            >
              Clear Wishlist
            </button>
          )}


        </div>


        {loading && (
          <p className="text-slate-500">Loading wishlist...</p>
        )}

        {!loading && wishlistItems.length === 0 && (
          <p className="text-slate-500">Your wishlist is empty.</p>
        )}


        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {
            wishlistItems.map(item=>(

              <WishlistItem

                key={item.productId}

                {...item}

                removeWishlist={removeWishlist}

              />

            ))
          }


        </div>


      </Container>

    </>
  );
}

export default Wishlist;
