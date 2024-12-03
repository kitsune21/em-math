import useLocalStorage from "./useLocalStorage";

type User = {
  name: string;
  reward: string;
  timerBoosts: number;
  passOffLevel: string;
};

export default function useUser() {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  function createUser(name: string, reward: string, passOffLevel: string) {
    setUser({ name, reward, timerBoosts: 0, passOffLevel });
  }

  return { user, createUser };
}
