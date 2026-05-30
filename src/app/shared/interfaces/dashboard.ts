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
export type ChartLegend = Pick<BestSellerProduct, 'englishName' | 'arabicName'>;
// export type ChartLegend = Omit<
//   BestSellerProduct,
//   | 'id'
//   | 'imageUrl'
//   | 'price'
//   | 'ordersNumber'
//   | 'numberInStock'
//   | 'amount'
//   | 'addedDate'
// >;
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
// omit means to exclude certain properties from the type, in this case we are excluding all properties of BestSellerProduct except englishName and arabicName to create a new type called ChartLegend.
// pick means to create a new type by selecting specific properties from an existing type, in this case we are selecting only englishName and arabicName from BestSellerProduct to create a new type called ChartLegend.
