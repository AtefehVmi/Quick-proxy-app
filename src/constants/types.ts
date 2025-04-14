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
