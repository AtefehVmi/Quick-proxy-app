"use client";

import InputText from "@/components/InputText";
import ChangePassModal from "../Modals/ChangePassModal";
import EyeIcon from "public/icons/eye-icon.svg";
import { useState } from "react";
import cn from "@/utils/cn";
import Button from "@/components/Button";
import ArrowRightIcon from "public/icons/arrow-small-right.svg";
import { supabase } from "@/services/supabaseClient";
import { toast } from "react-toastify";
import PasswordInput from "@/components/PasswordInput";

const PassChangeSide = ({ className }: { className?: string }) => {
  const [currentPass, setCurrentPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [currentPassSuccess, setCurrentPassSuccess] = useState<boolean>(false);

  const passwordError = newPass.length > 0 && newPass.length < 8;
  const confirmError = confirmPass.length > 0 && newPass !== confirmPass;

  const handleSetNewPass = async () => {
    if (newPass.length < 8) return;
    if (newPass !== confirmPass) return;

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      toast.error("Failed to get user.");
      setLoading(false);
      return;
    }

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPass,
    });

    if (loginError) {
      setCurrentPassSuccess(false);
      toast.error("Current password is incorrect.");
      setLoading(false);
      return;
    }

    setCurrentPassSuccess(true);

    const { error } = await supabase.auth.updateUser({
      password: newPass,
    });

    setLoading(false);

    if (error) {
      toast.error("Failed to update password.");
      console.log(error);
      return;
    }

    toast.success("Password updated successfully!");
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    setCurrentPassSuccess(false);
  };

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
          <PasswordInput
            showPassWeakness={false}
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
            label="Current Password"
            placeholder="Enter current password"
            success={currentPassSuccess}
            description={currentPassSuccess ? "Correct" : ""}
          />
          <PasswordInput
            showPassWeakness={false}
            value={newPass}
            error={passwordError}
            description={
              passwordError ? "Password must be at least 8 characters." : ""
            }
            label="New Password"
            placeholder="Enter Password"
            className="mt-12"
            onChange={(e) => setNewPass(e.target.value)}
          />
          <PasswordInput
            value={confirmPass}
            showPassWeakness={false}
            label="Confirm New Password"
            placeholder="Enter Password"
            className="mt-12"
            onChange={(e) => setConfirmPass(e.target.value)}
            error={confirmError}
            description={confirmError ? "Passwords must match" : ""}
          />
        </div>
      </div>

      <div className="flex justify-end mt-8 pb-0 xl:pb-10">
        <Button
          onClick={handleSetNewPass}
          className="py-4 px-12"
          RightIcon={ArrowRightIcon}
        >
          {loading ? "Saving..." : "Save change"}
        </Button>
      </div>
    </div>
  );
};
export default PassChangeSide;
