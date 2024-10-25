import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { db } from "../config/firebase";
import { AppContext } from "../../context/AppContext";

export const SearchBar = ({className}) => {

  const {allAds,setAllAds,reload,setReload} = useContext(AppContext);

  const searchInputHandler = async (e)=>{
    const input = e.target.value.trim().toLowerCase();
    try {
      if(input){
        const searchWords = input.split(' ');
        const adsRef = collection(db,"ads");
        const q = query(adsRef,where("keywords","array-contains-any",searchWords))
        const querySnapshot =await getDocs(q);
        const results = [];
        if(!querySnapshot.empty){
          querySnapshot.forEach((doc)=>{
            results.push(doc.data())
            setAllAds(results)
          })
        }else{
          setAllAds([]);
        }
       
      }else{
        setReload(!reload)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <label htmlFor="searchBar" className={`${className ? className : '' }`}>
      <div  className="border-2 border-solid border-sblue rounded-md flex items-center justify-center  py-1.5 mx-2">
        <div className="px-3">
          <IoSearch className="text-sblue text-xl" />
        </div>
        <input onChange={(e)=>searchInputHandler(e)} className="outline-none bg-slight w-full" id="searchBar" placeholder="Find Cars,Mobile Phones and more..."/>
      </div>
    </label>
  );
};


