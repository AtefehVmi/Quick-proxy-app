import Sidebar from "@/modules/Dashboard/Sidebar/Sidebar";

const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex w-full h-screen text-black">
      <Sidebar className="hidden md:block" />

      <div className="grow flex flex-col min-h-screen">
        <main className="flex-1 p-5 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
