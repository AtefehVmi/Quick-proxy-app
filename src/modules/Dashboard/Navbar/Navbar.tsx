import cn from "@/utils/cn";
import SearchIcon from "public/icons/search.svg";
import ProfileDropdown from "@/modules/Dropdown/ProfileDropdown";
import NotifModal from "@/modules/Modals/NotifModal";

const Navbar = () => {
  return (
    <div
      className={cn(
        "h-25 border-b border-black-border mr-8",
        "flex items-center justify-between"
      )}
    >
      <div className="relative text-white ml-7">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search"
          className={cn(
            "bg-transparent text-white w-81 border border-black-border",
            "placeholder:text-white placeholder:text-xs placeholder:leading-4.5",
            "py-4 pl-12 pr-4"
          )}
        />
      </div>

      <div className="flex items-center gap-3 py-5.5">
        <ProfileDropdown className="m-4 cursor-pointer" />
        <div className="bg-black-2 w-px h-14"></div>
        <div className="">
          <NotifModal className="flex items-center gap-2" />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
