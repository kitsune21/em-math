import { useState, useEffect, useCallback } from "react";

type GameProgress = {
  score: number;
  level: string;
  type: boolean;
  passed: boolean;
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

export default function useGameProgress(): {
  timesTables: TimesTableProgress;
  getTimesTableProgress: (
    number: number,
    level: string,
    type: boolean
  ) => GameProgress | undefined;
  updateTimesTableProgress: (number: number, progress: GameProgress) => void;
  resetTimesTablesProgress: () => void;
} {
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
  const getTimesTableProgress = useCallback(
    (
      number: number,
      level: string,
      type: boolean
    ): GameProgress | undefined => {
      const tableProgress = timesTables[number];
      if (!tableProgress) return undefined;

      return type ? tableProgress.random[level] : tableProgress.linear[level];
    },
    [timesTables] // Add timesTables as a dependency since it's used in the function
  );

  // Update or add a new times table progress for a specific level and type
  const updateTimesTableProgress = (number: number, progress: GameProgress) => {
    setTimesTables((prevTables) => {
      const updatedTables = { ...prevTables };

      if (!updatedTables[number]) {
        updatedTables[number] = { linear: {}, random: {} };
      }

      const tableProgress = updatedTables[number];
      if (!progress.passed) {
        return updatedTables;
      }

      if (progress.type) {
        // Update random mode
        tableProgress.random[progress.level] = progress;
      } else {
        // Update linear mode
        tableProgress.linear[progress.level] = progress;
      }

      return updatedTables;
    });
  };

  // Reset all times tables progress (for example, if you want to restart)
  const resetTimesTablesProgress = () => {
    setTimesTables({});
  };

  return {
    timesTables,
    getTimesTableProgress,
    updateTimesTableProgress,
    resetTimesTablesProgress,
  };
}
