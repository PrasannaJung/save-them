import React from "react";
import COLLECTION from "../components/data";
import SingleCard from "../components/NFT/SingleCard";

const CollectionsPage = () => {
  return (
    <div>
      <div className='mt-24 p-10 flex gap-10 flex-wrap'>
        {COLLECTION.map(data => {
          return (
            <SingleCard
              key={data.id}
              title={"View"}
              id={data.id}
              price={data.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CollectionsPage;
