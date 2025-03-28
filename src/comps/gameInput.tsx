type GameInputProps = {
  number: number;
  myNum: number;
  index: number;
  rightWrongList: boolean[];
  disabled: boolean;
};

export default function GameInput({
  number,
  myNum,
  index,
  rightWrongList,
  disabled,
}: GameInputProps) {
  return (
    <div className="flex justify-evenly items-center gap-1">
      <label className="w-18 text-lg" htmlFor={`number-${number}`}>
        {number} * {myNum} =
      </label>
      <input
        id={`number-${number}`}
        type="number"
        className="border border-black w-12 rounded-lg py-2 text-center data-[right=true]:border-green-500 data-[right=false]:border-rose-500 data-[right=true]:bg-green-300 data-[right=false]:bg-rose-300"
        autoFocus={!index}
        data-right={rightWrongList[index]}
        disabled={disabled}
      />
    </div>
  );
}
