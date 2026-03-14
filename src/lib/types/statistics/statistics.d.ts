import type { LucideIcon } from 'lucide-react';

export interface OverallStatistics {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
}

export interface StatConfig {
  icon: LucideIcon;
  labelKey: string;
  valueKey: keyof OverallStatistics;
  isRevenue?: boolean;
  lightBg: string;
  darkBg: string;
  lightIcon: string;
  darkIcon: string;
  lightValue: string;
  darkValue: string;
  hoverBg: string;
}

export interface StatisticsResponse {
  message: string;
  statistics: OverallStatistics;
}
