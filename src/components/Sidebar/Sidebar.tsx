"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "public/logo.png";
import sidebarItems from "./SidebarItems";
import cn from "@/utils/cn";
import ChevronDownIcon from "public/icons/angle-down.svg";
import BalanceCard from "./BalanceCard";
import HelpCenterCard from "./HelpCenterCard";
import Button from "@/components/Button";
import DoubleArrowRight from "public/icons/angle-double-left.svg";

export default function Sidebar({
  className,
  onCollapse,
}: {
  className?: string;
  onCollapse: () => void;
}) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<
    Record<number, boolean>
  >({});

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div
      className={cn(
        "bg-black w-full flex flex-col max-w-60 2xl:max-w-79 border-r border-black-3",
        className
      )}
    >
      <div className="ml-8 pb-8.75 2xl:pb-6.75 border-b border-black-border pt-6 relative">
        <Link href="/">
          <Image
            src={LogoImage}
            alt="logo"
            className="w-46 h-10 2xl:w-53 2xl:h-12"
          />
        </Link>
        <Button
          onClick={onCollapse}
          variant="black"
          className="absolute -right-3 top-1/3"
        >
          <DoubleArrowRight className="m-1.5" />
        </Button>
      </div>

      <div className="flex flex-col scrollbar-hide justify-between px-0 2xl:px-8 pb-6 pt-8 overflow-y-auto h-[calc(100vh_-_100px)]">
        <div>
          <BalanceCard className="mx-4 2xl:mx-0" />

          <ul className="mt-8 flex flex-col gap-3 text-xs">
            {sidebarItems.map((item, index) => {
              const isExpanded = expandedSections[index];

              return (
                <li key={index}>
                  <div className="flex flex-col text-base leading-6 text-grey-600">
                    <button
                      onClick={() => toggleSection(index)}
                      className="cursor-pointer py-1 px-4 2xl:px-0 w-full flex items-center justify-between text-grey-600"
                    >
                      {item.name}
                      <ChevronDownIcon
                        className={cn(
                          "text-grey-700 transition-transform duration-300",
                          isExpanded ? "rotate-180" : ""
                        )}
                      />
                    </button>

                    {isExpanded && (
                      <div className="flex flex-col gap-1">
                        {item.children.map((child, childIndex) => {
                          const isActive = isActiveLink(child.href);
                          return (
                            <Link
                              href={child.href}
                              key={childIndex}
                              className={cn(
                                "flex px-8 py-4 items-center gap-2 transition-colors whitespace-nowrap",
                                isActive
                                  ? "bg-black-2 border-l-4 border-primary-400 text-white"
                                  : "text-grey-600 hover:bg-grey-900"
                              )}
                            >
                              <child.icon />
                              {child.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="w-full mt-8">
          <HelpCenterCard />
        </div>
      </div>
    </div>
  );
}
