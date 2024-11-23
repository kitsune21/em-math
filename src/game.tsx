import { useState, useEffect, useRef } from "react";

type GameProps = {
  myNum: number;
  reset: () => void;
  difficulty: 'easy' | 'med' | 'hard';
};

export default function Game({ myNum, reset, difficulty }: GameProps) {
  const gameCountDown = 5;
  const [gameTimer, setGameTimer] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [seconds, setSeconds] = useState(gameCountDown);
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [rightWrongList, setRightWrongList] = useState<boolean[]>([]);
  const [shuffledMathList, setShuffledMathList] = useState<number[]>([]);
  const formRef = useRef(null);

  useEffect(() => {
    if(gameFinished) return;
    const countdownInterval = setInterval(() => {
      if (startGame) {
        if(gameTimer > 0 && !gameFinished) {
          setGameTimer(gameTimer - 1);
          return;
        } else {
          correctProblems(null);
          return;
        }
      }
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setStartGame(true);
        setGameTimer(difficulty === 'easy' ? 60 : difficulty === 'med' ? 45 : 30);
        const mathList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        const splicePoint = difficulty === 'easy' ? 11 : difficulty === 'med' ? 13 : mathList.length + 1;
        const mathListActual = mathList.slice(0, splicePoint)
        const tempShuffledMathList: number[] = [];
        const mathListLength = mathListActual.length;
        for (let i = 0; i < mathListLength; i++) {
          const arrayPos = Math.floor(Math.random() * mathListActual.length);
          const randomNumber = mathListActual.splice(arrayPos, 1)[0];
          tempShuffledMathList.push(randomNumber);
        }
        setShuffledMathList(tempShuffledMathList);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [seconds, startGame, difficulty, gameTimer, gameFinished]);

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
                <span className="border-2 border-green-500 rounded-2xl p-2 bg-green-200">Your Score: {score}/{shuffledMathList.length}{" "}</span>
                <span className="border-2 border-green-500 rounded-2xl p-2 bg-green-200">{((score / shuffledMathList.length) * 100).toFixed(2)}%</span>
                <span className="border-2 border-green-500 rounded-2xl p-2 bg-green-200">Time Left: {gameTimer}</span>
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
            {
              startGame && !gameFinished && <p className="text-center text-2xl">Time: {gameTimer}</p>
            }
            <div className="grid grid-cols-3 gap-4 items-center py-10">
              {shuffledMathList.map((number, index) => (
                <div
                  key={number}
                  className="flex justify-evenly items-center gap-1"
                >
                  <label className="w-18 text-lg" htmlFor={`number-${number}`}>
                    {number} * {myNum} =
                  </label>
                  <input
                    id={`number-${number}`}
                    type="number"
                    className="border border-black w-12 rounded-lg py-2 text-center data-[right=true]:border-green-500 data-[right=false]:border-rose-500 data-[right=true]:bg-green-300 data-[right=false]:bg-rose-300"
                    autoFocus={!index}
                    disabled={gameFinished}
                    data-right={rightWrongList[index]}
                  />
                </div>
              ))}
            </div>
            {
              !gameFinished && startGame &&
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
            }
          </form>
        </div>
      )}
    </div>
  );
}
