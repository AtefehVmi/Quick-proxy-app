import OnboardingDashboard from "@/modules/Dashboard/onborading/OnboardingDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fastproxy.gg | Onboarding Dashboard",
};

const OnboardingPage = () => {
  return <OnboardingDashboard />;
};
export default OnboardingPage;
