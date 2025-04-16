import Wallet from "./Wallet";

const RightSidebar = () => {
  return (
    <div className="bg-black-3 h-[calc(100vh_-_100px)] grow">
      <Wallet title="Wallet" className="pt-6 pl-6 pr-8" />
    </div>
  );
};
export default RightSidebar;
