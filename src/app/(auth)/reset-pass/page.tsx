"use client";

import Button from "@/components/Button";
import H1 from "@/components/Typography/H1";
import TextBase from "@/components/Typography/TextBase";
import cn from "@/utils/cn";
import Link from "next/link";
import BackIcon from "public/icons/arrow-small-left.svg";
import ArrowLeftICon from "public/icons/arrow-small-left.svg";
import OtpInput from "@/components/OtpInput";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/services/supabaseClient";

const ResetPassPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false); // For loading state during resend

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is missing");
      return;
    }

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      type: "recovery",
      token: otpCode,
    });

    if (error) {
      toast.error("Invalid or expired code");
      console.log(error);
      return;
    }

    router.push(`/new-pass?email=${encodeURIComponent(email)}`);
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email is missing");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      toast.error("Failed to resend OTP");
      console.log(error);
    } else {
      toast.success("OTP sent successfully");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-14.5 py-9.5">
      <div className={cn("grow", "flex items-center justify-center w-full")}>
        <div className="max-w-[488px] w-full">
          <H1>Password reset</H1>
          <TextBase className="text-grey-600 mt-3">
            We send a code to <span className="text-primary-400">{email}</span>
          </TextBase>

          <form className="mt-12" onSubmit={handleVerifyCode}>
            <OtpInput value={otpCode} onChange={setOtpCode} />

            <TextBase className="text-grey-600 mt-12 text-center">
              You received the email? If not,{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-primary-400 cursor-pointer"
                disabled={loading}
              >
                Click to resend
              </button>
            </TextBase>

            <Button type="submit" className="py-3 w-full mt-12">
              Continue
            </Button>
            <Button
              Icon={ArrowLeftICon}
              variant="outlined"
              className="py-3 w-full mt-4"
              href={"/sign-in"}
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

        <Button variant="text" href={"/"}>
          Home page
        </Button>
      </div>
    </div>
  );
};

export default ResetPassPage;
