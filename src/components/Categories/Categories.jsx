import React, { useContext } from 'react'
import { categoriesData } from '../../constants/index'
import { fetchCategory } from '../config/firebase'
import { AppContext } from '../../context/AppContext'

const Categories = () => {

    const {allAds,setAllAds, reload,setReload} = useContext(AppContext);

    const handleCategoryClick = async (categoryName) =>{
        const fetchedAds = await fetchCategory(categoryName);
        setAllAds(fetchedAds)
    }


  return (
  <>
    <div className="w-full h-auto pt-24 lg:hidden">
          <div className="flex items-center justify-between px-4 pt-3">
                <h3 className="font-normal text-base text-sblue">Browse categories</h3>
                 <a onClick={()=>setReload(!reload)} className="text-[13px] underline underline-offset-4 decoration-2 text-sblue" >See all</a>
         </div>
         <div className="w-auto h-auto flex items-center overflow-x-auto whitespace-nowrap">
            
            {categoriesData.map((category,index)=>{
                const [firstpart, ...rest] = category.item.split(' ');
                const lastpart = rest.join(' ');
                return(
                    <a onClick={()=>handleCategoryClick(category.item)} key={index} className="w-[103px] h-[100px] pt-4 flex flex-col items-center flex-shrink-0">
                        <div className='text-4xl text-sblue'>{category.postIcon}</div>
                     <p className="text-[10px] font-normal mt-2 text-center">{firstpart}{lastpart && <br/>}{lastpart}</p>
               </a>
                )})}
         </div>
    </div>

    <div className='w-screen h-auto hidden lg:flex pt-[4.3rem]'>
        <div className='flex w-screen items-center justify-evenly text-sblue bg-white border-2 border-solid border-t-slight border-b-slight border-r-0 border-l-0 py-2'>
             <div>
                <h2 onClick={()=>setReload(!reload)} className='cursor-pointer'>ALL CATEGORIES</h2>
            </div>
            {categoriesData.map((category,index)=>{
                return(
                    <a onClick={()=>handleCategoryClick(category.item)} key={index} className='hover:text-teal-200 text-sm cursor-pointer'>{category.item}</a>
                )
            })}

        </div>
    </div>
</>
  )
}

export default Categories