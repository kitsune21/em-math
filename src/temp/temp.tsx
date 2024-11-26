import React, { useState } from "react";
import useTimesTables from "./useTimesTables";

const TimesTableGame: React.FC = () => {
  const [
    timesTables,
    getTimesTableProgress,
    updateTimesTableProgress,
    resetTimesTablesProgress,
  ] = useTimesTables();

  const [selectedNumber, setSelectedNumber] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState("easy");
  const [selectedType, setSelectedType] = useState(false); // false = linear, true = random
  const [score, setScore] = useState(0);

  // Handle changing the times table selection
  const handleTimesTableChange = (number: number) => {
    setSelectedNumber(number);
    const progress = getTimesTableProgress(
      number,
      selectedLevel,
      selectedType
    ) || { score: 0, level: selectedLevel, type: selectedType };
    setScore(progress.score);
  };

  // Handle changing the difficulty level
  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    const progress = getTimesTableProgress(
      selectedNumber,
      level,
      selectedType
    ) || { score: 0, level, type: selectedType };
    setScore(progress.score);
  };

  // Handle changing the game type (linear or random)
  const handleTypeChange = (type: boolean) => {
    setSelectedType(type);
    const progress = getTimesTableProgress(
      selectedNumber,
      selectedLevel,
      type
    ) || { score: 0, level: selectedLevel, type };
    setScore(progress.score);
  };

  // Handle updating the score
  const handleScoreUpdate = () => {
    const progress = getTimesTableProgress(
      selectedNumber,
      selectedLevel,
      selectedType
    ) || { score: 0, level: selectedLevel, type: selectedType };
    const updatedProgress = { ...progress, score: progress.score + 1 };
    updateTimesTableProgress(
      selectedNumber,
      selectedLevel,
      selectedType,
      updatedProgress
    );
    setScore(updatedProgress.score);
  };

  return (
    <div>
      <h1>Times Table Game</h1>

      <div>
        <label>Select Times Table:</label>
        <select
          value={selectedNumber}
          onChange={(e) => handleTimesTableChange(Number(e.target.value))}
        >
          {[...Array(12).keys()].map((i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Difficulty Level:</label>
        <select
          value={selectedLevel}
          onChange={(e) => handleLevelChange(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div>
        <label>Select Game Type:</label>
        <select
          value={selectedType ? "random" : "linear"}
          onChange={(e) => handleTypeChange(e.target.value === "random")}
        >
          <option value="linear">Linear</option>
          <option value="random">Random</option>
        </select>
      </div>

      <div>
        <p>Score: {score}</p>
        <button onClick={handleScoreUpdate}>Increase Score</button>
      </div>

      <button onClick={resetTimesTablesProgress}>Reset All Progress</button>
    </div>
  );
};

export default TimesTableGame;
