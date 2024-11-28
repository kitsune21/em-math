import { useState, useEffect } from "react";
import {
  PracticeButton,
  OptionButtonLeft,
  OptionButtonCenter,
  OptionButtonRight,
} from "./comps";
import useGameProgress from "./customHooks/useGameProgress";
import useLocalStorage from "./customHooks/useLocalStorage";
import { useNavigate } from "react-router";

function App() {
  const easy = "easy";
  const med = "med";
  const hard = "hard";
  const insanity = "insanity";
  const [difficulty, setDifficulty] = useLocalStorage<
    "easy" | "med" | "hard" | "insanity"
  >("difficulty", med);
  const [isRandom, setIsRandom] = useLocalStorage("isRandom", false);
  const [timesTables, getTimesTableProgress] = useGameProgress();
  const [progressArray, setProgressArray] = useState<boolean[][]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempProgressArray = [];
    for (let i = 1; i <= 12; i++) {
      const easy = getTimesTableProgress(i, "easy", isRandom)?.passed || false;
      const med = getTimesTableProgress(i, "med", isRandom)?.passed || false;
      const hard = getTimesTableProgress(i, "hard", isRandom)?.passed || false;
      const insanity =
        getTimesTableProgress(i, "insanity", isRandom)?.passed || false;

      tempProgressArray.push([easy, med, hard, insanity]);
    }
    setProgressArray(tempProgressArray);
  }, [timesTables, isRandom]);

  function handleDifficulty(level: "easy" | "med" | "hard" | "insanity") {
    setDifficulty(level);
  }

  function handleGameType(type: boolean) {
    setIsRandom(type);
  }

  function handleSelectGame(number: number) {
    navigate(`game/${number}/${difficulty}/${isRandom ? "random" : "not"}`);
  }

  if (progressArray.length === 0) return;

  return (
    <section className="flex items-center py-10 flex-col">
      <div className="flex p-4 flex-col">
        <h1 className="text-2xl underline text-center">Welcome to Em Math!</h1>
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
            <PracticeButton
              myNum={1}
              selectGame={() => handleSelectGame(1)}
              progress={progressArray[0]}
            />
            <PracticeButton
              myNum={2}
              selectGame={() => handleSelectGame(2)}
              progress={progressArray[1]}
            />
            <PracticeButton
              myNum={3}
              selectGame={() => handleSelectGame(3)}
              progress={progressArray[2]}
            />
          </div>
          <div className="flex gap-2 justify-evenly">
            <PracticeButton
              key={4}
              myNum={4}
              selectGame={() => handleSelectGame(4)}
              progress={progressArray[3]}
            />
            <PracticeButton
              myNum={5}
              selectGame={() => handleSelectGame(5)}
              progress={progressArray[4]}
            />
            <PracticeButton
              myNum={6}
              selectGame={() => handleSelectGame(6)}
              progress={progressArray[5]}
            />
          </div>
          <div className="flex gap-2 justify-evenly">
            <PracticeButton
              myNum={7}
              selectGame={() => handleSelectGame(7)}
              progress={progressArray[6]}
            />
            <PracticeButton
              myNum={8}
              selectGame={() => handleSelectGame(8)}
              progress={progressArray[7]}
            />
            <PracticeButton
              myNum={9}
              selectGame={() => handleSelectGame(9)}
              progress={progressArray[8]}
            />
          </div>
          <div className="flex gap-2 justify-evenly">
            <PracticeButton
              myNum={10}
              selectGame={() => handleSelectGame(10)}
              progress={progressArray[9]}
            />
            <PracticeButton
              myNum={11}
              selectGame={() => handleSelectGame(11)}
              progress={progressArray[10]}
            />
            <PracticeButton
              myNum={12}
              selectGame={() => handleSelectGame(12)}
              progress={progressArray[11]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
