import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Web3Modal from "web3modal";

const MainNavigation = () => {
  const [walletConnected, setWalletConnected] = useState(false);

  const web3ModalRef = useRef();

  const [navOpen, setNavOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(true);

  const navToggleHandler = () => {
    setNavOpen(!navOpen);
  };

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

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);

      checkIfAddressInWhitelist();
      getNumberOfWhitelisted();
    } catch (err) {
      console.error(err);
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <div className={`text-white flex justify-between items-center px-10 py-6 `}>
      {navOpen ? (
        <AiOutlineClose
          onClick={navToggleHandler}
          className='z-50 sm:block medium:hidden text-2xl cursor-pointer'
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
          } fixed top-0 h-full w-[50%] bg-[#0e062a] z-20 text-2xl ease-in duration-200`}
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
          </ul>
        </div>
      )}

      <h1 className='font-bold text-4xl'>SaveThem</h1>
      <nav className='hidden sm:hidden medium:block lg:block'>
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
        className='bg-blue-500 rounded-sm py-2 px-3 font-semibold text-base'
        onClick={connectWallet}
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default MainNavigation;
