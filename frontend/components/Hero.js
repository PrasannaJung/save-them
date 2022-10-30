import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className='flex medium:flex-row justify-center items-center h-3/4 flex-col gap-8 medium:mt-0 mt-56'>
      <div className='text-white flex-1 relative'>
        <h1 className='text-7xl medium:text-8xl bg-gradient-to-tr from-primaryGradientOne to-primaryGradientTwo bg-clip-text text-transparent font-bold leading-none'>
          SaveThem
        </h1>
        <h3 className='text-4xl italic bg-gradient-to-tr from-primaryGradientOne to-primaryGradientTwo bg-clip-text text-transparent'>
          They deserve better
        </h3>
        <p className='mt-8 text-xl'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, officia
          odit iusto alias dolores voluptatem. Lorem, ipsum dolor sit Lorem
          ipsum dolor, sit amet consectetur adipisicing
        </p>
        <div className='buttons mt-12 flex gap-5'>
          <Link href='#nft-section'>
            <button className='btn-grad font-bold py-3 px-6 cursor-pointer'>
              Buy Our NFTs
            </button>
          </Link>
          <button className='borderGrad font-bold py-2 px-3 hover:underline cursor-pointer'>
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
