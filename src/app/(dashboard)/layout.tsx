import Navbar from "@/modules/Dashboard/Navbar/Navbar";
import ToggleSidebar from "@/components/Sidebar/ToggleSidebar";

const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex w-full h-screen text-black">
      <ToggleSidebar className="hidden md:block" />
      <div className="grow flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
