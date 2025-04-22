import Button from "@/components/Button";
import InputText from "@/components/InputText";
import H1 from "@/components/Typography/H1";
import TextBase from "@/components/Typography/TextBase";
import EmailIcon from "public/icons/letter-icon.svg";
import cn from "@/utils/cn";
import Link from "next/link";
import BackIcon from "public/icons/arrow-small-left.svg";
import ArrowLeftICon from "public/icons/arrow-small-left.svg";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-14.5 py-9.5">
      <div className={cn("grow", "flex items-center justify-center w-full")}>
        <div className="max-w-[488px] w-full">
          <H1>Forgot Password</H1>
          <TextBase className="text-grey-600 mt-3">
            No worries, we’ll send you reset instructions.{" "}
          </TextBase>

          <form className="mt-14">
            <InputText
              type="text"
              labelBg="bg-black"
              startAdornment={<EmailIcon />}
              label="Email"
              placeholder="Enter your email"
            />

            <Button className="py-3 w-full mt-12">Reset password</Button>
            <Button
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
        <Button variant="text" className="py-3.5" Icon={BackIcon}>
          Back
        </Button>

        <Button variant="text">Home page</Button>
      </div>
    </div>
  );
};

export default SignInPage;
