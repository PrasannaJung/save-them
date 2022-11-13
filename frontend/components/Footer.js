import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=' bg-[#251d45] text-white flex items-center justify-between flex-col gap-6 medium:flex-row px-10 py-2 sticky top-full'>
      <div className='flex flex-col items-center'>
        <h1 className='text-2xl font-bold'>@Save Them, 2022</h1>
        <span className='text-xs font-semibold'> All Rights Reserved</span>
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
