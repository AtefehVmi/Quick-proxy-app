import MainDashboard from "@/modules/Dashboard/MainDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fastproxy.gg | Dashboard",
};

const Dashboard = () => {
  return <MainDashboard />;
};
export default Dashboard;
