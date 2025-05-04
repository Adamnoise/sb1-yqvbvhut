import { MetricCard, User, Product, ChartData, OverviewItem, ActivityItem } from '../types';
import { CircleIcon, Package2Icon, Users2Icon, CreditCardIcon } from 'lucide-react';

export const metricCards: MetricCard[] = [
  {
    label: 'Customers',
    value: '1,293',
    change: 12.5,
  },
  {
    label: 'Balance',
    value: '256k',
    change: 8.2,
    prefix: '$',
  },
];

export const users: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '4',
    name: 'Olivia Rodriguez',
    email: 'olivia@example.com',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '5',
    name: 'Daniel Martinez',
    email: 'daniel@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

export const revenueData: ChartData[] = [
  { month: 'Jan', value: 7.2 },
  { month: 'Feb', value: 5.8 },
  { month: 'Mar', value: 9.8, isHighlighted: true },
  { month: 'Apr', value: 6.5 },
  { month: 'May', value: 8.4 },
  { month: 'Jun', value: 7.3 },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Smart Watch',
    description: 'Premium Series 5',
    price: 299.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=100',
    sales: 125,
  },
  {
    id: '2',
    name: 'Headphones',
    description: 'Noise cancelling',
    price: 149.99,
    image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=100',
    sales: 98,
  },
  {
    id: '3',
    name: 'Smartphone',
    description: 'Latest model 12 Pro',
    price: 899.99,
    image: 'https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&cs=tinysrgb&w=100',
    sales: 87,
  },
  {
    id: '4',
    name: 'Wireless Speaker',
    description: 'Portable Bluetooth',
    price: 79.99,
    image: 'https://images.pexels.com/photos/8993561/pexels-photo-8993561.jpeg?auto=compress&cs=tinysrgb&w=100',
    sales: 65,
  },
];

export const overviewItems: OverviewItem[] = [
  {
    id: '1',
    label: 'New Sessions',
    value: 24,
    color: 'bg-purple-200 text-purple-700',
    icon: 'CircleIcon',
  },
  {
    id: '2',
    label: 'Total Users',
    value: 48,
    color: 'bg-amber-200 text-amber-700',
    icon: 'Users2Icon',
  },
  {
    id: '3',
    label: 'Bounce Rate',
    value: 65,
    color: 'bg-emerald-200 text-emerald-700',
    icon: 'CreditCardIcon',
  },
  {
    id: '4',
    label: 'Visit Duration',
    value: 92,
    color: 'bg-blue-200 text-blue-700',
    icon: 'Package2Icon',
  },
];

export const activityItems: ActivityItem[] = [
  {
    id: '1',
    user: users[0],
    action: 'New order placed',
    timestamp: '2h ago',
    message: 'I need a refund for my order #12345, product was damaged.',
  },
  {
    id: '2',
    user: users[1],
    action: 'Subscription upgraded',
    timestamp: '6h ago',
    message: 'Thanks for the quick resolution to my ticket last week!',
  },
  {
    id: '3',
    user: users[2],
    action: 'New comment',
    timestamp: '1d ago',
    message: 'When will you restock the Limited Edition items?',
  },
];