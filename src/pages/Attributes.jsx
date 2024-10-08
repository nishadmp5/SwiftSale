import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Footer from '../components/Footer/Footer'
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useNavigate, useParams } from 'react-router-dom';
import { TbCameraPlus } from 'react-icons/tb';
import { doc, getDoc, setDoc, updateDoc, collection } from 'firebase/firestore';
import { auth, db, upload } from '../components/config/firebase';
import { toast } from 'react-toastify';



const Attributes = () => {

    const navigate = useNavigate();
    const { category } = useParams();
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [location,setLocation] = useState("");
    const [price,setPrice] = useState("");
    const [image1,setImage1] = useState(false);
    const [image2,setImage2] = useState(false);

    const postAd = async (event)=>{
      event.preventDefault();
      try {
        if(image1 && image2){
          const image1Url = await upload(image1);
          const image2Url = await upload(image2);

          const user = auth.currentUser;
          if(user){
            const adsDocRef = doc(collection(db,"ads"));
            await setDoc(adsDocRef,{
              adsId: adsDocRef.id,
              publisherId: user.uid,
              category: category,
              title: title,
              description: description,
              location: location,
              price: price,
              image1: image1Url,
              image2: image2Url
            })
          }
        }
        navigate('/');
        
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }


  return (
    <div className="w-full h-auto bg-white text-sblue">
      <div className="w-full relative flex items-center justify-center bg-slight py-5 px-4">
        <span onClick={() => navigate("/post")} className="absolute left-4">
          <FaArrowLeft className="text-lg" />
        </span>
        <h2 className="m-auto font-semibold">Post Your Ad</h2>
      </div>

      <div className='h-auto w-full lg:w-[60%] mx-auto lg:px-32 lg:border lg:border-slate-300 lg:my-20'>
        <div className='flex flex-col'>
            <div className='px-4 py-5 border-b border-solid border-gray-300'>
                <h2 className='font-semibold'>SELECTED CATEGORY : <span>{category}</span></h2>
            </div>
            <form onSubmit={(e)=>postAd(e)} className='flex flex-col gap-4 px-4'>
                <h1 className='text-lg pt-3 font-semibold'>ENTER DETAILS</h1>
                <div className='flex flex-col gap-0.5'>
                    <label htmlFor="title">Title *</label>
                    <input required onChange={(e)=>setTitle(e.target.value)} value={title} className='rounded-md px-3 py-2 border border-sblue border-solid' id='title' type="text"  />
                </div>
                <div className='flex flex-col gap-0.5'>
                    <label htmlFor="description">Description *</label>
                    <textarea required onChange={(e)=>setDescription(e.target.value)} value={description} className='rounded-md px-3 py-2 border border-sblue border-solid' id='description' type="text"  />
                </div>
                <div className='flex flex-col gap-0.5'>
                    <label htmlFor="location">Location *</label>
                    <input required onChange={(e)=>setLocation(e.target.value)} value={location} className='rounded-md px-3 py-2 border border-sblue border-solid' id='location' type="text"  />
                </div>
                <div className='flex flex-col gap-0.5'>
                    <label htmlFor="price">Price *</label>
                    <div className='rounded-md  border border-sblue flex gap-1 items-stretch border-solid'>
                        <div className='pl-2 py-2 h-full flex gap-1 items-center justify-between'>
                             <div className='text-sblue text-xs '><LiaRupeeSignSolid /></div>
                             <span className='w-px h-7 bg-sblue'></span>
                        </div>
                        <input required onChange={(e)=>setPrice(e.target.value)} value={price} className='h-full w-full py-3 outline-none px-2' id='price' type="number"  />
                    </div>
                </div>
                <div className='flex flex-col gap-0.5'>
                    <label >Upload photos *</label>
                    <div className='flex gap-2'>
                        <label className='border-2 text-sblue border-sblue border-solid flex flex-col items-center justify-center ' htmlFor="image1">
                          {image1 
                          ? <img className='w-[7rem] h-[6rem] object-contain' src={URL.createObjectURL(image1)} /> 
                          : <div className='mx-4 my-5 flex justify-center items-center flex-col'> <TbCameraPlus className='text-3xl '/> <h3>Add Photo</h3></div> }
                        </label>
                        <label className='border-2 text-sblue border-sblue border-solid flex flex-col items-center justify-center ' htmlFor="image2">
                        {image2 
                          ? <img className='w-[7rem] h-[6rem] object-contain' src={URL.createObjectURL(image2)} /> 
                          : <div className='mx-4 my-5 flex justify-center items-center flex-col'> <TbCameraPlus className='text-3xl '/> <h3>Add Photo</h3></div> }
                        </label>
                    </div>
                        <input required onChange={(e)=>setImage1(e.target.files[0])} accept='.png, .jpg, .jpeg' hidden id='image1' type="file"  />
                        <input required onChange={(e)=>setImage2(e.target.files[0])} accept='.png, .jpg, .jpeg' hidden id='image2' type="file"/>
                </div>
                <div className='flex justify-center items-center w-full py-3'>
                    <button type='submit' className='bg-slate-300 font-semibold px-24 py-3 rounded-md w-full'>Post now</button>
                </div>
            </form>
        </div>
      </div>

      <Footer/>
     
    </div>
  )
}

export default Attributes