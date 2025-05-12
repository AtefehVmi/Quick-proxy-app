"use client";

import cn from "@/utils/cn";
import { useEffect, useRef, useState } from "react";
import UserIcon from "public/icons/user.svg";
import UserSmallIcon from "public/icons/user-small.svg";
import LogoutIcon from "public/icons/exit.svg";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ProfileDropdown = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
  }, [isOpen]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Logout failed");
    } else {
      toast.success("Logged out");
      localStorage.removeItem("accessToken");
      router.replace("/sign-in");
    }

    setIsOpen(false);
  };

  const handleProfile = () => {
    router.push("/profile");
    setIsOpen(false);
  };

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
          <button
            onClick={handleProfile}
            className={cn(
              "border-b border-black-border p-3 bg-black-3 hover:bg-black",
              "flex items-center gap-1.75 cursor-pointer w-full"
            )}
          >
            <UserSmallIcon height={18} width={18} className="text-grey-600" />
            <p className="text-base text-grey-600 leading-6">Profile</p>
          </button>

          <button
            onClick={handleLogout}
            className={cn(
              "border-b border-black-border p-3 bg-black-3 hover:bg-black",
              "flex items-center gap-1.75 cursor-pointer w-full"
            )}
          >
            <LogoutIcon height={18} width={18} className="text-grey-600" />
            <p className="text-base text-grey-600 leading-6">Logout</p>
          </button>
        </div>
      )}
    </div>
  );
};
export default ProfileDropdown;
