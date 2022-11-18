import React, { useEffect, useState } from "react";

const SingleCard = props => {
  return (
    <div className=' w-64 bg-white bg-opacity-10'>
      <img
        src={`/dog-images/${props.id}.png`}
        className='w-full h-64 object-cover'
        alt='dog image'
      />
      <div className='mt-4 pb-4'>
        <div className='px-6 flex justify-between'>
          <p>Dog</p>
          <div>
            <p className='flex justify-center gap-2 items-center'>
              <img src='/dog-images/icon-ethereum.svg' alt='' />
              <span>{props.price}</span>
            </p>
            <p>Floor price</p>
          </div>
        </div>
        <div className='px-4 mt-8'>
          <button className='px-4 py-2 bg-primaryGradientOne hover:bg-violet-500 w-full transition-colors'>
            {props.title}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
