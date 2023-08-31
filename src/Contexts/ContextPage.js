import { createContext, useState , useContext } from "react";

const ContextPage = createContext();

export function MovieProvider({children}){
    const[navigateback,setNavigateBack]=useState(null);
return(
    <ContextPage.Provider value={{navigateback,setNavigateBack}}>
        {children}
    </ContextPage.Provider>
)
}

export const useNavigation = () => useContext(ContextPage);