import { createContext, useState } from "react";

export const studentNavbarContext = createContext();

export const StudentNavbarProvider = ({children}) => {
  const [lesson, setLesson] = useState(false);
  const [balance, setBalance] = useState(false);
  const [profile, setProfile] = useState(false);

  return <studentNavbarContext.Provider value={{lesson, setLesson, balance, setBalance, profile, setProfile}}>
    {children}
  </studentNavbarContext.Provider>
}