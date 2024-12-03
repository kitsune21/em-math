import { Dispatch, SetStateAction } from "react";

type PracticeButtonProps = {
  myNum: number;
  selectGame: Dispatch<SetStateAction<number>>;
  progress: boolean[];
  passOffLevel: string;
};

export default function PracticeButton({
  myNum,
  selectGame,
  progress,
  passOffLevel,
}: PracticeButtonProps) {
  function isPassedOff() {
    if (passOffLevel === "easy" && progress[0]) {
      return true;
    } else if (passOffLevel === "med" && progress[1]) {
      return true;
    } else if (passOffLevel === "hard" && progress[2]) {
      return true;
    } else if (passOffLevel === "insanity" && progress[3]) {
      return true;
    }
    return false;
  }

  return (
    <button
      className="border-2 border-cyan-500 rounded-2xl p-4 bg-cyan-200 w-24 hover:bg-cyan-300 transition-all duration-300 hover:underline data-[passed=true]:border-emerald-500 data-[passed=true]:bg-emerald-300"
      onClick={() => selectGame(myNum)}
      data-passed={isPassedOff()}
    >
      {myNum}
      <div className="flex justify-evenly">
        <div
          className="size-2 bg-white data-[progress=true]:bg-emerald-500"
          data-progress={progress[0]}
        ></div>
        {passOffLevel === "easy" && (
          <div className="border-x border-slate-950"></div>
        )}
        <div
          className="size-2 bg-white data-[progress=true]:bg-emerald-500"
          data-progress={progress[1]}
        ></div>
        {passOffLevel === "med" && (
          <div className="border-x border-slate-950"></div>
        )}
        <div
          className="size-2 bg-white data-[progress=true]:bg-emerald-500"
          data-progress={progress[2]}
        ></div>
        {passOffLevel === "hard" && (
          <div className="border-x border-slate-950"></div>
        )}
        <div
          className="size-2 bg-white data-[progress=true]:bg-emerald-500"
          data-progress={progress[3]}
        ></div>
      </div>
    </button>
  );
}
