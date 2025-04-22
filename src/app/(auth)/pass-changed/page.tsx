import Button from "@/components/Button";
import H1 from "@/components/Typography/H1";
import TextBase from "@/components/Typography/TextBase";
import cn from "@/utils/cn";
import Link from "next/link";
import BackIcon from "public/icons/arrow-small-left.svg";
import ArrowLeftICon from "public/icons/arrow-small-left.svg";

const PassChangedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-14.5 py-9.5">
      <div className={cn("grow", "flex items-center justify-center w-full")}>
        <div className="max-w-[488px] w-full">
          <H1>Password changed successfully.</H1>
          <TextBase className="text-grey-600 mt-3">
            Your password has been reset. You can now login to your account.
          </TextBase>

          <form className="mt-12">
            <Button className="py-3 w-full mt-12">Go to login</Button>
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
        <Button variant="ghost" className="py-3.5" Icon={BackIcon}>
          Back
        </Button>

        <Button variant="ghost">Home page</Button>
      </div>
    </div>
  );
};

export default PassChangedPage;
