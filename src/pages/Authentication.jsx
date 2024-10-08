import React, { useContext, useState } from 'react'
import { signIn, signUp } from '../components/config/firebase';
import { AppContext } from '../context/AppContext';

const Authentication = () => {

    const [currAuthState,setCurrAuthState] = useState("Sign up");
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const {setIsActivityOpen} = useContext(AppContext)


    const onSubmitHandler = (event)=>{
        event.preventDefault();
        if(currAuthState === "Sign up"){
            signUp(username,email,password);
        }else{
            signIn(email,password);
            setIsActivityOpen(false)
        }
    }

  return (
    <div className="w-full h-screen flex justify-center lg:items-center bg-slight">
    <div className="flex flex-col h-auto items-center">
        <div className=" flex flex-col lg:flex-row gap-8 lg:gap-36 items-center">
            <div className='flex flex-col gap-3'>
                 <a href="login.html" className=" flex flex-col gap-2 items-center w-full">
                    <h1 className='text-4xl lg:text-6xl text-sblue font-bold py-4'>SwiftSale</h1>
                    <h2 className="text-center text-sblue font-normal leading-tight">Help us  become one of the safest <br/> place to buy and sell</h2>
                </a>
                <div className=" w-full flex items-center justify-center gap-4">
                    <div className=" w-[6px] h-[6px] rounded-full bg-blue-400">

                    </div>
                    <div className=" w-[6px] h-[6px] rounded-full bg-neutral-500">
                         
                    </div>
                    <div className=" w-[6px] h-[6px] rounded-full bg-neutral-500">
                         
                    </div>
                </div>
            </div>
                <form onSubmit={onSubmitHandler} className='bg-white flex flex-col gap-3 justify-center shadow-lg shadow-gray-300 rounded-md py-5 px-4 lg:px-8'>
                    <h3 className='text-sblue mx-auto lg:text-xl'>{currAuthState === "Sign up" ? "Sign up" : "Sign in"}</h3>
                    {currAuthState === "Sign up" 
                    ? <input onChange={(e)=>setUsername(e.target.value)} className=' border border-gray-300 border-solid rounded-md text-md lg:text-lg py-2 px-3 pr-10 font-medium' value={username} type="text" placeholder='username' />
                    : null }
                    
                    <input onChange={(e)=>setEmail(e.target.value)} className=' border border-gray-300 border-solid rounded-md text-md lg:text-lg py-2 px-3 pr-10 font-medium' type="email" placeholder='Email address' />
                    <input onChange={(e)=>setPassword(e.target.value)} className=' border border-gray-300 border-solid rounded-md text-md lg:text-lg py-2 px-3 pr-10 font-medium' type="password" placeholder='password' />
                    {currAuthState === "Sign up" 
                    ? <p className='text-sm mx-auto '>Already have an account? <span onClick={()=>setCurrAuthState("Sign in")} className='text-sm text-blue-600 cursor-pointer'>Sign in</span></p>
                    : <p className='text-sm mx-auto  cursor-pointer'>Create an account <span onClick={()=>setCurrAuthState("Sign up")} className='text-sm text-blue-600 cursor-pointer'>Sign up</span></p>}
                    <button type='submit' className='bg-sblue py-3 px-3 text-white'>{currAuthState === "Sign up" ? "Create an account" : "Login"}</button>
                </form>
        </div>
       

        <div className=" w-full px-auto flex justify-center mt-10 lg:mt-44">
            <div className=" flex flex-col gap-5 items-center text-center text-xs lg:text-sm">
                <h1 className=" text-gray-500">All your professeional details are safe with us</h1>
                <h1 className="  text-gray-500">If you continue, you are accepting  <span className=" text-blue-400">SwiftSale's Terms and <br/> Conditions and Privacy Policy</span> </h1>
            </div>
        </div>
       
    </div>
</div>
  )
}

export default Authentication