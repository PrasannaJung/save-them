import React from "react";
import SingleCard from "./SingleCard";

const Cards = () => {
  return (
    <div>
      <h1 className='text-center text-5xl uppercase'>Our NFTs</h1>
      <div className='mt-24 p-10 flex gap-10 flex-wrap'>
        <SingleCard id='one' price='0.01' />
        <SingleCard id='two' price='0.02' />
        <SingleCard id='three' price='0.03' />
        <SingleCard id='four' price='0.04' />
        <SingleCard id='five' price='0.05' />
      </div>
    </div>
  );
};

export default Cards;
