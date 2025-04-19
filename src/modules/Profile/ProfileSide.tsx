import cn from "@/utils/cn";
import Wallet from "../Dashboard/onborading/Wallet";
import PassChangeSide from "./PassChangeSide";

const ProfileSide = () => {
  return (
    <div className={cn("bg-black-3 h-screen grow px-8", "flex flex-col")}>
      <Wallet title="Your Balance" className="mt-6" />

      <div className="mt-8">
        <PassChangeSide className="h-full" />
      </div>
    </div>
  );
};
export default ProfileSide;
