import BackToTop from "@/components/Buttons/back-to-top";
import NavHeader from "@/components/navigation/NavHeader";
import Sidebar from "@/components/navigation/sidebar";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { ibmMono } from "./fonts";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: {
    template: "moviesFun | %s",
    default: "moviesFun",
  },
  description:
    "discover interesting movies,people and tv series of different genres. ",
};

export default function RootLayout({
  children,
  modals,
}: {
  children: React.ReactNode;
  modals: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${ibmMono.variable} bg-background text-text font-ibm-mono`}
      >
        <Providers>
          <Toaster />
          <main className="md:flex w-full">
            <Sidebar />
            <section className=" overflow-x-clip relative w-full">
              <NavHeader />

              {children}
            </section>
          </main>
          <BackToTop />

          {modals}
        </Providers>
      </body>
    </html>
  );
}
