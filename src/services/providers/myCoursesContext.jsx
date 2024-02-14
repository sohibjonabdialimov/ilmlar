import { createContext, useState } from "react";

export const myCoursesContext = createContext();

export const MyCoursesProvider = ({children}) => {
  const [myCourses, setMyCourses] = useState([]);

  return <myCoursesContext.Provider value={{myCourses, setMyCourses}}>
    {children}
  </myCoursesContext.Provider>
}