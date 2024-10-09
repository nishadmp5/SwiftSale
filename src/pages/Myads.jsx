import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Cards from "../components/Cards/Cards";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../components/config/firebase";
import assets from "../assets/assets";

const Myads = () => {
  const navigate = useNavigate();
  const [myAds, setMyAds] = useState(null);

  const getMyAds = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const q = await query(
          collection(db, "ads"),
          where("publisherId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const myAds = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return myAds;
      } else {
        throw new Error("No user currently logged in");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAds = async () => {
      const ads = await getMyAds();
      setMyAds(ads);
    };
    fetchAds();
  }, []);

  return (
    <div className="w-full h-auto flex flex-col">
      <div className="min-h-screen w-full">
        <div className="w-full fixed flex items-center justify-center bg-slight ">
         <div className="relative w-full h-full flex items-center justify-center bg-slight py-5 px-4">
         <span onClick={() => navigate("/")} className="absolute left-4">
            <FaArrowLeft className="text-lg" />
          </span>
          <h2 className="m-auto font-semibold lg:text-2xl">My Ads</h2>
         </div>
        </div>

          {myAds == null ? (
            <div className="w-full px-20 lg:px-96 h-screen flex justify-center items-center">
            <img className="object-contain" src={assets.loading}/>
          </div>
          ) : myAds.length > 0 ? 
          <div className="w-full flex flex-col gap-3 lg:gap-6 min-h-96 px-5 lg:px-80 pt-8 lg:pt-16 py-4 mt-12">
            {myAds.map((ad) => <Cards key={ad.id} ad={ad} />)}
          </div>
           : (
            <div className="w-full flex flex-col gap-3 lg:gap-6 min-h-96 px-5 lg:px-80 pt-8 lg:pt-16 py-4 mt-12">
            <div className=" flex flex-col lg:flex-row items-center text-sblue gap-2 lg:gap-40 mx-auto lg:py-20 lg:px-6">
              <img className="lg:w-[25rem]" src={assets.noAds} alt="" />
              <div className="flex flex-col gap-4 items-center">
                <h2 className="text-xl md:text-2xl lg:text-5xl text-center font-semibold">
                  NO ADS TO SHOW
                </h2>
                <button
                  onClick={() => navigate("/post")}
                  className="border-2 border-solid border-black rounded-full text-black font-semibold px-4 lg:px-6 py-3 mt-4"
                >
                  Start Selling
                </button>
              </div>
            </div>
            </div>
          )}
        {/* </div> */}
      </div>

      <Footer />
    </div>
  );
};

export default Myads;
