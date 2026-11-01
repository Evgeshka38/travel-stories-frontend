import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

if (!backendUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

// Browser requests go through same-origin Next.js Route Handlers under /app/api.
// This keeps auth cookies on the frontend origin and makes them available
// to Server Components and proxy.ts.
export const nextApi = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Server-side requests can call the backend directly.
export const serverApi = axios.create({
  baseURL: `${backendUrl}/api`,
});
