import LteProxy from "@/modules/Products/Lte/LteProxy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proxy | Mobile/LTE",
};

const LteProxyPage = () => {
  return <LteProxy />;
};
export default LteProxyPage;
