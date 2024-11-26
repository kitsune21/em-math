import { useState, useEffect } from "react";

/**
 * Custom hook to manage localStorage with a default value fallback.
 *
 * @param {string} key - The key to store/retrieve from localStorage.
 * @param {T} defaultValue - The default value to return if the item doesn't exist in localStorage.
 *
 * @returns {Array} - The current value stored in localStorage and a setter function.
 */
export default function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Retrieve the stored value or fall back to the default value
  const getStoredValue = (): T => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return defaultValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Update localStorage whenever the stored value changes
  useEffect(() => {
    if (storedValue !== undefined) {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
