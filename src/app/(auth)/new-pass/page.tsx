"use client";

import Button from "@/components/Button";
import H1 from "@/components/Typography/H1";
import TextBase from "@/components/Typography/TextBase";
import PassIcon from "public/icons/pass-icon.svg";
import cn from "@/utils/cn";
import Link from "next/link";
import BackIcon from "public/icons/arrow-small-left.svg";
import PasswordInput from "@/components/PasswordInput";
import ArrowLeftICon from "public/icons/arrow-small-left.svg";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { toast } from "react-toastify";

const NewPassPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const passwordError = password.length > 0 && password.length < 8;
  const confirmError =
    confirmPassword.length > 0 && password !== confirmPassword;

  const handleSetNewPass = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password must have more than 8 characters!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords must match!");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    setLoading(false);

    if (error) {
      toast.error("Failed to update password.");
      console.log(error);
      return;
    }

    toast.success("Password updated successfully!");
    router.push("/pass-changed");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-14.5 py-9.5">
      <div className={cn("grow", "flex items-center justify-center w-full")}>
        <div className="max-w-[488px] w-full">
          <H1>Set New Password</H1>
          <TextBase className="text-grey-600 mt-3">
            Must be at least 8 characters.
          </TextBase>

          <form className="mt-14" onSubmit={handleSetNewPass}>
            <PasswordInput
              showPassWeakness={false}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              labelBg="bg-black"
              startAdornment={<PassIcon />}
              className="mt-8"
              label="New Password"
              placeholder="Enter your password"
              error={passwordError}
              description={
                passwordError ? "Password must be at least 8 characters." : ""
              }
            />

            <PasswordInput
              showPassWeakness={false}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              labelBg="bg-black"
              startAdornment={<PassIcon />}
              className="mt-8"
              label="Confirm Password"
              placeholder="Enter your password"
              error={confirmError}
              description={confirmError ? "Passwords must match" : ""}
            />

            <Button
              disabled={loading || !password || !confirmPassword}
              type="submit"
              className="py-3 w-full mt-12"
            >
              {loading ? "Setting..." : "Set New Password"}
            </Button>
            <Button
              href={"/sign-in"}
              Icon={ArrowLeftICon}
              variant="outlined"
              className="py-3 w-full mt-4"
            >
              Back to login
            </Button>
          </form>

          <div className={cn("mt-14 text-center")}>
            <TextBase>
              Already have an account ?{" "}
              <Link href={"/sign-in"} className="text-primary-400 underline">
                Sign in
              </Link>
            </TextBase>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <Button
          onClick={() => router.back()}
          variant="text"
          className="py-3.5"
          Icon={BackIcon}
        >
          Back
        </Button>

        <Button href={"/"} variant="text">
          Home page
        </Button>
      </div>
    </div>
  );
};

export default NewPassPage;
