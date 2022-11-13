import React from "react";
import SingleCard from "./SingleCard";
import COLLECTION from "../data";

const Cards = () => {
  return (
    <div>
      <h1 className='text-center text-5xl uppercase mt-16 medium:mt-0'>
        Our NFTs
      </h1>
      <div className='medium:mt-16 mt-6 p-10 grid gap-3 grid-cols-responsive place-items-center'>
        {COLLECTION.map(data => {
          return (
            <SingleCard
              key={data.id}
              title={"Mint"}
              id={data.id}
              price={data.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
