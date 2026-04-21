export default async function catchError<T>(
  callback: () => Promise<ApiResponse<T>>,
): Promise<[SuccessResponse<T>, null] | [null, Error]> {
  try {
    const payload = await callback();

    if (payload.status === false) throw new Error(payload.message);

    return [payload, null];
  } catch (error) {
    return [null, error as Error];
  }
}
