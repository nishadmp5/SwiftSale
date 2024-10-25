import { Routes, Route, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homepage from "./pages/Homepage"
import Authentication from "./pages/Authentication"
import { useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./components/config/firebase"
import { AppContext } from "./context/AppContext"
import Post from "./pages/Post"
import Attributes from "./pages/Attributes"
import Myads from "./pages/Myads";
import { collection, getDocs } from 'firebase/firestore';
import { db, fetchUserData } from "./components/config/firebase";
import AdDetails from "./pages/AdDetails";

function App() {

  const navigate = useNavigate();
  const {setIsUserLogged,setIsActivityOpen,setUserData,allAds,setAllAds,location,setLocation,reload,setReload} = useContext(AppContext);
  const [coordinates,setCoordinates] = useState({latitude: null, longitude: null})
  const apiKey = "f39e4f862c354bf990170c93cdf5612a";
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${coordinates.latitude}%2C${coordinates.longitude}&key=${apiKey}`

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
  },[reload])


  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setCoordinates({latitude:latitude, longitude: longitude});
      },
      (error)=>{
        console.error(error.code);
      },{
        enableHighAccuracy:true,
        timeout: 10000,
        maximumAge: 0
      }
    )
    }else{
      console.error("Geolocation not supported by browser")
    }
  },[])


  useEffect(()=>{
    fetch(apiUrl).then(response => response.json()).then(data =>{
      setLocation(data.results[0].components.city);
      
    }).catch(error => console.error(error));
  },[coordinates])

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
