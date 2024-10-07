"use client";
import React, { useEffect, useState } from "react";
import { Fugaz_One } from "next/font/google";
import Calendar from "./Calendar";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Login from "./Login";
import Loading from "./Loading";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

const Dashboard = () => {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState({});
  const [currentMood, setCurrentMood] = useState(0);
  const now = new Date();

  const moods = {
    Healthy: "👍",
    "High-Protein": "🍖",
    Cheat: "🍫",
    Vegan: "🌿",
    Fasting: "🍽️",
    "High-Calorie": "🍕",
  };

  function countValues() {
    let total_number_of_days = 0;
    let sum_moods = 0;
    let total = [];
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_mood = data[year][month][day];
          total.push(days_mood);
          total_number_of_days++;
          sum_moods += days_mood;
        }
      }
    }
    // Initialize count for each mood from 1 to 6
    let mood_count = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
    // Count occurrences of each mood
    total.forEach((mood) => {
      if (mood >= 1 && mood <= 6) {
        mood_count[mood]++;
      }
    });

    // Calculate percentage for each mood
    let mood_percentages = {};
    for (let mood in mood_count) {
      mood_percentages[mood] =
        Math.round((mood_count[mood] / total_number_of_days) * 100) + "%";
    }

    // console.log("Mood counts:", mood_count);
    // console.log("Mood percentages:", mood_percentages);

    return {
      num_days: total_number_of_days,
      selected_average_diet: mood_percentages[currentMood] || "",
    };
  }
  const statuses = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  };

  async function handelSetMood(mood) {
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    try {
      const newData = { ...userDataObj };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }
      newData[year][month][day] = mood;
      // update the current state
      setData(newData);
      // update the global state
      setUserDataObj(newData);
      // update firebase
      const docRef = doc(db, "users", currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.log("Failed to set data: ", err.message);
    }
  }

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }
    setData(userDataObj);
  }, [currentUser, userDataObj]);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }
  // console.log("cureeent mood" + currentMood);

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 p-4 gap-4 rounded-lg ">
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className=" flex flex-col gap-1 sm:gap-2">
              <p className="font-medium capitalize text=-xs sm:text-sm truncate ">
                {status.replaceAll("_", " ")}
              </p>
              <p className={"text-base sm:text-lg truncate " + fugaz.className}>
                {statuses[status]}
                {status === "num_days" ? " 🔥" : ""}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={
          "text-5xl sm:text-6xl md:text-7xl text-center " + fugaz.className
        }
      >
        How was you <span className="textGradient">diet</span> today?
      </h4>
      <div className="flex items-stretch flex-wrap gap-4 ">
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              onClick={() => {
                const currentMoodValue = moodIndex + 1;
                handelSetMood(currentMoodValue);
                setCurrentMood(currentMoodValue);
              }}
              className="p-4 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col items-center gap-2 flex-1"
              key={moodIndex}
            >
              <p className="text-4xl sm:text-5xl md:text-6xl">{moods[mood]}</p>
              <p
                className={
                  "text-indigo-500 text-xs sm:text-sm md:text-base " +
                  fugaz.className
                }
              >
                {mood}
              </p>
            </button>
          );
        })}
      </div>
      <Calendar completeData={data} handelSetMood={handelSetMood} />
    </div>
  );
};

export default Dashboard;
