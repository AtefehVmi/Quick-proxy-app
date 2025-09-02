import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import { ReactQueryClientProvider } from "@/providers";

export const metadata: Metadata = {
  title: "Proxy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          toastClassName="custom-toast"
        />
        <Suspense>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
