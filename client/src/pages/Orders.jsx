import {useEffect,useState} from "react";
import { Link } from "react-router-dom";

import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";

import api from "../api/axios";


function Orders(){


const [orders,setOrders]=useState([]);
const [loading,setLoading]=useState(true);

const userId=localStorage.getItem("userId");



// FIXED: backend now returns { success, orders } instead of a bare
// array, so we read res.data.orders (see routes/orderRoutes.js).
const getOrders=async()=>{

try{

setLoading(true);

const res=await api.get(`/order/${userId}`);

setOrders(res.data.orders);


}catch(error){

console.log(error);

}finally{

setLoading(false);

}

};



useEffect(()=>{

getOrders();

},[]);



return(

<>

<PageHeader

title="My Orders"

description="Check your previous orders."

/>



<Container className="py-12">


{loading && (
  <p className="text-slate-500">Loading orders...</p>
)}

{!loading && orders.length === 0 && (
  <p className="text-slate-500">You have no orders yet.</p>
)}


<div className="space-y-5">


{

orders.map(order=>(


<div

key={order._id}

className="rounded-xl border p-5"

>


<div className="flex flex-wrap items-center justify-between gap-3">

<h3 className="font-bold">

Order ID:
{order._id}

</h3>


{/* NEW — link to the Invoice page for this order */}
<Link

to={`/invoice/${order._id}`}

className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"

>

View Invoice

</Link>


</div>



<p>

Total:
${order.totalPrice}

</p>


<p>

Status:
{order.status}

</p>



<div className="mt-3 space-y-2">


{
// CHANGED: item.product?.title -> item.title
// (products are now embedded snapshots, not populated refs)
order.products?.map(item=>(

<div

key={item._id}

className="flex items-center justify-between border-t pt-2 text-sm"

>

<span>

{item.title}
{" "}x {item.quantity}

</span>


{/* NEW — link to the "Create Review" page for this product */}
<Link

to={`/review/${item.productId}?title=${encodeURIComponent(item.title)}`}

className="font-semibold text-indigo-600 hover:text-indigo-700"

>

Write Review

</Link>


</div>

))
}


</div>


</div>


))

}


</div>


</Container>


</>


)

}


export default Orders;
