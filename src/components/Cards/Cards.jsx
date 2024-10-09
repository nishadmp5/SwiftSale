import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cards = ({ad}) => {

  const navigate = useNavigate();

  return (
    <li onClick={()=>navigate('/ad-details',{state: {ad}})} className="h-[260px] border-neutral-300 border-[1.5px] rounded-md list-none">
    <div className="p-2 h-full flex flex-col items-center justify-between" >
        <div className='h-[60%] my-1 mx-1 flex items-center justify-center'>
             <img className="max-h-full object-contain mx-auto" src={ad ? ad.image1 : "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"} alt=""/>
        </div>
        <div className="w-full h-auto leading-tight pl-2 lg:pl-4">
            <h1 className="text-[20px] font-semibold">{ad ? ad.price : null}</h1>
            <h2 className="text-[14px] font-normal mt-[2px]">{ad ? ad.description.length > 25 ? ad.description.slice(0,25)+"..." : ad.description : null}</h2>
            <h3 className="text-[12px] font-light text-gray-500 mt-[5px]">{ad ? ad.title : null }</h3>
            <h3 className="text-[10px] font-light text-gray-500 mt-[5px]">{ad ? ad.location : null }</h3>
        </div>
    </div>
</li>
  )
}

export default Cards