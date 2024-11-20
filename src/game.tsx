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
  const [shuffledMathList, setShuffledMathList] = useState<number[]>([]);

  useEffect(() => {
    if (startGame) return;
    const countdownInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setStartGame(true);
        const mathList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const tempShuffledMathList: number[] = [];
        const mathListLength = mathList.length;
        for (let i = 0; i < mathListLength; i++) {
          const arrayPos = Math.floor(Math.random() * mathList.length);
          const randomNumber = mathList.splice(arrayPos, 1)[0];
          tempShuffledMathList.push(randomNumber);
        }
        setShuffledMathList(tempShuffledMathList);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [seconds, startGame]);

  function correctProblems(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let tempScore = 0;
    const tempRightWrongList = [];
    for (let i = 0; i < shuffledMathList.length; i++) {
      // @ts-expect-error need to fix types here
      if (parseInt(e.target[i].value) === shuffledMathList[i] * myNum) {
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
                Your Score: {score}/{shuffledMathList.length}{" "}
                {((score / shuffledMathList.length) * 100).toFixed(2)}%
              </p>
              <div className="flex gap-2">
                <button
                  onClick={resetCurrentGame}
                  className="border-gray-500 border-2 bg-gray-100 p-2 rounded-lg"
                >
                  Go Again?
                </button>
                <button
                  onClick={reset}
                  className="border-gray-500 border-2 bg-gray-100 p-2 rounded-lg"
                >
                  Go Back
                </button>
              </div>
            </div>
          ) : null}
          <form onSubmit={correctProblems}>
            <div className="grid grid-cols-3 gap-4 items-center py-10">
              {shuffledMathList.map((number, index) => (
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
            </div>
            <div className="flex justify-around">
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
