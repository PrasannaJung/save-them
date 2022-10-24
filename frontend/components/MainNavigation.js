import Link from "next/link";
import Web3Modal from "web3modal";
import { Contract, ethers, providers, utils } from "ethers";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const MainNavigation = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();
  const router = useRouter();

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Please change the network to the Goerli!!!!");
      throw new error("Please change the network to the Goerli!!!!");
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      console.log("Hello World");
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef = new Web3Modal({
        network: "goerli", // For us we will need to changes it to Mumbai.
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

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
