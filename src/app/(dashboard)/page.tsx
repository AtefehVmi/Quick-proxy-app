import MainDashboard from "@/modules/Dashboard/MainDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proxy | Dashboard",
};

const Dashboard = () => {
  return <MainDashboard />;
};
export default Dashboard;
