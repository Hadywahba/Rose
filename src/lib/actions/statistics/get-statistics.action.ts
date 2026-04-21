// 'use server';

// import { JSON_HEADER } from '@/lib/constants/api.constant';
// import { getToken } from '@/lib/utility/manage-token';
// import type { StatisticsResponse } from '@/lib/types/statistics/statistics.d';

// export async function getOverallStatisticsAction(): Promise<
//   ApiResponse<StatisticsResponse>
// > {
//   const token = await getToken();

//   if (!token?.accessToken) {
//     return { message: 'Unauthorized' };
//   }

//   const response = await fetch(`${process.env.API_URL}/statistics/overall`, {
//     method: 'GET',
//     headers: {
//       ...JSON_HEADER,
//       Authorization: `Bearer ${token.accessToken}`,
//     },
//     next: { revalidate: 3600 }, // 1 hour server-side cache
//   });

//   const payload: ApiResponse<StatisticsResponse> = await response.json();
//   return payload;
// }
