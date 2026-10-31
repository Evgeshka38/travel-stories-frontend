import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  if (!API_URL) {
    return NextResponse.json(
      { message: 'API URL is not configured' },
      { status: 500 },
    );
  }

  const response = await fetch(`${API_URL}/api/categories`, {
    cache: 'no-store',
  });

  const data = await response.json().catch(() => null);

  return NextResponse.json(data, {
    status: response.status,
  });
}
