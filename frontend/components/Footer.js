import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=' bg-slate-100 text-black flex items-center justify-between px-10 py-2 sticky top-full'>
      <div className='flex flex-col items-center'>
        <h1 className='text-2xl'>@Save Them, 2022</h1>
        <span className='text-xs'> All Rights Reserved</span>
      </div>
      <ul className='pr-5 text-3xl flex gap-6'>
        <li className='hover:text-primaryGradientTwo transition-colors cursor-pointer'>
          <FaGithub />
        </li>
        <li className='hover:text-primaryGradientTwo transition-colors cursor-pointer'>
          <FaTwitter />
        </li>
        <li className='hover:text-primaryGradientTwo transition-colors cursor-pointer'>
          <FaTwitter />
        </li>
        <li className='hover:text-primaryGradientTwo transition-colors cursor-pointer'>
          <FaTwitter />
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
