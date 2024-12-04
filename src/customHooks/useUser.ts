import useLocalStorage from "./useLocalStorage";

type User = {
  name: string;
  reward: string;
  timerBoosts: number;
  passOffLevel: string;
};

export default function useUser() {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  function updateUser(updatedUser: User) {
    setUser({
      name: updatedUser.name,
      reward: updatedUser.reward,
      timerBoosts: 0,
      passOffLevel: updatedUser.passOffLevel,
    });
  }

  return { user, updateUser };
}
