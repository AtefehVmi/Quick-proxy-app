"use client";

import ToggleSidebar from "@/components/Sidebar/ToggleSidebar";
import NavbarWrapper from "@/modules/Dashboard/Navbar/NavbarWrapper";
import ProtectedRoute from "@/components/ProtectedRoute"; // Adjust path as needed

const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ProtectedRoute>
      <div className="flex w-full h-screen text-black">
        <ToggleSidebar className="hidden md:block" />
        <div className="grow flex flex-col min-h-screen">
          <NavbarWrapper />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
