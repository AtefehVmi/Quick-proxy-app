"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "public/logo.png";
import sidebarItems from "./SidebarItems";
import cn from "@/utils/cn";
import ChevronDownIcon from "public/icons/angle-down.svg";
import BalanceCard from "./BalanceCard";
import HelpCenterCard from "./HelpCenterCard";

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "bg-black w-full flex flex-col max-w-79 border-r border-black-3",
        className
      )}
    >
      <div className="ml-8 pb-6.5 border-b border-black-border pt-6">
        <Link href={"/"}>
          <Image
            src={LogoImage}
            alt="logo"
            className=""
            width={211}
            height={48}
          />
        </Link>
      </div>
      <div className="flex flex-col justify-between px-8 pb-6 pt-8 overflow-y-auto h-[calc(100vh_-_100px)]">
        <div>
          <BalanceCard />

          <ul className="mt-8 flex flex-col gap-3 text-xs">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "py-1 flex items-center justify-between text-grey-600",
                      isActive && ""
                    )}
                  >
                    {item.name}
                    <ChevronDownIcon className="text-grey-700" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-full">
          <HelpCenterCard />
        </div>
      </div>
    </div>
  );
}
