import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/app/api/_utils/proxyToBackend';

export async function POST(request: NextRequest) {
  const path = '/auth/refresh';
  return proxyToBackend({ request, path });
}
