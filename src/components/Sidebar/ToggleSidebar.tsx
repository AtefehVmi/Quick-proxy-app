"use client";

import { Fragment, useState } from "react";
import cn from "@/utils/cn";
import Sidebar from "./Sidebar";
import SmallSidebar from "./SmallSidebar";

const ToggleSidebar = ({ className }: { className?: string }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => setIsCollapsed((prev) => !prev);

  return (
    <Fragment>
      {isCollapsed ? (
        <Sidebar onCollapse={handleToggle} className={className} />
      ) : (
        <SmallSidebar onExpand={handleToggle} className={className} />
      )}
    </Fragment>
  );
};

export default ToggleSidebar;
