import React from "react";
import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

const Button = (props) => {
  const { text, dark, full, clickHandler } = props;
  return (
    <button
      onClick={clickHandler}
      className={
        "rounded-full overflow-hidden hover:opacity-60 border-2 duration-200 border-solid border-indigo-600 " +
        (dark ? " text-white bg-indigo-600 " : "text-indigo-600 ") +
        (full ? " grid place-items-center w-full" : " ")
      }
    >
      <p
        className={
          "px-6 sm:px-10 whitespace-normal py-2 sm:py-3 " + fugaz.className
        }
      >
        {text}
      </p>
    </button>
  );
};

export default Button;
