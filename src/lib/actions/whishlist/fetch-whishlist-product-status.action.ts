export async function fetchWishlistStatusAction() {
  const baseUrl =
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000';

  const resp = await fetch(`${baseUrl}/api/wishlist`, {
    cache: 'no-store',
  });

  const payload = await resp.json();
  return payload;
}
