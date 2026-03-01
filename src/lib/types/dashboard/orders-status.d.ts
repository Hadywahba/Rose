// statistics related types for dashboard
export interface StatisticsResponse {
    message: string;
    statistics: StatisticsData;
}

// error response structure 
export interface StatisticsErrorResponse {
    error: string;
}

// statistics data structure
export interface StatisticsData {
    overall: OverallStats;
    products: ProductsStats;
    orders: OrdersStats;
    categories: CategoryStats[];
}

// overall statistics
export interface OverallStats {
    totalProducts: number;
    totalOrders: number;
    totalCategories: number;
    totalRevenue: number;
}

// products statistics
export interface ProductsStats {
    productsByCategory: ProductCategoryGroup[];
    topSellingProducts: TopProduct[];
    lowStockProducts: LowStockProduct[];
}

// categories statistics
export interface ProductCategoryGroup {
    _id: string;
    count: number;
    category: string;
    products: CategoryProduct[];
}

// category product details
export interface CategoryProduct {
    title: string;
    price: number;
    imgCover: string;
    quantity: number;
    sold?: number;
}

// top selling products
export interface TopProduct {
    _id: string;
    title: string;
    imgCover: string;
    price: number;
    sold: number;
    id: string;
}

// low stock products
export interface LowStockProduct {
    _id: string;
    title: string;
    imgCover: string;
    price: number;
    quantity: number;
    id: string;
}

// orders statistics
export interface OrdersStats {
    ordersByStatus: OrdersByStatus[];
    dailyRevenue: DailyRevenue[];
    monthlyRevenue: MonthlyRevenue[];
}

// orders by status
export interface OrdersByStatus {
    _id: string | null;
    count: number;
}

// daily and monthly revenue
export interface DailyRevenue {
    _id: string;
    revenue: number;
    count: number;
}

// daily and monthly revenue
export interface MonthlyRevenue {
    _id: string;
    revenue: number;
    count: number;
}

// category statistics
export interface CategoryStats {
    _id: string;
    name: string;
    totalProducts: number;
    totalRevenue: number;
}

// statistics api response type
export type StatisticsAPIResponse = StatisticsResponse | StatisticsErrorResponse;
