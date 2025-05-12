"use client";

import Button from "@/components/Button";
import H1 from "@/components/Typography/H1";
import TextBase from "@/components/Typography/TextBase";
import cn from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import BackIcon from "public/icons/arrow-small-left.svg";
import EmailSentImage from "public/images/email-sent.png";
import CaretRightIcon from "public/icons/arrow-right.svg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/services/supabaseClient";

const EmailVerifiedPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/activate/check-email");
      }
    };
    checkSession();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-14.5 py-9.5">
      <div className={cn("grow", "flex items-center justify-center w-full")}>
        <div className="max-w-[488px] w-full flex flex-col items-center">
          <Image src={EmailSentImage} alt="" quality={100} />

          <H1 className="mt-14 text-center">
            Your email has been successfully verified.
          </H1>

          <Button
            onClick={() => router.replace("/onboarding")}
            className="py-3 w-full mt-14"
          >
            Go to dashboard
            <CaretRightIcon />
          </Button>

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
        <Button variant="text" className="py-3.5" Icon={BackIcon}>
          Back
        </Button>

        <Button variant="text">Home page</Button>
      </div>
    </div>
  );
};

export default EmailVerifiedPage;
