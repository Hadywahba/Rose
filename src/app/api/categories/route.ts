import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Convert all incoming search params to object
  const params = Object.fromEntries(searchParams.entries());

  const resp = await fetch(
    `${process.env.API_URL}/categories?${new URLSearchParams(params)}`,
    {
      next: { tags: ['categories'] },
      cache: 'no-store',
    },
  );

  const payload = await resp.json();

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  return Response.json(payload);
}
