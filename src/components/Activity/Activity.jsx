import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import { auth, logout } from '../config/firebase';
import { RiAdvertisementLine, RiExchangeFundsLine } from 'react-icons/ri';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import { GrLanguage } from "react-icons/gr";


const Navbar = ({className}) => {

    const navigate = useNavigate();
    const {isUserLogged,setIsUserLogged} = useContext(AppContext)
    const {userData,setIsActivityOpen} = useContext(AppContext);
    const user = auth.currentUser;

    const handleLoginClick = ()=> {
        navigate('/auth')
    }

    const handleLogoutClick = ()=>{
        logout();
        navigate('/')
        setIsActivityOpen(false);

    }

  return (
        <div className={`${className ? className : ""}  bg-white absolute  transition-all duration-500 ease-in-out`}>
            <div className='flex flex-col'>
            <div className="p-5 ">
                    <div className="flex items-center  gap-4 ">
                        <div className="w-[71.40px]  h-[60px] flex justify-center items-center">
                            <img className="w-full h-full" src="https://statics.olx.in/external/base/img/avatar_empty_state.png" alt=""/>
                        </div>
                        <div className="flex flex-col">
                            {user 
                            ? <h1 className='text-xl text-sblue'>{userData.username}</h1> 
                            : <>
                            <h1 className="text-xl text-sblue">Welcome to SwiftSale</h1>
                            <p className="text-sm font-light text-gray-500">Take charge of your buying and selling journey.</p>
                            </>}
                        </div>
                    </div>
                    {user 
                    ? <button className='bg-sblue text-white w-full rounded-sm mt-5 py-2 px-3 m-auto'>View and edit profile</button>
                    : null}
                </div>
                <div className="flex text-sblue flex-col border-solid border-y border-y-neutral-300 mt-2">
                    <a onClick={()=> user ? navigate('/post') : navigate('/auth')} className="flex items-center  py-[10px] px-4 gap-2">
                         <RiExchangeFundsLine className='text-2xl'/>
                        <h2 className="font-light">Start selling</h2>
                    </a>
                    <a onClick={()=>user ? navigate('/myads') : navigate('/auth')} className="flex items-center py-[10px] px-4 gap-2">
                         <RiAdvertisementLine className='text-2xl'/>
                        <h2 className="font-light">My ADS</h2>
                    </a>
                    <a  className="flex items-center  py-[10px] px-4 gap-2">
                       <IoChatbubbleOutline className="text-2xl"/>
                        <h2 className="font-light">Chat</h2>
                    </a>
                </div>
                <div className="flex text-sblue flex-col">
                    <a  className="flex items-center  py-[10px] px-4 gap-2">
                        <IoIosHelpCircleOutline className="text-2xl" />
                        <h2 className="font-light">Help</h2>
                    </a>
                    <a  className="flex items-center py-[10px] px-4 gap-2">
                       <GrLanguage className="text-2xl" />
                        <h2 className="font-light">Select language</h2>
                    </a>
                </div>
                {!isUserLogged 
                ? <button onClick={handleLoginClick} className="flex justify-center items-center text-white text-sm bg-sblue mx-5 py-4 mt-4">Login</button>
                : <button onClick={handleLogoutClick} className="flex justify-center items-center rounded-sm text-white text-sm bg-sblue mx-5 py-4 mt-4">Logout</button>}
                
            </div>   
     </div>

  )
}

export default Navbar