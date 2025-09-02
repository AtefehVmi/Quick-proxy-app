import Button from "@/components/Button";
import Image from "next/image";
import QuestionMarkImage from "public/images/help.png";

const HelpCenterCard = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-help pb-7">
      <Image src={QuestionMarkImage} alt="" />
      <p className="mt-5 text-base 2xl:text-lg font-bold text-white leading-8">
        Help Center!
      </p>
      <p className="text-sm hidden 2xl:block leading-6 text-white">
        Having trouble in proxy
      </p>
      <p className="text-sm hidden 2xl:block leading-6 text-white">
        Please contact us for more question
      </p>
      <Button variant="outlined" className="mt-6 py-3 px-9">
        Go To Help Center
      </Button>
    </div>
  );
};
export default HelpCenterCard;
