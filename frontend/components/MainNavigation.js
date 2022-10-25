import Link from "next/link";
import Web3Modal from "web3modal";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const MainNavigation = () => {
  const router = useRouter();

  return (
    <div className={`text-white flex justify-between items-center px-10 py-6 `}>
      <h1 className='font-bold text-4xl'>SaveThem</h1>
      <nav>
        <ul className='flex items-center text-[24px] gap-10'>
          <li
            className={`relative transition-all hover:text-gray-300 ${
              router.pathname === "/"
                ? "before:content-[''] before:absolute before:left-0 before:top-[100%] before:h-[5px] before:w-[50%] before:rounded-tr-full before:rounded-bl-sm before:rounded-tl-sm before:rounded-br-full before:bg-gradient-to-r from-primaryGradientOne to-primaryGradientTwo"
                : ""
            } `}
          >
            <Link href='/'>Home</Link>
          </li>
          <li
            className={`relative transition-all hover:text-gray-300 ${
              router.pathname === "/about"
                ? "before:content-[''] before:absolute before:left-0 before:top-[100%] before:h-[5px] before:w-[50%] before:rounded-tr-full before:rounded-bl-sm before:rounded-tl-sm before:rounded-br-full before:bg-gradient-to-tr from-primaryGradientOne to-primaryGradientTwo"
                : ""
            } `}
          >
            <Link href='/about'>About Us</Link>
          </li>
          <li
            className={`relative transition-all hover:text-gray-300 ${
              router.pathname === "/collections"
                ? "before:content-[''] before:absolute before:left-0 before:top-[100%] before:h-[5px] before:w-[50%] before:rounded-tr-full before:rounded-bl-sm before:rounded-tl-sm before:rounded-br-full before:bg-gradient-to-tr from-primaryGradientOne to-primaryGradientTwo"
                : ""
            } `}
          >
            <Link href='/collections'>My Collections</Link>
          </li>
          <li
            className={`relative transition-all hover:text-gray-300 ${
              router.pathname === "/team"
                ? "before:content-[''] before:absolute before:left-0 before:top-[100%] before:h-[5px] before:w-[50%] before:rounded-tr-full before:rounded-bl-sm before:rounded-tl-sm before:rounded-br-full before:bg-gradient-to-tr from-primaryGradientOne to-primaryGradientTwo"
                : ""
            } `}
          >
            <Link href='/team'>Team</Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={connectWallet}
        className='bg-blue-500 rounded-sm py-2 px-3 font-semibold text-base'
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default MainNavigation;
