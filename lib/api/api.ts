import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

if (!backendUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

// Browser requests go through the Next.js same-origin rewrite (/api -> backend).
// This lets auth cookies belong to the frontend origin and makes them available
// to Server Components and proxy.ts.
export const nextApi = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Server-side requests can call the backend directly.
export const serverApi = axios.create({
  baseURL: `${backendUrl}/api`,
});
