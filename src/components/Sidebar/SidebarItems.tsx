import ROUTES from "@/constants/routes";
import RotatingResiIcon from "public/icons/rotating-resi.svg";
import IspIcon from "public/icons/isp.svg";
import RotatingMobileIcon from "public/icons/rotating-mobile.svg";
import MobileIcon from "public/icons/mobile-lte.svg";
import UserIcon from "public/icons/user-small.svg";
import DashboardIcon from "public/icons/dashboard.svg";

const sidebarItems = [
  {
    name: "General",
    children: [
      { name: "Dashboard", href: ROUTES.DASHBOARD, icon: DashboardIcon },
    ],
  },
  {
    name: "Residential",
    children: [
      {
        name: "Rotating Residential",
        href: ROUTES.ROTATING_RESIDENTIAL,
        icon: RotatingResiIcon,
      },
      {
        name: "ISP Proxies",
        href: ROUTES.ISP,
        icon: IspIcon,
      },
    ],
  },
  // {
  //   name: "Datacenter",
  //   children: [
  //     {
  //       name: "Rotating Datacenter",
  //       href: ROUTES.ROTATING_DATACENTER,
  //       icon: RotatingResiIcon,
  //     },
  //     {
  //       name: "Static Datacenter",
  //       href: ROUTES.STATIC_DATACENTER,
  //       icon: IspIcon,
  //     },
  //   ],
  // },
  {
    name: "Mobile",
    children: [
      {
        name: "Rotating Mobile",
        href: ROUTES.ROTATING_LTE,
        icon: RotatingMobileIcon,
      },
      { name: "Mobile / LTE", href: ROUTES.STATIC_LTE, icon: MobileIcon },
    ],
  },
  {
    name: "Support",
    children: [
      { name: "Profile & Billing", href: ROUTES.PROFILE, icon: UserIcon },
    ],
  },
];

export default sidebarItems;
