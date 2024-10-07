"use client";
import { baseRating, gradients } from "@/utils";
import React, { useState } from "react";
import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sept",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};
const monthsArr = Object.keys(months);
const now = new Date();
const dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Calendar = (props) => {
  const { demo, completeData, handelSetMood } = props;
  const now = new Date();
  const currentMonth = now.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(
    Object.keys(months)[currentMonth]
  );
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  // console.log("selected month is -> " + selectedMonth);

  const numericMonth = monthsArr.indexOf(selectedMonth);
  const data = completeData?.[selectedYear]?.[numericMonth] || {};

  function handelIncrementMonth(val) {
    // value +1 -1
    // if we hit the bounds of the months, then we can just
    // adjust the year that is displayed instead
    if (numericMonth + val < 0) {
      // set month value = 11 and decrement the year
      setSelectedYear((curr) => curr - 1);
      setSelectedMonth(monthsArr[monthsArr.length - 1]);
    } else if (numericMonth + val > 11) {
      // set month value = 0 and increment the year
      setSelectedYear((curr) => curr + 1);
      setSelectedMonth(monthsArr[0]);
    } else {
      setSelectedMonth(monthsArr[numericMonth + val]);
    }
  }

  const monthNow = new Date(
    selectedYear,
    Object.keys(months).indexOf(selectedMonth),
    1
  );
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(
    selectedYear,
    Object.keys(selectedMonth).indexOf(selectedMonth) + 1,
    0
  ).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows =
    Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 > 0 ? 1 : 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-5 gap-4">
        <button
          onClick={() => {
            handelIncrementMonth(-1);
          }}
          className="mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60"
        >
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        <p
          className={
            "text-center col-span-3 capitalized whitespace-nowrap textGradient " +
            fugaz.className
          }
        >
          {selectedMonth}, {selectedYear}
        </p>
        <button
          onClick={() => {
            handelIncrementMonth(+1);
          }}
          className="ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60"
        >
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>
      <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
        {[...Array(numRows).keys()].map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="grid grid-cols-7 gap-1">
              {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                let dayIndex =
                  rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

                let dayDisplay =
                  dayIndex > daysInMonth
                    ? false
                    : row === 0 && dayOfWeekIndex < firstDayOfMonth
                    ? false
                    : true;

                let isToday = dayIndex === now.getDate();

                if (!dayDisplay) {
                  return <div className="bg-white" key={dayOfWeekIndex} />;
                }

                let color = demo
                  ? gradients.blue[baseRating[dayIndex]]
                  : dayIndex in data
                  ? gradients.blue[data[dayIndex]]
                  : "white";

                return (
                  <div
                    style={{ backgroundColor: color }}
                    className={
                      "text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg " +
                      (isToday ? "border-indigo-500 " : "border-indigo-100") +
                      (color === "white" ? "text-indigo-400" : "text-white")
                    }
                    key={dayOfWeekIndex}
                  >
                    <p>{dayIndex}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
