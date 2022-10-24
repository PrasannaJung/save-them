import React from "react";
import SingleCard from "./SingleCard";
import COLLECTION from "../data";

const Cards = () => {
  return (
    <div>
      <h1 className='text-center text-5xl uppercase'>Our NFTs</h1>
      <div className='mt-24 p-10 grid gap-3 grid-cols-responsive'>
        {COLLECTION.map(data => {
          return <SingleCard title={"Mint"} id={data.id} price={data.price} />;
        })}
      </div>
    </div>
  );
};

export default Cards;
