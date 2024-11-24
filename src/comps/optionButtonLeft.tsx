import { OptionButtonProps } from "../types/types";

export default function OptionButtonLeft({
  condition,
  onClick,
  text,
}: OptionButtonProps) {
  return (
    <button
      data-condition={condition}
      className="border-2 border-r-0 border-black rounded-l-xl bg-gray-200 hover:bg-gray-300 hover:underline p-2 transition-all duration-200 data-[condition=true]:bg-sky-400"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
