import { useState, useEffect } from "react";

type GameProgress = {
  score: number;
  level: string;
  type: boolean;
};

type TimesTableProgress = {
  [timesTableNumber: number]: {
    linear: {
      [level: string]: GameProgress;
    };
    random: {
      [level: string]: GameProgress;
    };
  };
};

export default function useGameProgress(): [
  TimesTableProgress,
  (number: number, level: string, type: boolean) => GameProgress | undefined,
  (
    number: number,
    level: string,
    type: boolean,
    progress: GameProgress
  ) => void,
  () => void
] {
  const key = "timesTables"; // Key for localStorage to store all times table progress

  // Retrieve all times table progress from localStorage or set default value
  const getStoredTimesTables = (): TimesTableProgress => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : {};
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return {};
    }
  };

  // Initialize state with stored progress or default
  const [timesTables, setTimesTables] =
    useState<TimesTableProgress>(getStoredTimesTables);

  // Update localStorage whenever timesTables changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(timesTables));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [timesTables]);

  // Get the progress for a specific times table, level, and type
  const getTimesTableProgress = (
    number: number,
    level: string,
    type: boolean
  ): GameProgress | undefined => {
    const tableProgress = timesTables[number];
    if (!tableProgress) return undefined;

    return type ? tableProgress.random[level] : tableProgress.linear[level];
  };

  // Update or add a new times table progress for a specific level and type
  const updateTimesTableProgress = (
    number: number,
    level: string,
    type: boolean,
    progress: GameProgress
  ) => {
    setTimesTables((prevTables) => {
      const updatedTables = { ...prevTables };

      if (!updatedTables[number]) {
        updatedTables[number] = { linear: {}, random: {} };
      }

      const tableProgress = updatedTables[number];

      if (type) {
        // Update random mode
        tableProgress.random[level] = progress;
      } else {
        // Update linear mode
        tableProgress.linear[level] = progress;
      }

      return updatedTables;
    });
  };

  // Reset all times tables progress (for example, if you want to restart)
  const resetTimesTablesProgress = () => {
    setTimesTables({});
  };

  return [
    timesTables,
    getTimesTableProgress,
    updateTimesTableProgress,
    resetTimesTablesProgress,
  ];
}