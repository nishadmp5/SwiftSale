import { createContext, useContext, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/config/firebase";

export const AppContext = createContext();

const AppContextProvider = (props)=>{

    const [isUserLogged,setIsUserLogged] = useState(null);
    const [isActivityOpen,setIsActivityOpen] = useState(false);
    const [userData,setUserData] = useState("");
    const [allAds,setAllAds] = useState([]);


   

    const value = {
        isUserLogged,setIsUserLogged,
        isActivityOpen,setIsActivityOpen,
        userData,setUserData,
        allAds,setAllAds
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider