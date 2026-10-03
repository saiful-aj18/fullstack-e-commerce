
import axios from "axios";

// Product catalog comes from an external product API (FakeStoreAPI),
// NOT from our own backend — our backend only stores user/cart/wishlist data.
const externalApi = axios.create({
  baseURL: "https://fullstack-e-commerce-1-rue9.onrender.com/fake-store"
});

export default externalApi;