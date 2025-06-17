export type RecentActivity = {
  name: string;
  purchase: string;
  date: string;
};

export type IspRecent = {
  plan: string;
  location: string;
  remain_time: string;
  quantity: number;
  status: "Active" | "Non active" | "Expiring soon";
  date: string;
  auto_renew: boolean;
};

export type LteRecent = {
  country: string;
  city: string;
  status: "Active" | "Non active" | "Expiring soon";
  date: string;
};

export type Billing = {
  readable_id: string | null;
  user_id: string;
  id: string;
  type: string;
  product_id: number | null;
  plan_id: number | null;
  location_id: number | null;
  price: number;
  final_price: number;
  provider: string;
  quantity: number;
  coupon_id: number | string;
  status: string;
  status_reason: string | null;
  created_at: string;
  updated_at: string;
};
