import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";

import api from "../api/axios";


// CHANGED: this page used to receive `order` as a prop, but it's
// routed directly ("/invoice/:orderId"), so nothing was ever passing
// that prop in. Now it reads the orderId from the URL and fetches the
// order itself from the NEW GET /order/single/:orderId route.
function Invoice(){

  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const getOrder = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/order/single/${orderId}`);

      setOrder(res.data.order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrder();
  }, [orderId]);


return(

<>

<PageHeader

title="Invoice"

description="Your order invoice."

/>


<Container className="py-12">


{loading && (
  <p className="text-slate-500">Loading invoice...</p>
)}

{!loading && !order && (
  <p className="text-slate-500">Order not found.</p>
)}


{order && (

<div className="rounded-xl border p-6">


<h2 className="mb-5 text-xl font-bold">

Invoice Details

</h2>


<p className="mb-5 text-sm text-slate-500">
  Order ID: {order._id}
</p>



{

// CHANGED: item.product?.title -> item.title, and now also
// shows price since the line item is a full product snapshot
order.products?.map(item=>(


<div

key={item._id}

className="flex justify-between border-b py-3"

>


<span>

{item.title}

</span>


<span>

Qty: {item.quantity} &times; ${item.price}

</span>


</div>


))

}



<div className="mt-5 flex items-center justify-between font-bold">

<span>Status: {order.status}</span>

<span>

Total:
${order.totalPrice}

</span>

</div>



</div>

)}


</Container>


</>


)

}


export default Invoice;
