import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineCategory } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { auth, db, deleteAd, fetchUserData } from "../components/config/firebase";
import assets from "../assets/assets";
import { arrayUnion, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { AppContext } from "../context/AppContext";


const AdDetails = () => {

  const { allAds,setAllAds,loading,setLoading} = useContext(AppContext);

  const location = useLocation();
  const { ad } = location.state || {};
  const [currImage, setCurrImage] = useState("1");
  const navigate = useNavigate();
  const publisherId = ad.publisherId;
  const [publisherData, setPublisherData] = useState(null);
  const [isUserPublisher,setIsUserPublisher] = useState(false);
  
  const user = auth.currentUser;


  useEffect(() => {
    const fetchPublisherData = async (publisherId) => {
      setLoading(true);
      const fetchedPublisherData = await fetchUserData(publisherId);
      setPublisherData(fetchedPublisherData);
      setLoading(false);
    };
    fetchPublisherData(publisherId);
  }, [publisherId]);


  useEffect(()=>{
    if(user){
      if(user.uid === publisherId ){
        setIsUserPublisher(true);
      }else{
        setIsUserPublisher(false)
      }
    }
  },[publisherId])

  const nextSlide = () => {
    if (currImage == "1") {
      setCurrImage("2");
    }
  };

  const prevSlide = () => {
    if (currImage == "2") {
      setCurrImage("1");
    }
  };

  const handleDeleteAd = async (adId)=>{
    setLoading(true);
    await deleteAd(adId);
    navigate(-1);
    setLoading(false)
  }

  const handleChatClick =  (contactNo)=>{
    if(user){
      window.open(`https://wa.me/${contactNo}?text=is it available`,'_blank');
    }else{
      navigate('/auth');
    }
  }

  const handleCallClick = (contactNo)=>{
    if(user){
      window.location.href = `tel:${contactNo}`
    }else{
      navigate('/auth');
    }
  }

  // const addChat = async ()=>{
  //   const chatsRef = collection(db,"chats")
  //   const messageRef = collection(db,"messages");

  //   try {
  //     const newMessageRef = doc(messageRef);
  //     await setDoc(newMessageRef,{
  //       createdAt: serverTimestamp(),
  //       messages:[]
  //     })

  //     await updateDoc(doc(chatsRef,user.uid),{
  //       chatsData: arrayUnion({
  //         messageId: newMessageRef.id,
  //         rId: publisherId,
  //       })
  //     })

  //     await updateDoc(doc(chatsRef,publisherId),{
  //       chatsData: arrayUnion({
  //         messageId: newMessageRef.id,
  //         rId: user.uid
  //       })
  //     })

     

  //   } catch (error) {
  //     console.error(error.message)
  //   }
  // }


  // const setChat = async(item)=>{

  //   const currentChatSnapshot = await getDoc(doc(chatsRef,user.uid));
  //   const currentChatData = currentChatSnapshot.data();
  //   const chatIndex = currentChatData.chatsData.findIndex(
  //     (c) => c.messageId == item.id
  //   )
  //   setChatData(currentChatData.chatsData[chatIndex]);


  //   const currentMessagesDoc = await getDoc(newMessageRef);
  //   const currentMessagesData = currentMessagesDoc.data();
  //   setMessages(currentMessagesData.messages);
  // }

  return (
    <div className="w-full h-auto flex relative flex-col text-sblue">
      <div className="w-full fixed  top-0 z-10 flex items-center justify-center bg-slight py-5 px-4">
        <span onClick={() => navigate(-1)} className="absolute left-4">
          <FaArrowLeft className="text-lg" />
        </span>
        <h2 className="m-auto text-sblue text-xl font-semibold">SwiftSale</h2>
      </div>

      {loading ? (
        <div className="w-full px-20 lg:px-96 h-screen flex justify-center items-center">
          <img className="object-contain" src={assets.loading} />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2 h-screen overflow-scroll py-24 px-4 lg:px-40">
          <div className="bg-black relative w-full  h-52 lg:h-[30rem]  mx-auto px-3 py-4 flex items-center justify-center ">
            <div className="w-[18rem] lg:w-[40rem] h-[11rem] lg:h-[22rem] items-center flex overflow-hidden">
              <div
                className={`flex flex-shrink-0 w-auto h-[11rem] lg:h-[22rem] transition-transform duration-500 ${currImage == "2" ? "-translate-x-[50%]" : null} `}
              >
                <div className="h-[11rem] lg:h-[22rem] w-[18rem] lg:w-[40rem] flex-shrink-0 flex-grow-0 ">
                  <img
                    className=" h-full w-full object-contain "
                    src={ad.image1}
                    alt=""
                  />
                </div>
                <div className="h-[11rem] lg:h-[22rem] w-[18rem] lg:w-[40rem] flex-shrink-0 flex-grow-0 ">
                  <img
                    className=" h-full w-full object-contain "
                    src={ad.image2}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div
              onClick={nextSlide}
              className="absolute top-[47%] right-0.5 flex justify-center items-center"
            >
              <FaChevronRight className="text-white text-2xl lg:text-6xl" />
            </div>
            <div
              onClick={prevSlide}
              className="absolute top-[47%] left-0.5 flex justify-center items-center"
            >
              <FaChevronLeft className="text-white text-2xl lg:text-6xl" />
            </div>
          </div>

          <div className="flex flex-col bg-slight rounded-md font-semibold px-3">
            <h1 className="py-2 text-2xl">{ad.title}</h1>
            <h2 className="text-xl">₹ {ad.price}</h2>
            <div className="flex w-full justify-between py-2">
              <p className="text-xs flex items-center gap-1">
                <MdOutlineCategory />
                {ad.category}
              </p>
              <p className="text-xs flex items-center gap-1">
                <IoLocationOutline />
                {ad.location}
              </p>
            </div>
          </div>

          <div className="flex flex-col bg-slight rounded-md font-semibold px-3">
            <h3>Description</h3>
            <div className="w-full bg-slate-400 h-px"></div>
            <h4 className="text-xs font-normal py-2">{ad.description}</h4>
          </div>

          <div className={`${isUserPublisher ? "hidden" : "flex justify-start px-3 gap-8 items-center bg-slight rounded-md py-2" }`}>
            <div className="h-[3rem] ">
              <img
                className="h-full w-full object-contain"
                src={assets.avatar}
                alt=""
              />
            </div>
            <h2 className="text-xl font-semibold">
              {publisherData ? publisherData.username : "username"}
            </h2>
          </div>
        </div>
      )}

      <div className={` w-full px-2 flex justify-around lg:justify-center lg:gap-3 fixed bottom-0 py-3 bg-slight z-10`}>
        { isUserPublisher ? (
          <div>
            <button onClick={()=>handleDeleteAd(ad.adsId)} className="bg-sblue px-16 lg:px-48 text-lg py-2 text-white font-semibold rounded-md">Delete AD</button>
          </div>
        )
      :(<div className="w-full px-2 flex justify-around lg:justify-center lg:gap-3 fixed bottom-0 py-3 bg-slight z-10">
         <button onClick={()=>handleChatClick(ad.contactNo)} className="bg-sblue px-16 lg:px-48 text-lg py-2 text-white font-semibold rounded-md">
          Chat
        </button>
        <button onClick={()=>handleCallClick(ad.contactNo)} className="bg-sblue px-16 lg:px-48 text-lg py-2 text-white font-semibold rounded-md">
          Call
        </button>
      </div>)}
       
      </div>
    </div>
  );
};

export default AdDetails;
