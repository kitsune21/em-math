import { useState, useEffect, useRef } from "react";
import { GameInput } from "./comps";
import useLocalStorage from "./customHooks/useLocalStorage";

type GameProps = {
  myNum: number;
  reset: () => void;
  difficulty: "easy" | "med" | "hard" | "insanity";
  type: boolean;
};

type GameProgress = {
  number: number;
  score: number;
  level: string;
  type: boolean;
};

export default function Game({ myNum, reset, difficulty, type }: GameProps) {
  const gameCountDown = 5;
  const [gameTimer, setGameTimer] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [seconds, setSeconds] = useState(gameCountDown);
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [rightWrongList, setRightWrongList] = useState<boolean[]>([]);
  const [shuffledMathList, setShuffledMathList] = useState<number[]>([]);
  const [, setGameProgress] = useLocalStorage<GameProgress>(
    `${myNum}-${difficulty}-${type}-game`,
    { number: myNum, score: 0, level: difficulty, type: type }
  );
  const formRef = useRef(null);

  useEffect(() => {
    if (startGame) return;
    if (seconds <= 0) startTheGameAlready();
    const countdownInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [seconds, startGame]);

  useEffect(() => {
    if (gameFinished) return;
    const countdownInterval = setInterval(() => {
      if (startGame) {
        if (gameTimer > 0 && !gameFinished) {
          setGameTimer(gameTimer - 1);
          return;
        } else {
          correctProblems(null);
          return;
        }
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [startGame, gameTimer, gameFinished]);

  function startTheGameAlready() {
    setStartGame(true);
    setGameTimer(
      difficulty === "easy"
        ? 60
        : difficulty === "med"
        ? 45
        : difficulty === "hard"
        ? 30
        : 25
    );
    const mathList = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];
    const splicePoint =
      difficulty === "easy"
        ? 12
        : difficulty === "med"
        ? 14
        : difficulty === "hard"
        ? 16
        : mathList.length + 1;
    const mathListActual = mathList.slice(0, splicePoint);
    const mathListLength = mathListActual.length;
    const tempMathList = [];
    if (type) {
      for (let i = 0; i < mathListLength; i++) {
        const arrayPos = Math.floor(Math.random() * mathListActual.length);
        const newNumber = mathListActual.splice(arrayPos, 1)[0];
        tempMathList.push(newNumber);
      }
    } else {
      for (let i = 0; i < mathListLength; i++) {
        tempMathList.push(mathList[i]);
      }
    }
    setShuffledMathList(tempMathList);
  }

  function correctProblems(e: React.FormEvent<HTMLFormElement> | null) {
    if (e) e.preventDefault();
    if (formRef.current === null) return;
    let tempScore = 0;
    const tempRightWrongList = [];
    for (let i = 0; i < shuffledMathList.length; i++) {
      // @ts-expect-error need to fix types here
      if (parseInt(formRef.current[i].value) === shuffledMathList[i] * myNum) {
        tempScore += 1;
        tempRightWrongList.push(true);
      } else {
        tempRightWrongList.push(false);
      }
    }
    const gameProgress: GameProgress = {
      number: myNum,
      score: tempScore,
      level: difficulty,
      type: type,
    };
    setGameProgress(gameProgress);
    setScore(tempScore);
    setDisplayScore(true);
    setGameFinished(true);
    setRightWrongList(tempRightWrongList);
  }

  function resetCurrentGame() {
    setScore(0);
    setDisplayScore(false);
    setGameFinished(false);
    setRightWrongList([]);
    setSeconds(gameCountDown);
    setStartGame(false);
  }

  return (
    <div>
      {!startGame ? (
        <p className="text-4xl text-red-700">
          {seconds > 0 ? `Game Starting in: ${seconds}...` : "Start!"}
        </p>
      ) : (
        <div>
          {displayScore ? (
            <div className="flex flex-col gap-2">
              <div className="flex justify-evenly">
                <span className="border-2 border-green-500 rounded-2xl p-2 bg-green-200">
                  Your Score: {score}/{shuffledMathList.length}{" "}
                </span>
                <span className="border-2 border-green-500 rounded-2xl p-2 bg-green-200">
                  {((score / shuffledMathList.length) * 100).toFixed(2)}%
                </span>
                <span className="border-2 border-green-500 rounded-2xl p-2 bg-green-200">
                  Time Left: {gameTimer}
                </span>
              </div>
              <div className="flex justify-around">
                <button
                  onClick={resetCurrentGame}
                  className="border-purple-500 border-2 bg-purple-100 p-2 rounded-lg hover:bg-purple-300 transition-all duration-300"
                >
                  Go Again?
                </button>
                <button
                  onClick={reset}
                  className="border-purple-500 border-2 bg-purple-100 p-2 rounded-lg hover:bg-purple-300 transition-all duration-300"
                >
                  Go Back
                </button>
              </div>
            </div>
          ) : null}
          <form onSubmit={correctProblems} ref={formRef}>
            {startGame && !gameFinished && (
              <p className="text-center text-2xl">Time: {gameTimer}</p>
            )}
            <div className="grid grid-cols-3 gap-4 items-center py-10">
              {shuffledMathList.map((number, index) => (
                <GameInput
                  key={number}
                  number={number}
                  myNum={myNum}
                  index={index}
                  gameFinished={gameFinished}
                  rightWrongList={rightWrongList}
                />
              ))}
            </div>
            {!gameFinished && startGame && (
              <div className="flex justify-around">
                <button
                  type="submit"
                  className="text-2xl border border-green-500 bg-green-100 rounded-3xl p-8 hover:bg-green-300 transition-all duration-300 hover:underline"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="text-2xl border border-red-900 bg-red-100 rounded-3xl p-8 hover:bg-red-300 transition-all duration-300 hover:underline"
                  onClick={reset}
                >
                  Reset
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
