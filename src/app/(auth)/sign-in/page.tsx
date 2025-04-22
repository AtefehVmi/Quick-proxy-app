"use client";

import Button from "@/components/Button";
import InputText from "@/components/InputText";
import H1 from "@/components/Typography/H1";
import TextBase from "@/components/Typography/TextBase";
import EmailIcon from "public/icons/letter-icon.svg";
import PassIcon from "public/icons/pass-icon.svg";
import UserIcon from "public/icons/user.svg";
import { useState } from "react";
import EnterIcon from "public/icons/enter.svg";
import cn from "@/utils/cn";
import Link from "next/link";
import BackIcon from "public/icons/arrow-small-left.svg";
import PasswordInput from "@/components/PasswordInput";

const SignInPage = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-14.5 py-9.5">
      <div className={cn("grow", "flex items-center justify-center w-full")}>
        <div className="max-w-[488px] w-full">
          <H1>Welcome Back</H1>
          <TextBase className="text-grey-600 mt-3">
            See your growth and get consulting support!
          </TextBase>

          <form className="mt-14">
            <InputText
              type="text"
              labelBg="bg-black"
              startAdornment={<EmailIcon />}
              label="Email"
              placeholder="Enter your email"
            />

            <PasswordInput
              labelBg="bg-black"
              startAdornment={<PassIcon />}
              className="mt-8"
              label="Password"
              placeholder="Enter your password"
            />

            <div className="mt-12 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* TODO: Customize checkbox to match design */}
                <input
                  id="agree"
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((checked) => !checked)}
                />
                <label
                  htmlFor="agree"
                  className="text-sm cursor-pointer leading-6"
                >
                  Remember me
                </label>
              </div>
              <Link href={""} className="text-primary-400 text-sm leading-6">
                Forgot Password?
              </Link>
            </div>

            <Button Icon={EnterIcon} className="py-3 w-full mt-12">
              Sign in
            </Button>
          </form>

          <div
            className={cn("mt-24 border-t border-white/15 pt-8 text-center")}
          >
            <TextBase>
              Not registered yet ?{" "}
              <Link href={"/sign-up"} className="text-primary-400 underline">
                Create an account
              </Link>
            </TextBase>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <Button variant="ghost" className="py-3.5" Icon={BackIcon}>
          Back
        </Button>

        <Button variant="ghost">Home page</Button>
      </div>
    </div>
  );
};

export default SignInPage;
