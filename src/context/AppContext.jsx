import { createContext, useContext, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/config/firebase";

export const AppContext = createContext();

const AppContextProvider = (props)=>{

    const [isUserLogged,setIsUserLogged] = useState(null);
    const [isActivityOpen,setIsActivityOpen] = useState(false);
    const [userData,setUserData] = useState("");
    const [allAds,setAllAds] = useState([]);


    const fetchUserData = async (userId)=>{
        try {
            const docRef = doc(db,"users",userId);
            const userDoc = await getDoc(docRef)
            if(userDoc.exists()){
                const userData = userDoc.data();
                return userData ;
            }else{
                console.log("No such user");
            }
        } catch (error) {
            console.error("Error fetching user data",error)
        }
    }

    const value = {
        isUserLogged,setIsUserLogged,
        isActivityOpen,setIsActivityOpen,
        userData,setUserData,
        fetchUserData,
        allAds,setAllAds
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider