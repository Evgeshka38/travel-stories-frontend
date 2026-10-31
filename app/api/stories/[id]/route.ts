import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/app/api/_utils/proxyToBackend';

type Props = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, { params }: Props) {
  const { id } = await params;

  return proxyToBackend({
    request,
    path: `/stories/${id}`,
  });
}
