import React from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { categoriesData } from '../../constants/index'

const Categories = () => {
  return (
  <>
    <div className="w-full h-auto pt-24 lg:hidden">
          <div className="flex items-center justify-between px-4 pt-3">
                <h3 className="font-normal text-base text-sblue">Browse categories</h3>
                 <a className="text-[13px] underline underline-offset-4 decoration-2 text-sblue" href="">See all</a>
         </div>
         <div className="w-auto h-auto flex items-center overflow-x-auto whitespace-nowrap">
            {categoriesData.map((category,index)=>{
                const [firstpart, ...rest] = category.item.split(' ');
                const lastpart = rest.join(' ');
                return(
                    <a key={index} className="w-[103px] h-[100px] pt-4 flex flex-col items-center flex-shrink-0" href="">
                        <div className='text-4xl text-sblue'>{category.postIcon}</div>
                     <p className="text-[10px] font-normal mt-2 text-center">{firstpart}{lastpart && <br/>}{lastpart}</p>
               </a>
                )})}
         </div>
    </div>

    <div className='w-screen h-auto hidden lg:flex pt-[4.3rem]'>
        <div className='flex w-screen items-center gap-5 bg-white border-2 border-solid border-t-slight border-b-slight border-r-0 border-l-0 py-2'>
            <div className='flex justify-between items-center gap-2 ml-16 mr-10'>
                <h3 className='text-sm font-semibold'>ALL CATEGORIES</h3>
                <FaChevronDown />
            </div>
            <a className='hover:text-teal-200 text-sm'>Cars</a>
            <a className='hover:text-teal-200 text-sm'>Motorcycles</a>
            <a className='hover:text-teal-200 text-sm'>Mobile Phones</a>
            <a className='hover:text-teal-200 text-sm'>For Sale:Houses & Apartments</a>
            <a className='hover:text-teal-200 text-sm'>Scooters</a>
            <a className='hover:text-teal-200 text-sm'>Commercial & other vehicles</a>
            <a className='hover:text-teal-200 text-sm'>For Rent:Houses & Apartments</a>
        </div>
    </div>
</>
  )
}

export default Categories