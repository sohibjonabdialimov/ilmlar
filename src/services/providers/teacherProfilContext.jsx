import { createContext, useState } from "react";

export const teacherProfileContext = createContext();

export const TeacherProfileProvider = ({children}) => {
  const [teacherProfile, setTeacherProfile] = useState(null);

  return <teacherProfileContext.Provider value={{teacherProfile, setTeacherProfile}}>
    {children}
  </teacherProfileContext.Provider>
}