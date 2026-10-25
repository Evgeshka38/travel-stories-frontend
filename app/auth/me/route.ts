import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  try {
    const cookie = request.headers.get('cookie');

    const response = await fetch(`${API_URL}/api/users/me`, {
      headers: {
        cookie: cookie ?? '',
      },
      cache: 'no-store',
    });

    if (response.status === 401) {
      return NextResponse.json(
        {
          status: 200,
          data: null,
        },
        {
          status: 200,
        },
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      {
        status: 500,
        message: 'Failed to get current user',
      },
      {
        status: 500,
      },
    );
  }
}