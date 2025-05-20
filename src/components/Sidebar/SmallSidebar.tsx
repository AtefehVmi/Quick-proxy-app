"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import cn from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import Logo from "public/logo-small.svg";
import UserImage from "public/images/user.png";
import DashboardIcon from "public/icons/dashboard.svg";
import ProductIcon from "public/icons/product.svg";
import SettingIcon from "public/icons/setting.svg";
import UserIcon from "public/icons/user-small.svg";
import QuestionMarkImage from "public/images/help.png";
import Button from "@/components/Button";
import DoubleArrowRight from "public/icons/angle-double-left.svg";
import RotatingResiIcon from "public/icons/rotating-resi.svg";
import IspIcon from "public/icons/isp.svg";
import RotatingMobileIcon from "public/icons/rotating-mobile.svg";
import MobileIcon from "public/icons/mobile-lte.svg";
import ROUTES from "@/constants/routes";

const sidebarItems = [
  { Icon: DashboardIcon, href: ROUTES.DASHBOARD },
  {
    Icon: ProductIcon,
    children: [
      { href: ROUTES.ROTATING_RESIDENTIAL, Icon: RotatingResiIcon },
      { href: ROUTES.ISP, Icon: IspIcon },
      { href: ROUTES.ROTATING_MOBILE, Icon: RotatingMobileIcon },
      { href: ROUTES.ROTATING_LTE, Icon: MobileIcon },
    ],
  },
  // { Icon: SettingIcon, href: "/settings" },
  { Icon: UserIcon, href: ROUTES.PROFILE },
];

const SmallSidebar = ({
  className,
  onExpand,
}: {
  className?: string;
  onExpand: () => void;
}) => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className={cn(
        "max-w-30 w-full h-full bg-black border-r border-black-3",
        className
      )}
    >
      <div className="ml-8 border-b border-black-border pt-6 pb-8.75 relative">
        <Link href={"/"}>
          <Logo />
        </Link>

        <Button
          onClick={onExpand}
          variant="black"
          className="absolute -right-3 top-1/3"
        >
          <DoubleArrowRight className="m-1.5 rotate-180" />
        </Button>
      </div>

      <div className="flex flex-col justify-between items-center h-[calc(100dvh_-_100px)]">
        <div>
          <div className="border-b border-black-border py-6 px-3">
            <Image src={UserImage} alt="user" quality={100} />
          </div>

          <div className="mt-10 px-3 flex flex-col gap-1">
            {sidebarItems.map((item, index) => {
              const hasChildren = item.children?.length;

              const isActive = item.href
                ? pathname === item.href
                : item.children?.some((child) =>
                    pathname.startsWith(child.href)
                  );

              return (
                <div key={index}>
                  {hasChildren ? (
                    <button
                      onClick={() => toggleMenu(`menu-${index}`)}
                      className={cn(
                        "w-full text-left py-4.75 px-5 transition-colors cursor-pointer",
                        isActive
                          ? "bg-black-2 text-white border-l-4 border-primary-400"
                          : "text-grey-600 hover:bg-grey-900"
                      )}
                    >
                      <item.Icon />
                    </button>
                  ) : (
                    <Link
                      href={item.href!}
                      className={cn(
                        "py-4.75 px-5 transition-colors block",
                        isActive
                          ? "bg-black-2 text-white border-l-4 border-primary-400"
                          : "text-grey-600 hover:bg-grey-900"
                      )}
                    >
                      <item.Icon />
                    </Link>
                  )}

                  {/* Children menu */}
                  {hasChildren && openMenus[`menu-${index}`] && (
                    <div className="ml-3 flex flex-col gap-1">
                      {item.children?.map((child, idx) => {
                        const childActive = pathname === child.href;
                        return (
                          <Link
                            href={child.href}
                            key={idx}
                            className={cn(
                              "py-4 px-4 transition-colors text-sm",
                              childActive
                                ? "bg-black-2 text-white border-l-4 border-primary-400"
                                : "text-grey-500 hover:bg-grey-900"
                            )}
                          >
                            <child.Icon />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
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
