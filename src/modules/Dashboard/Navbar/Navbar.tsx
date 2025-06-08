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
        "h-25 border-b border-black-border pl-5 pr-5 ml-0 md:pr-8",
        "flex items-center justify-between z-0 relative"
      )}
    >
      {rightBg && (
        <div
          className={cn(
            "bg-black-3 w-[32.1%] 2xl:w-[32.7%] h-24.75 top-0 right-0 -z-50 absolute",
            "hidden xl:block"
          )}
        ></div>
      )}

      <div className="relative text-white ml-7 hidden md:block z-20">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search"
          className={cn(
            "bg-transparent text-white w-81 border border-black-border",
            "placeholder:text-white placeholder:text-xs placeholder:leading-4.5",
            "py-4 pl-12 pr-4 focus:border-primary-400  focus:outline-none"
          )}
        />
      </div>

      <div className="flex items-center gap-3 md:hidden z-20">
        <ToggleMenu />
        <Logo />
      </div>

      <ProfileDropdown />
    </div>
  );
};
export default Navbar;
