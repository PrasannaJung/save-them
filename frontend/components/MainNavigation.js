import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const MainNavigation = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(true);
  const [scrolledPast, setScrolledPast] = useState(false);

  const navToggleHandler = () => {
    setNavOpen(!navOpen);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const width = window.screen.width;
      console.log(scrollY);
      if (scrollY > 70 && width > 600) {
        setScrolledPast(true);
      } else {
        setScrolledPast(false);
      }
    });
  }, []);

  useEffect(() => {
    console.log("use effect running");
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1000) {
        console.log("MEDIUM");
        setMobileNav(false);
        setNavOpen(false);
      } else {
        setMobileNav(true);
      }
    });
  }, []);

  const router = useRouter();

  return (
    <div
      className={` flex justify-between items-center px-2 py-3 medium:py-5 medium:px-10 ${
        scrolledPast
          ? "fixed top-0 left-0 right-0 bg-[#f5f1ff] opacity-100 z-50 text-black shadow-2xl"
          : ""
      } transition-all`}
    >
      {/*
        -------------------------------------
        ------ MOBILE NAVIGATION LINKS ------
        -------------------------------------
       */}
      {navOpen ? (
        <AiOutlineClose
          onClick={navToggleHandler}
          className='z-50 sm:block medium:hidden text-2xl cursor-pointer text-black fixed'
        />
      ) : (
        <AiOutlineMenu
          onClick={navToggleHandler}
          className='sm:block medium:hidden text-2xl cursor-pointer'
        />
      )}
      {mobileNav && (
        <div
          className={`${
            navOpen ? "left-0" : "-left-1/2"
          } fixed top-0 h-full w-[50%] bg-slate-100 z-20 text-2xl ease-in duration-200 text-black `}
        >
          <ul className='flex flex-col py-32 space-y-8 px-10'>
            <li
              onClick={() => {
                setNavOpen(false);
              }}
              className={`hover:text-gray-300 border-b border-gray-300 pb-6  `}
            >
              <Link href='/'>Home</Link>
            </li>
            <li
              onClick={() => {
                setNavOpen(false);
              }}
              className={`hover:text-gray-300 border-b border-gray-300 pb-6 `}
            >
              <Link href='/about'>About</Link>
            </li>
            <li
              onClick={() => {
                setNavOpen(false);
              }}
              className={`hover:text-gray-300 border-b border-gray-300 pb-6  `}
            >
              <Link href='/collections'>Collections</Link>
            </li>
            <li
              onClick={() => {
                setNavOpen(false);
              }}
              className={`hover:text-gray-300 border-b border-gray-300 pb-6  `}
            >
              <Link href='/team'>Team</Link>
            </li>
            <li
              onClick={() => {
                setNavOpen(false);
              }}
              className={`hover:text-gray-300 border-b border-gray-300 pb-6  `}
            >
              <Link href='/dao'>Dao</Link>
            </li>
          </ul>
        </div>
      )}

      <h1 className='font-bold text-2xl md:text-4xl font-robotoSlab'>
        SaveThem
      </h1>
      {/*
        ------------------------------
        ------ LARGE NAVIGATION LINKS ------
        ------------------------------
       */}
      <nav className={`hidden sm:hidden medium:block lg:block`}>
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
          <li
            className={`relative transition-all hover:text-gray-300 ${
              router.pathname === "/dao"
                ? "before:content-[''] before:absolute before:left-0 before:top-[100%] before:h-[5px] before:w-[50%] before:rounded-tr-full before:rounded-bl-sm before:rounded-tl-sm before:rounded-br-full before:bg-gradient-to-tr from-primaryGradientOne to-primaryGradientTwo"
                : ""
            } `}
          >
            <Link href='/dao'>Dao</Link>
          </li>
        </ul>
      </nav>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default MainNavigation;
