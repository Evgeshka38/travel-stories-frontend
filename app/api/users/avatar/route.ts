import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/app/api/_utils/proxyToBackend';

export async function PATCH(request: NextRequest) {
  return proxyToBackend({ request, path: '/users/avatar' });
}
