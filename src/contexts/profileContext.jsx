import { createContext, useState } from "react";

export const profileContext = createContext();

export const ProfileProvider = ({children}) => {
  const [profile, setProfile] = useState(null);

  return <profileContext.Provider value={{profile, setProfile}}>
    {children}
  </profileContext.Provider>
}