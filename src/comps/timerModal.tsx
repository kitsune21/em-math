import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";

type TimerModalProps = {
  open: boolean;
  selectYes: (numSeconds: number) => void;
  selectNo: () => void;
};

export default function TimerModal({
  open,
  selectYes,
  selectNo,
}: TimerModalProps) {
  const { user, spendTimeBank } = useContext(UserContext) || {};
  const [seconds, setSeconds] = useState(user?.timeBank);

  function handleYes() {
    if (!spendTimeBank || !user) return;
    spendTimeBank(seconds!);
    selectYes(seconds!);
  }

  return (
    <dialog
      open={open}
      className="fixed left-auto right-auto top-8 p-4 border border-cyan-500 rounded-xl bg-white"
    >
      <div>
        <p>You're so close! Do you want to use some of you time bank?</p>
        <p className="text-sm">
          (If you use some bank time and finish early, you will get all of your
          time back!)
        </p>
        <div className="flex flex-col">
          <div className="flex justify-evenly h-12 items-center">
            <input
              id="seconds-range"
              type="range"
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value))}
              min={1}
              max={user?.timeBank}
              step={1}
            />
            <label className="w-24" htmlFor="seconds-range">
              {seconds} Seconds
            </label>
          </div>
          <div className="flex justify-evenly">
            <button
              className="border border-green-500 bg-green-100 rounded-xl p-2 hover:bg-green-300 transition-all duration-300 hover:underline"
              onClick={handleYes}
            >
              Keep Going!
            </button>
            <button
              className="border border-red-900 bg-red-100 rounded-xl p-2 hover:bg-red-300 transition-all duration-300 hover:underline"
              onClick={selectNo}
            >
              Nah, I'm good.
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
