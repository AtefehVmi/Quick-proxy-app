import Button from "@/components/Button";
import H1 from "@/components/Typography/H1";
import TextBase from "@/components/Typography/TextBase";
import cn from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import BackIcon from "public/icons/arrow-small-left.svg";
import CheckEmailImage from "public/images/check-email.png";

const CheckEmailPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-14.5 py-9.5">
      <div className={cn("grow", "flex items-center justify-center w-full")}>
        <div className="max-w-[488px] w-full flex flex-col items-center">
          <Image src={CheckEmailImage} alt="" quality={100} />

          <H1 className="mt-14">Check your email</H1>
          <TextBase className="text-grey-600 mt-5">
            we send a code to{" "}
            <span className="text-primary-400">youremail@gmail.com</span>
          </TextBase>

          <TextBase className="text-grey-600 mt-5">
            you receieved the email? if not{" "}
            <span className="text-primary-400">Click to resend</span>
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
        <Button variant="text" className="py-3.5" Icon={BackIcon}>
          Back
        </Button>

        <Button variant="text">Home page</Button>
      </div>
    </div>
  );
};

export default CheckEmailPage;
