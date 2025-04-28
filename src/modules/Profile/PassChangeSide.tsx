"use client";

import InputText from "@/components/InputText";
import ChangePassModal from "../Modals/ChangePassModal";
import EyeIcon from "public/icons/eye-icon.svg";
import { useState } from "react";
import cn from "@/utils/cn";
import Button from "@/components/Button";
import ArrowRightIcon from "public/icons/arrow-small-right.svg";

const PassChangeSide = ({ className }: { className?: string }) => {
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  return (
    <div className={cn(className, "flex flex-col justify-between")}>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-white text-xl leading-7.5 font-bold">
            Change your password
          </p>

          <ChangePassModal />
        </div>

        <div className="mt-10">
          <InputText
            label="Current Password"
            placeholder="******"
            endAdornment={<EyeIcon />}
            readOnly
          />
          <InputText
            label="New  Password"
            placeholder="Enter"
            endAdornment={<EyeIcon />}
            className="mt-12"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <InputText
            label="Confirm New Password"
            placeholder="Enter"
            endAdornment={<EyeIcon />}
            className="mt-12"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end mt-8 pb-0 xl:pb-10">
        <Button className="py-4 px-12" RightIcon={ArrowRightIcon}>
          Save change
        </Button>
      </div>
    </div>
  );
};
export default PassChangeSide;
