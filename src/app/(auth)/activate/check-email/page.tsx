"use client";

import Button from "@/components/Button";
import H1 from "@/components/Typography/H1";
import TextBase from "@/components/Typography/TextBase";
import { supabase } from "@/services/supabaseClient";
import cn from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BackIcon from "public/icons/arrow-small-left.svg";
import CheckEmailImage from "public/images/check-email.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CheckEmailPage = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const interval = setInterval(async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
        return;
      }

      const user = data?.user;
      console.log(user);
      if (user && user.email_confirmed_at) {
        router.replace("/activate/email-verified");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session?.user.email) {
        console.log("Failed to get user email");
        return;
      }
      setUserEmail(data.session.user.email);
    };

    fetchSession();
  }, []);

  const handleResendEmail = async () => {
    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email: userEmail,
    });

    if (error) {
      console.log(error);
      toast.error(`Failed to resend email: ${error.message}`);
      return;
    }

    toast.success("Verification email resent! please check your inbox.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-14.5 py-9.5">
      <div className={cn("grow", "flex items-center justify-center w-full")}>
        <div className="max-w-[488px] w-full flex flex-col items-center">
          <Image src={CheckEmailImage} alt="" quality={100} />

          <H1 className="mt-14">Check your email</H1>
          <TextBase className="text-grey-600 mt-5">
            we send a code to{" "}
            <span className="text-primary-400">{userEmail}</span>
          </TextBase>

          <TextBase className="text-grey-600 mt-5">
            you receieved the email? if not{" "}
            <button
              onClick={handleResendEmail}
              className="text-primary-400 cursor-pointer"
            >
              Click to resend
            </button>
          </TextBase>

          <div
            className={cn(
              "mt-14 border-t border-white/15 pt-8 text-center w-full"
            )}
          >
            <TextBase>
              Already have an account?{" "}
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

export default CheckEmailPage;
