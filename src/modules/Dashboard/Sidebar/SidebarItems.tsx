import ROUTES from "@/constants/routes";

const sidebarItems = [
  {
    name: "General",
    href: ROUTES.DASHBOARD,
    children: [],
  },
  {
    name: "Residential",
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
    name: "Mobile",
    href: "/referrals",
    children: [],
  },
  {
    name: "Support",
    href: "/referrals",
    children: [],
  },
];

export default sidebarItems;
