
import axios from "axios";

// Product catalog comes from an external product API (FakeStoreAPI),
// NOT from our own backend — our backend only stores user/cart/wishlist data.
const externalApi = axios.create({
  baseURL: "http://localhost:5000/fake-store"
});

export default externalApi;