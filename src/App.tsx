import { useState } from "react";
import PracticeButton from "./comps/practiceButton";
import Game from "./game";

function App() {
  const [selectedGame, setSeclectedGame] = useState(0);

  function reset() {
    setSeclectedGame(0);
  }

  return (
    <section className="flex items-center py-10 flex-col">
      <h1 className="text-2xl underline">Welcome to Em Math!</h1>
      {selectedGame === 0 ? (
        <div className="flex p-4 flex-col">
          <h2 className="text-xl">
            Pick which times tables you would like to practice:
          </h2>
          <div className="flex flex-col gap-2 py-4">
            <div className="flex gap-2 justify-evenly">
              <PracticeButton myNum={1} selectGame={setSeclectedGame} />
              <PracticeButton myNum={2} selectGame={setSeclectedGame} />
              <PracticeButton myNum={3} selectGame={setSeclectedGame} />
            </div>
            <div className="flex gap-2 justify-evenly">
              <PracticeButton myNum={4} selectGame={setSeclectedGame} />
              <PracticeButton myNum={5} selectGame={setSeclectedGame} />
              <PracticeButton myNum={6} selectGame={setSeclectedGame} />
            </div>
            <div className="flex gap-2 justify-evenly">
              <PracticeButton myNum={7} selectGame={setSeclectedGame} />
              <PracticeButton myNum={8} selectGame={setSeclectedGame} />
              <PracticeButton myNum={9} selectGame={setSeclectedGame} />
            </div>
            <div className="flex gap-2 justify-evenly">
              <PracticeButton myNum={10} selectGame={setSeclectedGame} />
              <PracticeButton myNum={11} selectGame={setSeclectedGame} />
              <PracticeButton myNum={12} selectGame={setSeclectedGame} />
            </div>
          </div>
        </div>
      ) : (
        <Game myNum={selectedGame} reset={reset} />
      )}
    </section>
  );
}

export default App;
