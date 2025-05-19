"use client";

import MainDashboard from "./MainDashboard";

const DashboardPanel = () => {
  // const [loading, setLoading] = useState(true);
  // const router = useRouter();

  // useEffect(() => {
  //   const checkOnboardingStatus = async () => {
  //     const {
  //       data: { user },
  //       error,
  //     } = await supabase.auth.getUser();

  //     if (error || !user) {
  //       router.push("/sign-in");
  //       return;
  //     }
  //   };

  //   checkOnboardingStatus();
  // }, [supabase, router]);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       Loading...
  //     </div>
  //   );
  // }

  return <MainDashboard />;
};
export default DashboardPanel;
