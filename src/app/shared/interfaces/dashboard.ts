export interface StatisticsData {
  id: number;
  englishTitle: string;
  arabicTitle: string;
  value: number;
  valueColor: string;
  percentValue: string;
  icon: string;
  iconColor: string;
  iconColorDark: string;
  iconBackgroundColor: string;
  iconBackgroundColorDark: string;
  linkTitleArabic: string;
  linkTitleEnglish: string;
  linkUrl: string;
}
export interface RevenueData {
  englishMonth: string;
  arabicMonth: string;
  value1: number;
  value2: number;
  value3: number;
}
export interface ChartLegend {
  englishName: string;
  arabicName: string;
}
export interface FilterOption {
  englisthName: string;
  arabicName: string;
}
export interface BestSellerProduct {
  id: number;
  englishName: string;
  arabicName: string;
  imageUrl: string;
  price: number;
  ordersNumber: number;
  numberInStock: number;
  amount: number;
  addedDate: Date;
}
export interface TopSeller {
  id: number;
  englishName: string;
  arabicName: string;
  imageUrl: string;
  category: string;
  stock: number;
  totalSales: number;
  percentageOfTotalSales: string;
  ownerName: string;
}
export interface DunatChartData {
  englishName: string;
  arabicName: string;
  value: number;
  color: string;
}
export interface Order {
  orderId: string;
  customerName: string;
  customerImg: string;
  productName: string;
  amount: number;
  vendor: string;
  status: 'Paid' | 'Pending' | 'Unpaid';
  rating: number;
  votes: number;
}
