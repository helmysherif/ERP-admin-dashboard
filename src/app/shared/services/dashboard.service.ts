import { Injectable } from '@angular/core';
import { StatisticsData } from '../interfaces/dashboard';

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
  getStatisticsData(): StatisticsData[] {
    return this.statisticsData;
  }
  constructor() {}
}
