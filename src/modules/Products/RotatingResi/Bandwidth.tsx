import BandwidthCard from "./BandwidthCard";
import UserCard from "./UserCard";

const Bandwidth = () => {
  return (
    <div>
      <p className="text-white font-bold text-xl leading-7.5 pt-6">Bandwidth</p>

      <BandwidthCard />
      <UserCard className="mt-4" />
    </div>
  );
};
export default Bandwidth;
