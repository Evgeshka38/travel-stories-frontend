import axios from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const nextApi = axios.create({
  baseURL,
  withCredentials: true,
});

export const serverApi = axios.create({
  baseURL,
});