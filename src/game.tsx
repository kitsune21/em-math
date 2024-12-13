import { useState, useEffect, useRef, useContext } from "react";
import { GameInput, TimerModal } from "./comps";
import useGameProgress from "./customHooks/useGameProgress";
import { useParams, useNavigate } from "react-router";
import { UserContext } from "./context/userContext";

export default function Game() {
  const gameCountDown = 5;
  const [gameTimer, setGameTimer] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [seconds, setSeconds] = useState(gameCountDown);
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [rightWrongList, setRightWrongList] = useState<boolean[]>([]);
  const [shuffledMathList, setShuffledMathList] = useState<number[]>([]);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [timeBanked, setTimeBanked] = useState(0);
  const [hasUsedBank, setHasUsedBank] = useState(false);
  const { updateTimesTableProgress, getTimesTableProgress } = useGameProgress();
  const formRef = useRef(null);
  const { number, difficulty, type } = useParams();
  const navigate = useNavigate();
  if (number === undefined || difficulty === undefined || type === undefined)
    navigate("/");
  const myNum = parseInt(number!);
  const { user, bankTime } = useContext(UserContext) || {};

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
          setShowTimerModal(true);
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
    if (type === "random") {
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
    updateTimesTableProgress(myNum, {
      level: difficulty!,
      type: type === "random",
      score: tempScore,
      passed: tempRightWrongList.length === tempScore,
    });
    setScore(tempScore);
    setDisplayScore(true);
    setGameFinished(true);
    setRightWrongList(tempRightWrongList);
    const isPassed = getTimesTableProgress(
      myNum,
      difficulty!,
      type === "random"
    )?.passed;
    if (tempRightWrongList.length === tempScore && !isPassed) {
      let timeToBank = gameTimer;
      if (difficulty !== "insanity" && type !== "random") {
        timeToBank /= 2;
      }
      if (difficulty === "insanity" && !hasUsedBank) {
        timeToBank *= 2;
      }
      setTimeBanked(timeToBank);
      if (bankTime) bankTime(timeToBank);
    }
  }

  function resetCurrentGame() {
    setScore(0);
    setDisplayScore(false);
    setGameFinished(false);
    setRightWrongList([]);
    setSeconds(gameCountDown);
    setStartGame(false);
    setTimeBanked(0);
    setHasUsedBank(false);
  }

  function reset() {
    navigate("/");
  }

  function nextLevel() {
    let nextDifficulty;
    if (difficulty === "easy") {
      nextDifficulty = "med";
    } else if (difficulty === "med") {
      nextDifficulty = "hard";
    } else {
      nextDifficulty = "insanity";
    }
    resetCurrentGame();
    navigate(
      `/game/${number}/${nextDifficulty}/${
        type === "random" ? "random" : "not"
      }`
    );
  }

  function selectYes(numSeconds: number) {
    setGameTimer(numSeconds);
    setShowTimerModal(false);
    setHasUsedBank(true);
    if (!formRef.current) return;
    for (let i = 0; i < shuffledMathList.length; i++) {
      // @ts-expect-error need to fix types here
      if (!formRef.current[i].value > 0) {
        // @ts-expect-error need to fix types here
        formRef.current[i].focus();
        return;
      }
    }
  }

  function selectNo() {
    correctProblems(null);
    setShowTimerModal(false);
  }

  return (
    <section className="p-4 flex justify-center">
      <TimerModal
        key={`${myNum}-${difficulty}-${type}`}
        open={showTimerModal}
        selectYes={selectYes}
        selectNo={selectNo}
      />
      {!startGame ? (
        <p className="text-4xl text-red-700">
          {seconds > 0 ? `Game Starting in: ${seconds}...` : "Start!"}
        </p>
      ) : (
        <div className="w-max">
          {displayScore ? (
            <div className="flex flex-col gap-2">
              {score === shuffledMathList.length ? (
                <div>
                  <h1 className="text-4xl text-center text-emerald-500 py-4 animate-bounce">
                    You Cleared{" "}
                    {difficulty === "easy"
                      ? "Level 1"
                      : difficulty === "med"
                      ? "Level 2"
                      : difficulty === "hard"
                      ? "Level 3"
                      : "Insanity"}
                    !
                  </h1>
                  {user?.passOffLevel === difficulty && (
                    <h2 className="text-2xl text-center text-emerald-500 py-4">
                      You earned a {user!.reward}!
                    </h2>
                  )}
                </div>
              ) : (
                <h1 className="text-2xl text-center py-4 text-wrap">
                  Don't worry, you'll get it next time!
                </h1>
              )}
              <div className="flex justify-evenly">
                <span className="border-2 border-green-500 rounded-2xl p-2 bg-green-200">
                  Your Score: {score}/{shuffledMathList.length}{" "}
                </span>
                <span className="border-2 border-green-500 rounded-2xl p-2 bg-green-200">
                  {((score / shuffledMathList.length) * 100).toFixed(2)}%
                </span>
                <span className="border-2 border-green-500 rounded-2xl p-2 bg-green-200">
                  Time Banked: {timeBanked}
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
                {difficulty !== "insanity" && (
                  <button
                    onClick={nextLevel}
                    className="border-purple-500 border-2 bg-purple-100 p-2 rounded-lg hover:bg-purple-300 transition-all duration-300"
                  >
                    Next Level
                  </button>
                )}
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
                  Return
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </section>
  );
}
