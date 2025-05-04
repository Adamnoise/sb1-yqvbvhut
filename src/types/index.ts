export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface MetricCard {
  label: string;
  value: string;
  change: number;
  prefix?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sales: number;
}

export interface ChartData {
  month: string;
  value: number;
  isHighlighted?: boolean;
}

export interface OverviewItem {
  id: string;
  label: string;
  value: number;
  color: string;
  icon: string;
}

export interface ActivityItem {
  id: string;
  user: User;
  action: string;
  timestamp: string;
  message?: string;
}