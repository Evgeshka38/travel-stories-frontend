import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/app/api/_utils/proxyToBackend';

export async function GET(request: NextRequest) {
  return proxyToBackend({ request, path: '/stories/saved' });
}
