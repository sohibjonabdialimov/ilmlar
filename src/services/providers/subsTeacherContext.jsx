import { createContext, useState } from "react";

export const subsTeacherContext = createContext();

export const SubsTeacherProvider = ({children}) => {
  const [subsTeacher, setSubsTeacher] = useState(null);

  return <subsTeacherContext.Provider value={{subsTeacher, setSubsTeacher}}>
    {children}
  </subsTeacherContext.Provider>
}