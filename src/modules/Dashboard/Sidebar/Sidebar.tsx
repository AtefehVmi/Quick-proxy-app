"use client";

import { useId } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "@/public/logo.png";
import LogOutIcon from "@/public/icons/logout.svg";
import AngleDownIcon from "@/public/icons/angle-down.svg";
import { UserProfile } from "@/services/ApiModels";
import { logout } from "@/services/Api";
import useFetch from "@/hooks/useFetch";
import sidebarItems from "./SidebarItems";
import ROUTES from "@/constants/routes";
import cn from "@/utils/cn";
import Button from "@/components/Button";

export default function Sidebar({
  user,
  className,
}: {
  user: UserProfile;
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { loading, fetch: fetchLogout } = useFetch(logout, false, {
    toastOnError: true,
  });

  const handleLogout = () => {
    fetchLogout().then(() => router.push(ROUTES.SIGN_IN));
  };

  return (
    <div
      className={cn(
        "bg-black w-full flex flex-col max-w-79 border-r border-black-3",
        className
      )}
    >
      <Link className="h-20 p-5 border-b border-others-o21" href="/">
        <Image
          width={186}
          height={32}
          src={LogoImage}
          alt="logo"
          className="mx-auto"
        />
      </Link>
      <div className="no-scrollbar flex flex-col px-5 pb-6 pt-8 overflow-y-auto grow">
        <p className="text-base font-medium text-others-o21">MENU</p>
        <ul className="mt-5 flex flex-col gap-1 text-base font-medium">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "p-4 rounded-2xl flex gap-2 items-center text-others-o6 hover:bg-others-o21",
                    isActive && "text-white bg-others-o5 border-r border-white"
                  )}
                >
                  <img src={item.icon} alt="icon" className="w-5 h-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="w-full mt-auto">
          <Button
            loading={loading}
            variant="none"
            className="w-full text-white justify-start py-4 border border-white/5"
            onClick={handleLogout}
          >
            <LogOutIcon />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
