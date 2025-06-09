import LteProxy from "@/modules/Products/Lte/LteProxy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fastproxy.gg | Mobile/LTE",
};

const LteProxyPage = () => {
  return <LteProxy />;
};
export default LteProxyPage;
