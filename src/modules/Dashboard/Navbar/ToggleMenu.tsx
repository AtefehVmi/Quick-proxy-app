"use client";

import BurgerMenuIcon from "public/icons/burger-menu.svg";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

const ToggleMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div>
      <div
        onClick={() => setOpenMenu(!openMenu)}
        className="w-14 h-14 flex items-center justify-center bg-black-3"
      >
        <BurgerMenuIcon />
      </div>
      {openMenu && <MobileMenu setCloseMenu={() => setOpenMenu(false)} />}
    </div>
  );
};
export default ToggleMenu;
