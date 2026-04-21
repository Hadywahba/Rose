

export async function fetchProductsById(id: string) {
  const resp = await fetch(`${process.env.API_URL}/products/${id}`, {
    next: { tags: ['products'], revalidate: 60 * 10 }, // 10 minutes cache
  });
  const payload = await resp.json();
  return payload;
}
