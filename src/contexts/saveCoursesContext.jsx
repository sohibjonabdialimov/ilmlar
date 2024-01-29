import { createContext, useState } from "react";

export const saveCoursesContext = createContext();

export const SaveCoursesProvider = ({children}) => {
  const [save, setSave] = useState([]);

  return <saveCoursesContext.Provider value={{save, setSave}}>
    {children}
  </saveCoursesContext.Provider>
}