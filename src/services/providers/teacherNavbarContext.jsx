import { createContext, useState } from "react";

export const teacherNavbarContext = createContext();

export const TeacherNavbarProvider = ({children}) => {
  const [lesson, setLesson] = useState(false);
  const [balance, setBalance] = useState(false);
  const [download, setDownload] = useState(false);
  const [profile, setProfile] = useState(false);

  return <teacherNavbarContext.Provider value={{lesson, setLesson, balance, setBalance, profile, setProfile, download, setDownload}}>
    {children}
  </teacherNavbarContext.Provider>
}