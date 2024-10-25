import React, { useContext, useEffect, useState } from "react";
import { IoClose, IoLocationOutline, IoMenu, IoSearch } from "react-icons/io5";
import { RiChat1Line, RiCloseLargeFill } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import Activity from "../Activity/Activity";
import { SearchBar } from "../designs/HeaderDesigns";
import { AppContext } from "../../context/AppContext";

const Header = () => {

    const {isActivityOpen,setIsActivityOpen,location,setLocation} = useContext(AppContext);

    const handleMenuClick = ()=>{
        if(isActivityOpen){
            setIsActivityOpen(false);
        }else{
            setIsActivityOpen(true);
        }
    }

    useEffect(()=>{
      setIsActivityOpen(false);
    },[])

  return (
    <div className="bg-slight w-screen h-auto fixed ">
      <div className=" w-full h-auto flex justify-between lg:justify-center items-center z-20 relative">
        <div className="flex gap-2 items-center my-2 mx-2 md:mx-5 md:my-3">
          <div onClick={handleMenuClick} className={`${isActivityOpen ? "bg-teal-100" : ""} p-2 rounded-full lg:hidden`}>
            {isActivityOpen ? (<RiCloseLargeFill className="text-2xl text-sblue"/>) : ( <IoMenu className="text-2xl text-sblue" />)}
          </div>
          <h2 className="text-sblue font-bold text-lg">SwiftSale</h2>
        </div>

        <div className={`${isActivityOpen ? 'hidden lg:flex' : 'flex'} gap-2 items-center my-2 mx-2 md:mx-5 md:my-3`}>
          <h4 className="text-sm text-sblue font-bold">{location ? location : "Location"}</h4>
          <div>
            <IoLocationOutline className="text-sblue text-lg" />
          </div>
        </div>

        <SearchBar className={`hidden lg:block py-2 mx-8 w-2/4`}/>

        <div className="hidden lg:flex items-center justify-center hover:bg-teal-100 rounded-full my-3 mx-2 px-1 py-1">
          <RiChat1Line className="text-3xl text-sblue"/>
        </div>

        <div className="hidden lg:flex items-center justify-center hover:bg-teal-100 rounded-full my-3 mx-2 px-1 py-1">
        <IoMdNotificationsOutline className="text-3xl text-sblue"/>
        </div>

        <div onClick={handleMenuClick} className="hidden lg:flex items-center justify-center rounded-full my-3 mx-2 px-1 py-1 gap-1">
        <RxAvatar className="text-3xl text-sblue"/>
        <FaChevronDown className="text-sblue "/>
        </div>
      </div>

      <SearchBar className={`lg:hidden w-full`}/>

      <Activity className={`${isActivityOpen ? "top-0 right-0 z-10 pt-14  w-screen h-screen lg:hidden" : "-top-[100vh] right-0  w-screen h-screen" }`}/>

      <Activity className={`${isActivityOpen ? "hidden lg:block z-10 pb-5  lg:top-14 lg:right-28 lg:w-[18rem] lg:h-[auto]" : "hidden" }`}/>
    </div>
  );
};

export default Header;
