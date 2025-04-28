import Navbar from "@/modules/Dashboard/Navbar/Navbar";
import ToggleSidebar from "@/components/Sidebar/ToggleSidebar";
import NavbarWrapper from "@/modules/Dashboard/Navbar/NavbarWrapper";

const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex w-full h-screen text-black">
      <ToggleSidebar className="hidden md:block" />
      <div className="grow flex flex-col min-h-screen">
        <NavbarWrapper />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
