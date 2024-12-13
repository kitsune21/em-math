import { useContext } from "react";
import { UserContext } from "../context/userContext";

type UserModalProps = {
  close: () => void;
};

export default function UserModal({ close }: UserModalProps) {
  const { user, handleUserUpdate } = useContext(UserContext) || {};

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (user && handleUserUpdate) {
      e.preventDefault();
      const nameInput = e.currentTarget.elements[0] as HTMLInputElement;
      const rewardInput = e.currentTarget.elements[1] as HTMLInputElement;
      const passOffSelect = e.currentTarget.elements[2] as HTMLSelectElement;
      const updatedUser = {
        name: nameInput.value,
        reward: rewardInput.value,
        passOffLevel: passOffSelect.value,
        timeBank: user.timeBank,
      };
      handleUserUpdate(updatedUser);
      close();
    }
  }

  return (
    <div className="fixed top-10 right-2 py-4 border border-cyan-500 rounded-xl bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-72 px-4">
        <h1 className="text-center">Update Your Account</h1>
        <div className="flex flex-col">
          <div className="flex gap-1 items-center justify-between">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              className="border border-slate-300 rounded-lg px-2 py-0.5 outline-cyan-300 w-36"
              defaultValue={user?.name}
            />
          </div>
          <p className="text-slate-600 text-sm">
            This can be whatever name you want.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-1 items-center justify-between">
            <label htmlFor="reward">Reward:</label>
            <input
              id="reward"
              className="border border-slate-300 rounded-lg px-2 py-0.5 outline-cyan-300 w-36"
              defaultValue={user?.reward}
            />
          </div>
          <p className="text-slate-600 text-sm">
            What do you get for passing off a times table?
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-1 items-center justify-between">
            <label htmlFor="passOffLevel">Pass Off Level:</label>
            <select
              id="passOffLevel"
              className="border border-slate-300 rounded-lg px-2 py-0.5 outline-cyan-300 w-36"
              defaultValue={user?.passOffLevel}
            >
              <option value="easy">Level 1</option>
              <option value="med">Level 2</option>
              <option value="hard">Level 3</option>
              <option value="insanity">Insanity</option>
            </select>
          </div>
          <p className="text-slate-600 text-sm">
            At what point is a reward earned?
          </p>
        </div>
        <button
          type="submit"
          className="border border-cyan-500 rounded-lg px-2 py-0.5 hover:bg-cyan-200 transition-all duration-300 "
        >
          Save Your Account
        </button>
      </form>
    </div>
  );
}
