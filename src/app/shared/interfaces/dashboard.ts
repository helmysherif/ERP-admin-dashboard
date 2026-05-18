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
