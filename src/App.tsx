import { useState } from "react";
import PracticeButton from "./comps/practiceButton";
import Game from "./game";

function App() {
  const easy = "easy";
  const med = "med";
  const hard = "hard";
  const [selectedGame, setSelectedGame] = useState(0);
  const [difficulty, setDifficulty] = useState<"easy" | "med" | "hard">(med);

  function reset() {
    setSelectedGame(0);
  }

  function handleDifficulty(level: "easy" | "med" | "hard") {
    setDifficulty(level);
  }

  return (
    <section className="flex items-center py-10 flex-col">
      {selectedGame === 0 ? (
        <div className="flex p-4 flex-col">
          <h1 className="text-2xl underline text-center">
            Welcome to Em Math!
          </h1>
          <h2 className="text-xl">
            Pick which times tables you would like to practice:
          </h2>
          <div className="flex justify-center py-4">
            <button
              data-difficulty={difficulty === easy}
              className="border-2 border-r-0 border-black rounded-l-xl bg-gray-200 hover:bg-gray-300 hover:underline p-2 transition-all duration-200 data-[difficulty=true]:bg-sky-400"
              onClick={() => handleDifficulty(easy)}
            >
              Level 1
            </button>
            <button
              data-difficulty={difficulty === med}
              className="border-y-2 border-black bg-gray-200 hover:bg-gray-300 hover:underline p-2 transition-all duration-200 data-[difficulty=true]:bg-sky-400"
              onClick={() => handleDifficulty(med)}
            >
              Level 2
            </button>
            <button
              data-difficulty={difficulty === hard}
              className="border-2 border-l-0 border-black rounded-r-xl bg-gray-200 hover:bg-gray-300 hover:underline p-2 transition-all duration-200 data-[difficulty=true]:bg-sky-400"
              onClick={() => handleDifficulty(hard)}
            >
              Level 3
            </button>
          </div>
          <div className="flex flex-col gap-2 py-4">
            <div className="flex gap-2 justify-evenly">
              <PracticeButton myNum={1} selectGame={setSelectedGame} />
              <PracticeButton myNum={2} selectGame={setSelectedGame} />
              <PracticeButton myNum={3} selectGame={setSelectedGame} />
            </div>
            <div className="flex gap-2 justify-evenly">
              <PracticeButton myNum={4} selectGame={setSelectedGame} />
              <PracticeButton myNum={5} selectGame={setSelectedGame} />
              <PracticeButton myNum={6} selectGame={setSelectedGame} />
            </div>
            <div className="flex gap-2 justify-evenly">
              <PracticeButton myNum={7} selectGame={setSelectedGame} />
              <PracticeButton myNum={8} selectGame={setSelectedGame} />
              <PracticeButton myNum={9} selectGame={setSelectedGame} />
            </div>
            <div className="flex gap-2 justify-evenly">
              <PracticeButton myNum={10} selectGame={setSelectedGame} />
              <PracticeButton myNum={11} selectGame={setSelectedGame} />
              <PracticeButton myNum={12} selectGame={setSelectedGame} />
            </div>
          </div>
        </div>
      ) : (
        <Game myNum={selectedGame} reset={reset} difficulty={difficulty} />
      )}
    </section>
  );
}

export default App;
