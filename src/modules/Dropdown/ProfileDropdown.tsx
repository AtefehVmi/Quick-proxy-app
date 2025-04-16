"use client";

import cn from "@/utils/cn";
import { useEffect, useRef, useState } from "react";
import UserIcon from "public/icons/user.svg";
import UserSmallIcon from "public/icons/user-small.svg";
import LogoutIcon from "public/icons/exit.svg";

const profileItems = [
  { name: "Profile", icon: UserSmallIcon },
  { name: "Logout", icon: LogoutIcon },
];

const ProfileDropdown = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className={cn(className)}>
        <UserIcon className="text-white" />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-25 right-0 lg:right-38 w-32 z-50",
            "bg-black-3"
          )}
        >
          {profileItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "border-b border-black-border p-3 bg-black-3 hover:bg-black",
                "flex items-center gap-1.75 cursor-pointer"
              )}
            >
              <item.icon height={18} width={18} className="text-grey-600" />
              <p className="text-base text-grey-600 leading-6">{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ProfileDropdown;
