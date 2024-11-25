import { useState } from "react";
import {
  PracticeButton,
  OptionButtonLeft,
  OptionButtonCenter,
  OptionButtonRight,
} from "./comps";
import Game from "./game";

function App() {
  const easy = "easy";
  const med = "med";
  const hard = "hard";
  const insanity = "insanity";
  const [selectedGame, setSelectedGame] = useState(0);
  const [difficulty, setDifficulty] = useState<
    "easy" | "med" | "hard" | "insanity"
  >(med);
  const [isRandom, setIsRandom] = useState(false);

  function reset() {
    setSelectedGame(0);
  }

  function handleDifficulty(level: "easy" | "med" | "hard" | "insanity") {
    setDifficulty(level);
  }

  function handleGameType(type: boolean) {
    setIsRandom(type);
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
            <OptionButtonLeft
              condition={!isRandom}
              onClick={() => handleGameType(false)}
              text="Linear"
            />
            <OptionButtonRight
              condition={isRandom}
              onClick={() => handleGameType(true)}
              text="Random"
            />
          </div>
          <div className="flex justify-center py-4">
            <OptionButtonLeft
              condition={difficulty === easy}
              onClick={() => handleDifficulty(easy)}
              text="Level 1"
            />
            <OptionButtonCenter
              condition={difficulty === med}
              onClick={() => handleDifficulty(med)}
              text="Level 2"
            />
            <OptionButtonCenter
              condition={difficulty === hard}
              onClick={() => handleDifficulty(hard)}
              text="Level 3"
            />
            <OptionButtonRight
              condition={difficulty === insanity}
              onClick={() => handleDifficulty(insanity)}
              text="Insanity"
            />
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
        <Game
          myNum={selectedGame}
          reset={reset}
          difficulty={difficulty}
          type={isRandom}
        />
      )}
    </section>
  );
}

export default App;
