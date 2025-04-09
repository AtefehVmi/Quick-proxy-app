import cn from "@/utils/cn";
import Bandwidth from "./Bandwidth";

const GenerateSide = () => {
  return (
    <div className={cn("bg-black-3 h-[calc(100vh_-_100px)] grow px-8")}>
      <Bandwidth />
    </div>
  );
};
export default GenerateSide;
