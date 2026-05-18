import { Injectable } from '@angular/core';
import { RevenueData, StatisticsData } from '../interfaces/dashboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly statisticsData: StatisticsData[] = [
    {
      id: 1,
      englishTitle: 'Total earnings',
      arabicTitle: 'إجمالي الأرباح',
      value: 2500,
      valueColor: 'rgb(10,179,156)',
      percentValue: '+12%',
      icon: 'ri-money-dollar-circle-line',
      iconColor: 'rgb(10,179,156)',
      iconBackgroundColor: '#daf4f0',
      linkTitleEnglish: 'View net earnings',
      linkTitleArabic: 'عرض الأرباح الصافية',
      linkUrl: '/earnings',
      iconColorDark: 'rgb(10,179,156)',
      iconBackgroundColorDark: 'rgba(10, 179, 156, 0.15)',
    },
    {
      id: 2,
      englishTitle: 'Orders',
      arabicTitle: 'إجمالي الطلبات',
      value: 11452343,
      valueColor: 'rgb(240,101,72)',
      percentValue: '-3.57%',
      icon: 'ri-shopping-bag-line',
      iconColor: 'rgb(41,156,219)',
      iconBackgroundColor: '#dff0fa',
      linkTitleEnglish: 'View all orders',
      linkTitleArabic: 'عرض جميع الطلبات',
      linkUrl: '/orders',
      iconColorDark: 'rgb(41,156,219)',
      iconBackgroundColorDark: 'rgba(41, 156, 219, 0.15)',
    },
    {
      id: 3,
      englishTitle: 'Customers',
      arabicTitle: 'إجمالي العملاء',
      value: 3543442,
      valueColor: 'rgb(10,179,156)',
      percentValue: '+28.08%',
      icon: 'ri-user-line',
      iconColor: 'rgb(247,184,75)',
      iconBackgroundColor: '#fef4e4',
      linkTitleEnglish: 'See details',
      linkTitleArabic: 'عرض التفاصيل',
      linkUrl: '/customers',
      iconColorDark: 'rgb(247,184,75)',
      iconBackgroundColorDark: 'rgba(247, 184, 75, 0.15)',
    },
    {
      id: 4,
      englishTitle: 'My Balance',
      arabicTitle: 'رصيدي',
      value: 144642,
      valueColor: '#878a99',
      percentValue: '+0.00%',
      icon: 'ri-wallet-line',
      iconColor: 'rgb(64,81,137)',
      iconBackgroundColor: '#e2e5ed',
      linkTitleEnglish: 'Withdraw money',
      linkTitleArabic: 'سحب الأموال',
      linkUrl: '/balance',
      iconColorDark: 'rgb(64,81,137)',
      iconBackgroundColorDark: 'rgba(64, 81, 137, 0.15)',
    },
  ];
  private readonly RevenueData: RevenueData[] = [
    {
      englishMonth: 'Jan',
      arabicMonth: 'يناير',
      value1: 34,
      value2: 89,
      value3: 80,
    },
    {
      englishMonth: 'Feb',
      arabicMonth: 'فبراير',
      value1: 65,
      value2: 99,
      value3: 12,
    },
    {
      englishMonth: 'Mar',
      arabicMonth: 'مارس',
      value1: 55,
      value2: 69,
      value3: 7,
    },
    {
      englishMonth: 'Apr',
      arabicMonth: 'أبريل',
      value1: 68,
      value2: 109,
      value3: 17,
    },
    {
      englishMonth: 'May',
      arabicMonth: 'مايو',
      value1: 49,
      value2: 78,
      value3: 21,
    },
    {
      englishMonth: 'Jun',
      arabicMonth: 'يونيو',
      value1: 61,
      value2: 84,
      value3: 11,
    },
    {
      englishMonth: 'Jul',
      arabicMonth: 'يوليو',
      value1: 42,
      value2: 51,
      value3: 5,
    },
    {
      englishMonth: 'Aug',
      arabicMonth: 'أغسطس',
      value1: 44,
      value2: 29,
      value3: 9,
    },
    {
      englishMonth: 'Sep',
      arabicMonth: 'سبتمبر',
      value1: 78,
      value2: 93,
      value3: 7,
    },
    {
      englishMonth: 'Oct',
      arabicMonth: 'أكتوبر',
      value1: 52,
      value2: 42,
      value3: 29,
    },
    {
      englishMonth: 'Nov',
      arabicMonth: 'نوفمبر',
      value1: 63,
      value2: 89,
      value3: 13,
    },
    {
      englishMonth: 'Dec',
      arabicMonth: 'ديسمبر',
      value1: 67,
      value2: 37,
      value3: 33,
    },
  ];
  getStatisticsData(): StatisticsData[] {
    return this.statisticsData;
  }
  getRevenueData(): RevenueData[] {
    return this.RevenueData;
  }
  constructor() {}
}
