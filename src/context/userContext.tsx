import { createContext, useState } from "react";
import useUser from "../customHooks/useUser";

type User = {
  name: string;
  reward: string;
  timerBoosts: number;
  passOffLevel: string;
};

interface UserContextType {
  user: User | null;
  handleUserUpdate: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user: userLocal, updateUser } = useUser();
  const [user, setUser] = useState<User | null>(userLocal);

  function handleUserUpdate(updatedUser: User) {
    updateUser(updatedUser);
    setUser(updatedUser);
  }

  return (
    <UserContext.Provider value={{ user, handleUserUpdate }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };
