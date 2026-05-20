import { Injectable } from '@angular/core';
import {
  BestSellerProduct,
  FilterOption,
  Order,
  RevenueData,
  StatisticsData,
  TopSeller,
} from '../interfaces/dashboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly statisticsData: StatisticsData[] = [
    {
      id: 1,
      englishTitle: 'Total earnings',
      arabicTitle: 'إجمالي الأرباح',
      value: 559251,
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
      value: 36894,
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
      value: 183352156,
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
      value: 165891,
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
  private readonly DateFilterOptions: FilterOption[] = [
    {
      englisthName: 'today',
      arabicName: 'اليوم',
    },
    {
      englisthName: 'yesterday',
      arabicName: 'أمس',
    },
    {
      englisthName: 'last 7 Days',
      arabicName: 'آخر 7 أيام',
    },
    {
      englisthName: 'last 30 Days',
      arabicName: 'آخر 30 يوم',
    },
    {
      englisthName: 'this month',
      arabicName: 'هذا الشهر',
    },
    {
      englisthName: 'last month',
      arabicName: 'الشهر الماضي',
    },
  ];
  private readonly ReportFilterOptions: FilterOption[] = [
    {
      englisthName: 'Download report',
      arabicName: 'تحميل التقرير',
    },
    {
      englisthName: 'Import report',
      arabicName: 'استيراد التقرير',
    },
    {
      englisthName: 'Export report',
      arabicName: 'تصدير التقرير',
    },
  ];
  private readonly bestSellerProducts: BestSellerProduct[] = [
    {
      id: 1,
      englishName: 'Branded T-Shirts',
      arabicName: 'تيشيرتات ماركة',
      imageUrl: 'images/product1.png',
      price: 29,
      ordersNumber: 62,
      numberInStock: 510,
      amount: 1798,
      addedDate: new Date('2021-04-24'),
    },
    {
      id: 2,
      englishName: 'Bentwood chair',
      arabicName: 'كرسي بينت وود',
      imageUrl: 'images/product2.png',
      price: 85.2,
      ordersNumber: 35,
      numberInStock: 0,
      amount: 2982,
      addedDate: new Date('2021-05-19'),
    },
    {
      id: 3,
      englishName: 'Borosil paper cup',
      arabicName: 'كوب بوروسيل',
      imageUrl: 'images/product3.png',
      price: 14,
      ordersNumber: 80,
      numberInStock: 749,
      amount: 1120,
      addedDate: new Date('2021-05-01'),
    },
    {
      id: 4,
      englishName: 'One seater sofa',
      arabicName: 'أريكة بمقعد واحد',
      imageUrl: 'images/product4.png',
      price: 127.5,
      ordersNumber: 56,
      numberInStock: 0,
      amount: 7140,
      addedDate: new Date('2021-02-11'),
    },
    {
      id: 5,
      englishName: 'Stillbird Helmet',
      arabicName: 'خوذة ستيلبيرد',
      imageUrl: 'images/product5.png',
      price: 54,
      ordersNumber: 74,
      numberInStock: 805,
      amount: 3996,
      addedDate: new Date('2021-01-17'),
    },
    {
      id: 6,
      englishName: 'Stillbird Helmet',
      arabicName: 'خوذة ستيلبيرد',
      imageUrl: 'images/product5.png',
      price: 54,
      ordersNumber: 74,
      numberInStock: 805,
      amount: 3996,
      addedDate: new Date('2021-01-17'),
    },
  ];
  private readonly topSellers: TopSeller[] = [
    {
      id: 1,
      englishName: 'iTest Factory',
      arabicName: 'مصنع iTest',
      imageUrl: 'images/product6.png',
      ownerName: 'oliver tyler',
      category: 'bags and wallets',
      stock: 8547,
      totalSales: 541200,
      percentageOfTotalSales: '32%',
    },
    {
      id: 2,
      englishName: 'digitech galaxy',
      arabicName: 'ديجيتك جالاكسي',
      imageUrl: 'images/product7.png',
      ownerName: 'john roberts',
      category: 'watches',
      stock: 895,
      totalSales: 75030,
      percentageOfTotalSales: '79%',
    },
    {
      id: 3,
      englishName: 'nesta technologies',
      arabicName: 'نستا تكنولوجيز',
      imageUrl: 'images/product8.png',
      ownerName: 'harley fuller',
      category: 'bike accessories',
      stock: 3470,
      totalSales: 45600,
      percentageOfTotalSales: '90%',
    },
    {
      id: 4,
      englishName: 'zoetic fashion',
      arabicName: 'زويتيك فاشن',
      imageUrl: 'images/product9.png',
      ownerName: 'james bowen',
      category: 'clothes',
      stock: 5488,
      totalSales: 29456,
      percentageOfTotalSales: '40%',
    },
    {
      id: 5,
      englishName: 'meta4Systems',
      arabicName: 'ميتا4سيستمز',
      imageUrl: 'images/product10.png',
      ownerName: 'zoe dennis',
      category: 'furniture',
      stock: 4100,
      totalSales: 11260,
      percentageOfTotalSales: '57%',
    },
  ];
  private readonly recentOrders: Order[] = [
    {
      orderId: '#VZ2112',
      customerName: 'alex smith',
      customerImg: 'images/avatar-1.jpg',
      productName: 'clothes',
      amount: 109,
      vendor: 'zoetic fashion',
      status: 'Paid',
      rating: 5,
      votes: 61,
    },
    {
      orderId: '#VZ2111',
      customerName: 'jansh brown',
      customerImg: 'images/avatar-2.jpg',
      productName: 'kitchen storage',
      amount: 149,
      vendor: 'micro design',
      status: 'Pending',
      rating: 4.5,
      votes: 61,
    },
    {
      orderId: '#VZ2109',
      customerName: 'ayaan bowen',
      customerImg: 'images/avatar-3.jpg',
      productName: 'bike accessories',
      amount: 215,
      vendor: 'nesta technologies',
      status: 'Paid',
      rating: 4.9,
      votes: 89,
    },
    {
      orderId: '#VZ2108',
      customerName: 'prezy mark',
      customerImg: 'images/avatar-4.jpg',
      productName: 'furniture',
      amount: 199,
      vendor: 'syntyce solutions',
      status: 'Unpaid',
      rating: 4.3,
      votes: 47,
    },
    {
      orderId: '#VZ2107',
      customerName: 'vihan hudda',
      customerImg: 'images/avatar-6.jpg',
      productName: 'bags and wallets',
      amount: 330,
      vendor: 'iTest Factory',
      status: 'Paid',
      rating: 4.7,
      votes: 161,
    },
  ];
  getStatisticsData(): StatisticsData[] {
    return this.statisticsData;
  }
  getRevenueData(): RevenueData[] {
    return this.RevenueData;
  }
  getDateFilterOptions(): FilterOption[] {
    return this.DateFilterOptions;
  }
  getReportFilterOptions(): FilterOption[] {
    return this.ReportFilterOptions;
  }
  getBestSellerProducts(): BestSellerProduct[] {
    return this.bestSellerProducts;
  }
  getTopSellers(): TopSeller[] {
    return this.topSellers;
  }
  getRecentOrders(): Order[] {
    return this.recentOrders;
  }
  constructor() {}
}
