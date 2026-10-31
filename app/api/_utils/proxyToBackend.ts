import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

type ProxyOptions = {
  request: NextRequest;
  path: string;
  method?: string;
};

export async function proxyToBackend({
  request,
  path,
  method = request.method,
}: ProxyOptions) {
  if (!BACKEND_URL) {
    return NextResponse.json(
      { message: 'NEXT_PUBLIC_API_URL is not configured' },
      { status: 500 },
    );
  }

  const url = `${BACKEND_URL}/api${path}${request.nextUrl.search}`;

  const headers = new Headers();

  const cookie = request.headers.get('cookie');
  if (cookie) {
    headers.set('cookie', cookie);
  }

  const contentType = request.headers.get('content-type');
  if (contentType) {
    headers.set('content-type', contentType);
  }

  const accept = request.headers.get('accept');
  if (accept) {
    headers.set('accept', accept);
  }

  let body: ArrayBuffer | undefined;

  if (method !== 'GET' && method !== 'HEAD') {
    body = await request.arrayBuffer();
  }

  const backendResponse = await fetch(url, {
    method,
    headers,
    body,
    cache: 'no-store',
  });

  const responseBody = await backendResponse.arrayBuffer();

  const response = new NextResponse(responseBody, {
    status: backendResponse.status,
  });

  const responseContentType = backendResponse.headers.get('content-type');
  if (responseContentType) {
    response.headers.set('content-type', responseContentType);
  }

  for (const cookieValue of backendResponse.headers.getSetCookie()) {
    response.headers.append('set-cookie', cookieValue);
  }

  return response;
}
