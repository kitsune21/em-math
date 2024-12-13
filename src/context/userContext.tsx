import { createContext, useState } from "react";
import useUser from "../customHooks/useUser";

type User = {
  name: string;
  reward: string;
  timeBank: number;
  passOffLevel: string;
};

interface UserContextType {
  user: User | null;
  handleUserUpdate: (user: User) => void;
  spendTimeBank: (numSeconds: number) => void;
  bankTime: (numSeconds: number) => void;
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

  function bankTime(numSeconds: number) {
    if (!user) return;
    const updatedUser: User = {
      name: user?.name,
      reward: user?.reward,
      passOffLevel: user?.passOffLevel,
      timeBank: user?.timeBank + parseInt(numSeconds.toFixed(0)),
    };
    handleUserUpdate(updatedUser);
  }

  function spendTimeBank(numSeconds: number) {
    if (numSeconds <= 0 || !user) return;
    const updatedUser: User = {
      name: user.name,
      passOffLevel: user.passOffLevel,
      reward: user.reward,
      timeBank: user.timeBank - numSeconds,
    };
    handleUserUpdate(updatedUser);
  }

  return (
    <UserContext.Provider
      value={{ user, handleUserUpdate, spendTimeBank, bankTime }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };
