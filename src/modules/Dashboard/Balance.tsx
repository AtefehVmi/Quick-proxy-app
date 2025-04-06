import Button from "@/components/Button";
import Card from "@/components/Card/Card";
import AddIcon from "public/icons/add.svg";

const Balance = () => {
  return (
    <Card className="py-4 px-4.5 bg-balance">
      <p className="text-lg text-grey-500 leading-9">Balance</p>
      <div className="flex items-center justify-between mt-9">
        <p className="text-grey-100 font-bold text-32">$345.00</p>
        <Button variant="black" className="*:hover:text-primary-400">
          <AddIcon className="text-white m-3.5" />
        </Button>
      </div>
    </Card>
  );
};
export default Balance;
