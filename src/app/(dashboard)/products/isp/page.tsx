import IspProxy from "@/modules/Products/Isp/IspProxy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fastproxy.gg | Static Residential",
};

const IspProxies = () => {
  return <IspProxy />;
};
export default IspProxies;
