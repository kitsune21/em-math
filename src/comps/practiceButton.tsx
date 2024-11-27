import { Dispatch, SetStateAction } from "react";

type PracticeButtonProps = {
  myNum: number;
  selectGame: Dispatch<SetStateAction<number>>;
  progress: boolean[];
};

export default function PracticeButton({
  myNum,
  selectGame,
  progress,
}: PracticeButtonProps) {
  return (
    <button
      className="border-2 border-cyan-500 rounded-2xl p-4 bg-cyan-200 w-24 hover:bg-cyan-300 transition-all duration-300 hover:underline"
      onClick={() => selectGame(myNum)}
    >
      {myNum}
      <div className="flex justify-evenly">
        <div
          className="size-2 bg-white data-[progress=true]:bg-emerald-500"
          data-progress={progress[0]}
        ></div>
        <div
          className="size-2 bg-white data-[progress=true]:bg-emerald-500"
          data-progress={progress[1]}
        ></div>
        <div
          className="size-2 bg-white data-[progress=true]:bg-emerald-500"
          data-progress={progress[2]}
        ></div>
        <div
          className="size-2 bg-white data-[progress=true]:bg-emerald-500"
          data-progress={progress[3]}
        ></div>
      </div>
    </button>
  );
}
