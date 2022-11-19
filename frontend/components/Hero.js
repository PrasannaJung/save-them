import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const Hero = () => {
  const router = useRouter();

  const pagePushHandler = () => {
    router.push("/about");
  };

  return (
    <div className='flex medium:flex-row justify-center items-center h-3/4 flex-col-reverse gap-8 medium:mt-16 mt-16'>
      <div className='text-white flex-1 relative'>
        <h1 className='text-6xl medium:text-8xl bg-gradient-to-tr from-primaryGradientOne to-primaryGradientTwo bg-clip-text text-transparent font-bold leading-none font-robotoSlab'>
          Pawsitive
        </h1>
        <h3 className='text-4xl italic bg-gradient-to-tr from-primaryGradientOne to-primaryGradientTwo bg-clip-text text-transparent font-robotoSlab'>
          They deserve better
        </h3>
        <p className='mt-8 text-xl'>
          India is the rabies capital of the world with more than 70% of the
          world cases coming from here. The idea behind the project is to raise
          funds for the Dogs to help them with hospitality, food, and shelter
          and vasectomy. To cope with with the rising population of the stray
          dogs and stop the killing of these dogs with cruelty and to rectify
          the mistakes and move ahead towards the future and controlling the
          spread of the disease.
        </p>
        <div className='buttons mt-12 flex gap-5'>
          <ScrollLink to='nft-section' smooth={true} offset={-160}>
            <button className='btn-grad font-bold medium:py-3 medium:px-6 px-3 py-3 cursor-pointer'>
              Buy Our NFTs
            </button>
          </ScrollLink>
          <button
            className='borderGrad font-bold py-2 px-3 hover:underline cursor-pointer'
            onClick={pagePushHandler}
          >
            More on us!
          </button>
        </div>
      </div>
      <div className='flex-1 flex justify-center items-center relative medium:mt-0 mt-48'>
        <img src='/lowRes.png' alt='' />
        <div className='absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient' />
        <div className='absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40' />
        <div className='absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient ' />
      </div>
    </div>
  );
};

export default Hero;
