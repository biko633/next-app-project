import localFont from "next/font/local";
import { Fugaz_One, AR_One_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Head from "./head";
import Logout from "@/components/Logout";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });
const arOneSans = AR_One_Sans({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Diet Tracker",
  description: "Track you diet everyday of the year",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href="/">
        <h1 className={"text-base sm:text-lg textGradient " + fugaz.className}>
          Diet Tracker
        </h1>
      </Link>
      <Logout />
    </header>
  );
  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={"text-indigo-500 " + fugaz.className}>created with ❤️</p>{" "}
    </footer>
  );
  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body
          className={
            " w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 " +
            arOneSans.className
          }
        >
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
