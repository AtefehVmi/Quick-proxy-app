import Navbar from "@/modules/Dashboard/Navbar/Navbar";
import Sidebar from "@/modules/Dashboard/Sidebar/Sidebar";

const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex w-full h-screen text-black">
      <Sidebar className="hidden md:block" />

      <div className="grow flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 px-8 pt-6 pb-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
