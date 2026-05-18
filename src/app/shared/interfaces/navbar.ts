export interface Language {
  arabicName: string;
  englishName: string;
  flag: string;
}
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
export interface Notification {
  id: number;
  image: string;
  text: string;
  date: Date;
  imageType: 'icon' | 'avatar';
  username?: string;
}
