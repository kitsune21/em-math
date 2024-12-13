import useLocalStorage from "./useLocalStorage";

type User = {
  name: string;
  reward: string;
  timeBank: number;
  passOffLevel: string;
};

export default function useUser() {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  function updateUser(updatedUser: User) {
    setUser({
      name: updatedUser.name,
      reward: updatedUser.reward,
      timeBank: updatedUser.timeBank,
      passOffLevel: updatedUser.passOffLevel,
    });
  }

  return { user, updateUser };
}
