import Loader from "@/components/Loader";
import TextSm from "@/components/Typography/TextSm";
import { useUser } from "@/hooks/useUser";
import ProfileDropdown from "@/modules/Dropdown/ProfileDropdown";
import ArrowDownIcon from "public/icons/chevron-down.svg";

const ProfileDetails = () => {
  const { email, isLoading } = useUser();
  return (
    <div className="flex items-center gap-0.5">
      <ProfileDropdown />
    </div>
  );
};

export default ProfileDetails;
