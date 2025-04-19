"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import CrossIcon from "public/icons/cross-small.svg";
import cn from "@/utils/cn";
import Logo from "public/logo-small.png";
import Image from "next/image";
import ProfileDropdown from "@/modules/Dropdown/ProfileDropdown";
import NotifModal from "@/modules/Modals/NotifModal";
import BalanceCard from "@/components/Sidebar/BalanceCard";
import Link from "next/link";
import sidebarItems from "@/components/Sidebar/SidebarItems";
import ChevronDownIcon from "public/icons/angle-down.svg";

type Props = { setCloseMenu: () => void; className?: string };

const MobileMenu: React.FC<Props> = ({ className, setCloseMenu }) => {
  const pathname = usePathname();
  const [currentRoute, setCurrentRoute] = useState(pathname);

  useEffect(() => {
    if (pathname === currentRoute) return;

    if (pathname !== currentRoute) {
      setCloseMenu();
      setCurrentRoute(pathname);
    }
  }, [currentRoute, pathname, setCloseMenu]);

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
    <div className="absolute bg-black transform h-screen overflow-y-auto z-50 top-0 left-0 w-screen">
      <div className="flex flex-col h-screen">
        <header
          className={cn(
            "flex items-center justify-between mx-5 py-4",
            "h-25 border-b border-black-border"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              onClick={setCloseMenu}
              className="w-14 h-14 flex items-center justify-center bg-black-3"
            >
              <CrossIcon />
            </div>
            <Image src={Logo} alt="logo" />
          </div>

          <div className="flex items-center gap-3 py-5.5">
            <ProfileDropdown className="m-4 cursor-pointer" />
            <div className="bg-black-2 w-px h-14"></div>
            <div className="">
              <NotifModal className="flex items-center gap-2" />
            </div>
          </div>
        </header>

        <div className="px-5 mt-6">
          <BalanceCard />

          <div className="mt-6 flex flex-col gap-3">
            {sidebarItems.map((item, index) => {
              const isExpanded = expandedSections[index];

              return (
                <li key={index}>
                  <div className="flex flex-col text-base leading-6 text-grey-600">
                    <button
                      onClick={() => toggleSection(index)}
                      className="cursor-pointer py-1 w-full flex items-center justify-between text-grey-600"
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
                      <div className="flex flex-col gap-1 mt-1">
                        {item.children.map((child, childIndex) => {
                          const isActive = isActiveLink(child.href);
                          return (
                            <Link
                              href={child.href}
                              key={childIndex}
                              className={cn(
                                "flex px-8 py-4 items-center gap-2 transition-colors",
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default MobileMenu;
