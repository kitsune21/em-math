import { Dispatch, SetStateAction } from "react";

type PracticeButtonProps = {
  myNum: number;
  selectGame: Dispatch<SetStateAction<number>>;
};

export default function PracticeButton({
  myNum,
  selectGame,
}: PracticeButtonProps) {
  return (
    <button
      className="border-2 border-cyan-500 rounded-2xl p-4 bg-cyan-200 w-24 hover:bg-cyan-300 transition-all duration-300 hover:underline"
      onClick={() => selectGame(myNum)}
    >
      {myNum}
    </button>
  );
}
