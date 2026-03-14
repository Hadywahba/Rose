import { NextResponse, type NextRequest } from 'next/server';

type RouteProps = {
  params: { categoryId: string };
};

export async function GET(request: NextRequest, { params }: RouteProps) {
  const { categoryId } = params;

  // Guard-class
  if (!categoryId) {
    throw new Error('Category id is required');
  }

  const resp = await fetch(`${process.env.API_URL}/categories/${categoryId}`, {
    cache: 'no-store',
  });

  const payload = await resp.json();

  return NextResponse.json(payload);
}
