import Navbar from "@/modules/Dashboard/Navbar/Navbar";
import Sidebar from "@/modules/Dashboard/Sidebar/Sidebar";
import SmallSidebar from "@/modules/Dashboard/Sidebar/SmallSidebar";

const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex w-full h-screen text-black">
      {/* <Sidebar className="hidden md:block" /> */}
      <SmallSidebar />

      <div className="grow flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
