import React from "react";
import { Fugaz_One } from "next/font/google";
import Button from "./Button";
import Calendar from "./Calendar";
import Link from "next/link";
import CallToAction from "./CallToAction";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

const Hero = () => {
  return (
    <div className="py-4 md:py-10 flex flex-col gap-8 sm:gap-10">
      <h1
        className={
          "text-5xl sm:text-6xl md:text-7xl text-center " + fugaz.className
        }
      >
        <span className="textGradient">Diet Tracker</span> help you track your{" "}
        <span className="textGradient">daily</span> diet everyday of the year.
      </h1>
      <p
        className={
          "text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px]"
        }
      >
        crete your own custom record of diet tracker to see what you eat on{" "}
        <span className="font-semibold">every day of the year.</span>
      </p>
      <CallToAction />
      <Calendar demo />
    </div>
  );
};

export default Hero;
