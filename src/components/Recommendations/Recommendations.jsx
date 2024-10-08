import React, { useContext, useEffect, useState } from 'react'
import Cards from '../Cards/Cards'
import { auth, db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { AppContext } from '../../context/AppContext';

const Recommendations = () => {

  const {allAds,setAllAds} = useContext(AppContext);
  const user = auth.currentUser;

  return (
    <div className='w-screen h-auto bg-white'>
        <div className='px-4 md:px-12 lg:px-24'>
            <h2 className='py-4 pl-2 text-sblue'>Fresh Recommendations</h2>
            <ul className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-4'>
              {user ? 
              allAds.map((ad)=>{
                if(ad.publisherId !== user.uid){
                  return <Cards key={ad.id} ad={ad} />
                }else{
                  return null;
                }
              })
              : allAds.map((ad)=>(
                <Cards key={ad.id} ad={ad} />
              ))}
            </ul>
            <div className='w-full h-auto flex justify-center items-center'>
                <button className=' py-2.5 px-2 text-sblue font-semibold border-2 border-sblue rounded-md bg-white my-6'>Load more</button>
            </div>
        </div>
    </div>
  )
}

export default Recommendations