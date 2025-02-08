import axios from "axios";
const API_URL = "http://localhost:8080/api";
const FAKE_API_URL = "https://fakestoreapi.com";

export default async function getProducts() {
  const response = await axios.get(`${API_URL}/shoes`);
  return response.data;
}

export async function loginUser(email: string, password: string) {
  const response = await axios.post(`${API_URL}/user/login`, {
    email: email,
    password: password,
  });
  return response.data;
}

export async function registerUser(user: any) {
  const response = await axios.post(`${API_URL}/user/register`, {
    email: user.email,
    password: user.password,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    address: user.address,
  });
  return response.data;
}

export async function getUser(userId: string) {
  const response = await axios.get(`${API_URL}/user?id=${userId}`);
  return response.data;
}

export async function addPayment(pm: any) {
  const response = await axios.post(`${API_URL}/user/payment/new`, pm);
  return response.data;
}
