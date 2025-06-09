"use client";

import cn from "@/utils/cn";
import { useEffect, useRef, useState } from "react";
import UserIcon from "public/icons/user.svg";
import UserSmallIcon from "public/icons/user-small.svg";
import LogoutIcon from "public/icons/exit.svg";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import TextSm from "@/components/Typography/TextSm";
import Loader from "@/components/Loader";
import ArrowDownIcon from "public/icons/chevron-down.svg";
import { useUser } from "@/hooks/useUser";

const ProfileDropdown = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { email, isLoading } = useUser();

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
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-0.5 cursor-pointer"
      >
        <div className={cn(className, "bg-black-2 p-4")}>
          <UserIcon className="text-white" />
        </div>
        <button className="flex items-center gap-2 p-4 cursor-pointer">
          <TextSm className="font-semibold text-grey-500 hidden lg:block">
            {isLoading ? <Loader /> : email}
          </TextSm>
          <ArrowDownIcon
            className={cn("transition-transform duration-300", {
              "rotate-180": isOpen,
              "rotate-0": !isOpen,
            })}
          />
        </button>
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute top-21.5 right-0 lg:right-64.5 w-32 z-50",
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
