import Button from "@/components/Button";
import TextSm from "@/components/Typography/TextSm";
import TextXs from "@/components/Typography/TextXs";
import cn from "@/utils/cn";
import EditIcon from "public/icons/file-edit.svg";

const UserCard = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("bg-black p-4.5 flex items-end justify-between", className)}
    >
      <div>
        <div className="flex items-center gap-11">
          <div>
            <TextSm className="text-grey-700">Password</TextSm>
            <p className="text-32 text-center font-bold text-white leading-12">
              ********
            </p>
          </div>

          <div>
            <TextSm className="text-grey-700">Username</TextSm>
            <p className="text-32 font-bold text-white leading-12">46 GB</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-5">
          <TextXs className="text-grey-700">Last change at</TextXs>
          <TextSm className="font-semibold text-white">22 may, 2025</TextSm>
        </div>
      </div>

      <Button className="p-2">
        <EditIcon />
      </Button>
    </div>
  );
};
export default UserCard;
