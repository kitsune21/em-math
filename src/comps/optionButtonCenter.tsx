import { OptionButtonProps } from "../types/types";

export default function OptionButtonCenter({
  condition,
  onClick,
  text,
}: OptionButtonProps) {
  return (
    <button
      data-condition={condition}
      className="border-y-2 border-black bg-gray-200 hover:bg-gray-300 hover:underline p-2 transition-all duration-200 data-[condition=true]:bg-sky-400"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
