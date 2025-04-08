"use client";

import { usePathname } from "next/navigation";
import cn from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import Logo from "public/logo-small.png";
import UserImage from "public/images/user.png";
import DashboardIcon from "public/icons/dashboard.svg";
import ProductIcon from "public/icons/product.svg";
import SettingIcon from "public/icons/setting.svg";
import UserIcon from "public/icons/user-small.svg";
import BellIcon from "public/icons/bell-small.svg";
import QuestionMarkImage from "public/images/help.png";

const sidebarItems = [
  { Icon: DashboardIcon, href: "/" },
  { Icon: ProductIcon, href: "/products" },
  { Icon: SettingIcon, href: "/settings" },
  { Icon: UserIcon, href: "/users" },
  { Icon: BellIcon, href: "/notifications" },
];

const SmallSidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "max-w-30 w-full h-full bg-black border-r border-black-3",
        className
      )}
    >
      <div className="ml-8 border-b border-black-border pt-6 pb-8.75">
        <Link href={"/"}>
          <Image src={Logo} alt="logo" quality={100} />
        </Link>
      </div>

      <div className="flex flex-col justify-between items-center h-[calc(100dvh_-_100px)]">
        <div>
          <div className="border-b border-black-border py-6 px-3">
            <Image src={UserImage} alt="user" quality={100} />
          </div>

          <div className="mt-10 px-3 flex flex-col gap-1">
            {sidebarItems.map((item, index) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  href={item.href}
                  key={index}
                  className={cn(
                    "py-4.75 px-5 transition-colors",
                    isActive
                      ? "bg-black-2 text-white border-l-4 border-primary-400 "
                      : "text-grey-600 hover:bg-grey-900"
                  )}
                >
                  <item.Icon />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="pb-6">
          <Image src={QuestionMarkImage} alt="help" />
        </div>
      </div>
    </div>
  );
};

export default SmallSidebar;
