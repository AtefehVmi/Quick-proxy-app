import ActivityControl from "@/modules/Products/Isp/ActivityControl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proxy | ISP (Recent Activity)",
};

const RecentActivity = () => {
  return <ActivityControl />;
};
export default RecentActivity;
