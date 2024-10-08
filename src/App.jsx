import { Routes, Route, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homepage from "./pages/Homepage"
import Authentication from "./pages/Authentication"
import { useContext, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./components/config/firebase"
import { AppContext } from "./context/AppContext"
import Post from "./pages/Post"
import Attributes from "./pages/Attributes"
import Myads from "./pages/Myads";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "./components/config/firebase";
import AdDetails from "./pages/AdDetails";

function App() {

  const navigate = useNavigate();
  const {setIsUserLogged,setIsActivityOpen,fetchUserData,setUserData,allAds,setAllAds} = useContext(AppContext);

  useEffect(()=>{
    onAuthStateChanged(auth,async (user)=>{
      if(user){
        navigate('/')
        setIsUserLogged(true);
        setIsActivityOpen(false);
        const userData = await fetchUserData(user.uid);
        setUserData(userData);
      }else{
        setIsUserLogged(false);
        setUserData("");
      }
    })
  },[])

  useEffect(()=>{
    const fetchAllAds = async ()=>{
      const collectionRef = collection(db,"ads");
      const querySnapshot = await getDocs(collectionRef);
      const docs = querySnapshot.docs.map((doc)=> ({id:doc.id, ...doc.data()}));
      setAllAds(docs);
    }
    fetchAllAds();
  },[])

  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/auth" element={<Authentication/>}/>
      <Route path="/post" element={<Post/>}/>
      <Route path="/post/attributes/:category" element={<Attributes/>}/>
      <Route path="/myads" element={<Myads/>}/>
      <Route path="/ad-details" element={<AdDetails/>}/>
    </Routes>
    </>
  )
}

export default App
