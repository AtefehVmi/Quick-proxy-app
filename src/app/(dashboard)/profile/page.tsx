import BillingTable from "@/modules/Profile/BillingTable";
import ProfileSide from "@/modules/Profile/ProfileSide";
import Heading from "@/modules/shared/Heading";
import cn from "@/utils/cn";
import { Metadata } from "next";
import ProfileIcon from "public/icons/user.svg";

export const metadata: Metadata = {
  title: "Proxy | Profile & Billing",
};

const ProfilePage = () => {
  return (
    <div className={cn("w-full", "grid grid-cols-1 xl:grid-cols-24 gap-5")}>
      <div className="xl:col-span-16 px-8 pt-6 pb-8">
        <Heading title="Profile & Billing" Icon={ProfileIcon} />
        <BillingTable
          tableHeight="max-h-[500px] min-h-[500px] h-full"
          filters={true}
          size="10"
          className="mt-6"
        />
      </div>

      <div className="xl:col-span-8 h-full">
        <ProfileSide />
      </div>
    </div>
  );
};

export default ProfilePage;
