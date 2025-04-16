"use client";

import Heading from "@/modules/shared/Heading";
import cn from "@/utils/cn";
import ProfileIcon from "public/icons/user.svg";

const ProfilePage = () => {
  return (
    <div className={cn("w-full", "grid grid-cols-24 gap-5")}>
      <div className="col-span-16 px-8 pt-6 pb-8">
        <Heading title="Profile & Billing" Icon={ProfileIcon} />
      </div>

      <div className="col-span-8">{/* <LteSidebar /> */}</div>
    </div>
  );
};

export default ProfilePage;
