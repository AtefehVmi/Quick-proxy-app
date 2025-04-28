"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/modules/Dashboard/Navbar/Navbar";

const NavbarWrapper = () => {
  const pathname = usePathname();

  const rightBg = pathname === "/";

  return <Navbar rightBg={!rightBg} />;
};

export default NavbarWrapper;
