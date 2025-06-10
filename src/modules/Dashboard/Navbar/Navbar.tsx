import cn from "@/utils/cn";
import SearchIcon from "public/icons/search.svg";
import ProfileDropdown from "@/modules/Dropdown/ProfileDropdown";
import NotifModal from "@/modules/Modals/NotifModal";
import Logo from "public/logo-small.svg";
import ToggleMenu from "./ToggleMenu";
import ProfileDetails from "./ProfileDetails";

const Navbar = ({ rightBg = true }: { rightBg?: boolean }) => {
  return (
    <div
      className={cn(
        "h-25 border-b border-black-border px-5 xl:px-0",
        "flex items-center justify-between md:justify-end xl:grid xl:grid-cols-24 xl:gap-5"
      )}
    >
      <div className="hidden xl:col-span-16 xl:block"></div>
      {rightBg && (
        <div
          className={cn(
            "bg-black-3 xl:col-span-8 h-24.75",
            "hidden xl:flex items-center pl-5"
          )}
        >
          <ProfileDropdown />
        </div>
      )}

      <div className="flex items-center gap-3 md:hidden z-20">
        <ToggleMenu />
        <Logo />
      </div>

      <ProfileDropdown className="flex xl:hidden" />
    </div>
  );
};
export default Navbar;
