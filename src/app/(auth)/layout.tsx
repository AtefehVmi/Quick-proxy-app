import Image from "next/image";
import GlobeImage from "public/images/auth-globe.png";
import LogoIcon from "public/auth-logo.svg";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen w-screen">
      <div className="bg-primary-400 flex-1 flex flex-col justify-between">
        <Image src={GlobeImage} alt="globe" quality={100} />
        <div className="flex items-center justify-center mb-12">
          <LogoIcon />
        </div>
      </div>
      <main className="flex-1 bg-black">{children}</main>
    </div>
  );
}
