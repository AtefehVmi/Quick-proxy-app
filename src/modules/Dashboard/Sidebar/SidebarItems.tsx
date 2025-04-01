import ROUTES from "@/constants/routes";

const sidebarItems = [
  {
    name: "Dashboard",
    icon: "sidebar/dashboard.svg",
    href: ROUTES.DASHBOARD,
    children: [],
  },
  {
    name: "Products",
    icon: "sidebar/product.svg",
    href: ROUTES.PRODUCTS,
    children: [
      {
        name: "Rotating Residential",
        href: ROUTES.ROTATING_RESIDENTIAL,
      },
      {
        name: "Static Residential",
        href: ROUTES.ISP,
      },
      {
        name: "Mobile",
        href: ROUTES.STATIC_LTE,
      },
      {
        name: "Rotating Mobile",
        href: ROUTES.ROTATING_LTE,
      },
    ],
  },
  {
    name: "Settings",
    icon: "sidebar/settings.svg",
    href: "/referrals",
    children: [],
  },
  {
    name: "Profile",
    icon: "sidebar/profile.svg",
    href: "/referrals",
    children: [],
  },
];

export default sidebarItems;
