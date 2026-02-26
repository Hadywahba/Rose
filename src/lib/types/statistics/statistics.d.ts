export interface OverallStatistics {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
}

export interface StatisticsResponse {
  message: string;
  statistics: OverallStatistics;
}
