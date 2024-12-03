type CreateUserModalProps = {
  createUser: (name: string, reward: string, passOffValue: string) => void;
};

export default function CreateUserModal({ createUser }: CreateUserModalProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nameInput = e.currentTarget.elements[0] as HTMLInputElement;
    const rewardInput = e.currentTarget.elements[1] as HTMLInputElement;
    const passOffSelect = e.currentTarget.elements[2] as HTMLSelectElement;
    createUser(nameInput.value, rewardInput.value, passOffSelect.value);
  }

  if (createUser === null) {
    return <div>No user creation function available</div>;
  }

  return (
    <dialog
      className="fixed top-10 py-4 border border-cyan-500 rounded-xl"
      open
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-72 px-4">
        <h1 className="text-center">Create Your Account</h1>
        <div className="flex flex-col">
          <div className="flex gap-1 items-center justify-between">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              className="border border-slate-300 rounded-lg px-2 py-0.5 outline-cyan-300 w-36"
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
          Start Your Math Journey!
        </button>
      </form>
    </dialog>
  );
}
