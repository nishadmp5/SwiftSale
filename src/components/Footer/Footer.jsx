import React from 'react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6";

const Footer = ({className}) => {
  return (
    <div className={`bg-sblue ${className ? className : ''} w-full h-auto flex justify-center items-center flex-col text-slight`}>
        <h2 className='text-sm py-2'>Follow us on</h2>
        <div className='flex items-center justify-between gap-2'>
            <a className='text-xl' href=""><FaFacebookF /></a>
            <a className='text-xl' href=""><FaInstagram /></a>
            <a className='text-xl' href=""><FaXTwitter /></a>
        </div>
        <h1 className='text-slight text-2xl font-bold pt-3'>SwiftSale</h1>
        <h2 className='text-xs pb-2'>©{new Date().getFullYear()} All rights reserved.</h2>
    </div>
  )
}

export default Footer