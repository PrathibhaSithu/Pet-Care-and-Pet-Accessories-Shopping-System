import axios from "axios";

const orderApi = axios.create({
	baseURL: "http://localhost:4000/api/deliver-orders",
});

export default orderApi;