function WishlistItem({
  image,
  title,
  price,
  productId, // CHANGED: was `_id` (wishlist items don't have an _id)
  removeWishlist
}) {


return (

<div className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">


<div className="relative flex h-56 items-center justify-center bg-slate-100">

<img
src={image}
alt={title}
className="h-full w-full object-contain p-6"
/>


<button

onClick={()=>removeWishlist(productId)}

className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow-sm"

>
♥
</button>


</div>



<div className="p-5">

<h3 className="font-semibold text-slate-900">

{title}

</h3>


<p className="mt-2 text-lg font-bold text-indigo-600">

${price}

</p>


{/* NOTE: "Add to Cart" is intentionally left unwired — moving a
    wishlist item into the cart is not part of today's topics
    (Wishlist Show/Remove only). Wire it up the same way as
    removeWishlist whenever that feature is taught. */}
<button

className="mt-4 w-full rounded-lg border border-indigo-600 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-600 hover:text-white"

>

Add to Cart

</button>


</div>


</div>

)

}


export default WishlistItem;
