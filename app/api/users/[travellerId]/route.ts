import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/app/api/_utils/proxyToBackend';

type Props = {
  params: Promise<{ travellerId: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  const { travellerId } = await params;

  return proxyToBackend({
    request,
    path: `/users/${travellerId}`,
  });
}
