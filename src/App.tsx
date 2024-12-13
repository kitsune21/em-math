import { useState, useEffect, useContext } from "react";
import {
  PracticeButton,
  OptionButtonLeft,
  OptionButtonCenter,
  OptionButtonRight,
  CreateUserModal,
  UserModal,
} from "./comps";
import useGameProgress from "./customHooks/useGameProgress";
import useLocalStorage from "./customHooks/useLocalStorage";
import { useNavigate } from "react-router";
import { UserContext } from "./context/userContext";

function App() {
  const easy = "easy";
  const med = "med";
  const hard = "hard";
  const insanity = "insanity";
  const [difficulty, setDifficulty] = useLocalStorage<
    "easy" | "med" | "hard" | "insanity"
  >("difficulty", med);
  const [isRandom, setIsRandom] = useLocalStorage("isRandom", false);
  const { timesTables, getTimesTableProgress } = useGameProgress();
  const [progressArray, setProgressArray] = useState<boolean[][]>([]);
  const [showEditUser, setShowEditUser] = useState(false);
  const { user } = useContext(UserContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    const tempProgressArray = [];
    for (let i = 1; i <= 20; i++) {
      const easy = getTimesTableProgress(i, "easy", isRandom)?.passed || false;
      const med = getTimesTableProgress(i, "med", isRandom)?.passed || false;
      const hard = getTimesTableProgress(i, "hard", isRandom)?.passed || false;
      const insanity =
        getTimesTableProgress(i, "insanity", isRandom)?.passed || false;

      tempProgressArray.push([easy, med, hard, insanity]);
    }
    setProgressArray(tempProgressArray);
  }, [timesTables, isRandom, getTimesTableProgress]);

  function handleDifficulty(level: "easy" | "med" | "hard" | "insanity") {
    setDifficulty(level);
  }

  function handleGameType(type: boolean) {
    setIsRandom(type);
  }

  function handleSelectGame(number: number) {
    navigate(`game/${number}/${difficulty}/${isRandom ? "random" : "not"}`);
  }

  function handleProfileButton() {
    setShowEditUser(!showEditUser);
  }

  if (progressArray.length === 0) return;

  if (!user) return <CreateUserModal />;

  return (
    <section className="flex flex-col">
      <nav className="flex justify-end">
        <h1 className="text-2xl text-center pr-4">
          Welcome,{" "}
          <button className="underline" onClick={handleProfileButton}>
            {user.name}
          </button>
          !
        </h1>
        {showEditUser && <UserModal close={handleProfileButton} />}
      </nav>
      <div className="flex items-center p-4 flex-col">
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
              passOffLevel={user.passOffLevel}
            />
            <PracticeButton
              myNum={2}
              selectGame={() => handleSelectGame(2)}
              progress={progressArray[1]}
              passOffLevel={user.passOffLevel}
            />
            <PracticeButton
              myNum={3}
              selectGame={() => handleSelectGame(3)}
              progress={progressArray[2]}
              passOffLevel={user.passOffLevel}
            />
          </div>
          <div className="flex gap-2 justify-evenly">
            <PracticeButton
              key={4}
              myNum={4}
              selectGame={() => handleSelectGame(4)}
              progress={progressArray[3]}
              passOffLevel={user.passOffLevel}
            />
            <PracticeButton
              myNum={5}
              selectGame={() => handleSelectGame(5)}
              progress={progressArray[4]}
              passOffLevel={user.passOffLevel}
            />
            <PracticeButton
              myNum={6}
              selectGame={() => handleSelectGame(6)}
              progress={progressArray[5]}
              passOffLevel={user.passOffLevel}
            />
          </div>
          <div className="flex gap-2 justify-evenly">
            <PracticeButton
              myNum={7}
              selectGame={() => handleSelectGame(7)}
              progress={progressArray[6]}
              passOffLevel={user.passOffLevel}
            />
            <PracticeButton
              myNum={8}
              selectGame={() => handleSelectGame(8)}
              progress={progressArray[7]}
              passOffLevel={user.passOffLevel}
            />
            <PracticeButton
              myNum={9}
              selectGame={() => handleSelectGame(9)}
              progress={progressArray[8]}
              passOffLevel={user.passOffLevel}
            />
          </div>
          <div className="flex gap-2 justify-evenly">
            <PracticeButton
              myNum={10}
              selectGame={() => handleSelectGame(10)}
              progress={progressArray[9]}
              passOffLevel={user.passOffLevel}
            />
            <PracticeButton
              myNum={11}
              selectGame={() => handleSelectGame(11)}
              progress={progressArray[10]}
              passOffLevel={user.passOffLevel}
            />
            <PracticeButton
              myNum={12}
              selectGame={() => handleSelectGame(12)}
              progress={progressArray[11]}
              passOffLevel={user.passOffLevel}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-2xl py-2 underline">
              Bonus Levels
            </h2>
            <div className="flex gap-2 justify-evenly">
              <PracticeButton
                myNum={13}
                selectGame={() => handleSelectGame(13)}
                progress={progressArray[12]}
                passOffLevel={user.passOffLevel}
              />
              <PracticeButton
                myNum={14}
                selectGame={() => handleSelectGame(14)}
                progress={progressArray[13]}
                passOffLevel={user.passOffLevel}
              />
              <PracticeButton
                myNum={15}
                selectGame={() => handleSelectGame(15)}
                progress={progressArray[14]}
                passOffLevel={user.passOffLevel}
              />
            </div>
            <div className="flex gap-2 justify-evenly">
              <PracticeButton
                myNum={16}
                selectGame={() => handleSelectGame(16)}
                progress={progressArray[15]}
                passOffLevel={user.passOffLevel}
              />
              <PracticeButton
                myNum={17}
                selectGame={() => handleSelectGame(17)}
                progress={progressArray[16]}
                passOffLevel={user.passOffLevel}
              />
              <PracticeButton
                myNum={18}
                selectGame={() => handleSelectGame(18)}
                progress={progressArray[17]}
                passOffLevel={user.passOffLevel}
              />
            </div>
            <div className="flex gap-2 justify-evenly">
              <PracticeButton
                myNum={19}
                selectGame={() => handleSelectGame(19)}
                progress={progressArray[18]}
                passOffLevel={user.passOffLevel}
              />
              <PracticeButton
                myNum={20}
                selectGame={() => handleSelectGame(20)}
                progress={progressArray[19]}
                passOffLevel={user.passOffLevel}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
