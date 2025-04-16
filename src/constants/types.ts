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
  type: string;
  price: number;
  status: string;
  date: string;
  description: number;
};
