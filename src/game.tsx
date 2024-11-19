import { useState, useEffect } from "react";

type GameProps = {
  myNum: number;
  reset: () => void;
};

export default function Game({ myNum, reset }: GameProps) {
  const gameCountDown = 5;
  const [startGame, setStartGame] = useState(false);
  const [seconds, setSeconds] = useState(gameCountDown);
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [rightWrongList, setRightWrongList] = useState<boolean[]>([]);
  const mathList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setStartGame(true);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [seconds]);

  function correctProblems(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let tempScore = 0;
    const tempRightWrongList = [];
    for (let i = 0; i < mathList.length; i++) {
      // @ts-expect-error need to fix types here
      if (parseInt(e.target[i].value) === mathList[i] * myNum) {
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
            <div>
              <p>
                Your Score: {score}/{mathList.length}{" "}
                {((score / mathList.length) * 100).toFixed(2)}%
              </p>
              <button onClick={resetCurrentGame}>Go Again?</button>
              <button onClick={reset}>Go Back</button>
            </div>
          ) : null}
          <form
            className="flex flex-col gap-4 items-center py-10"
            onSubmit={correctProblems}
          >
            {mathList.map((number, index) => (
              <div
                key={number}
                className="flex justify-evenly items-center gap-1"
              >
                <label className="w-18 text-lg">
                  {number} * {myNum} =
                </label>
                <input
                  type="number"
                  className="border border-black w-12 rounded-lg py-2 text-center data-[right=true]:border-green-500 data-[right=false]:border-red-500 data-[right=true]:bg-green-300 data-[right=false]:bg-red-300"
                  autoFocus={!index}
                  disabled={gameFinished}
                  data-right={rightWrongList[index]}
                />
              </div>
            ))}
            <div className="flex gap-4">
              <button
                type="submit"
                className="text-2xl text-green-500 border border-green-900 bg-green-100 rounded-3xl p-8 hover:bg-green-300 transition-all duration-300"
              >
                Submit
              </button>
              <button
                type="button"
                className="text-2xl text-red-500 border border-red-900 bg-red-100 rounded-3xl p-8 hover:bg-red-300 transition-all duration-300"
                onClick={reset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
