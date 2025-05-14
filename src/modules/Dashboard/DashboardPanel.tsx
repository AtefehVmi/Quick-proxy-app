"use client";

import { useEffect, useState } from "react";
import MainDashboard from "./MainDashboard";
import { supabase } from "@/services/supabaseClient";
import Loader from "@/components/Loader";
import OnboardingDashboard from "./onborading/OnboardingDashboard";
import { useRouter } from "next/navigation";

const DashboardPanel = () => {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.push("/login");
        return;
      }

      //   const hasOnboarded = user.user_metadata?.has_onboarded ?? false;
      //   setShowOnboarding(!hasOnboarded);
      setLoading(false);
    };

    checkOnboardingStatus();
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return <MainDashboard />;
};
export default DashboardPanel;
