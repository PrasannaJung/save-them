import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const BenefitList = () => {
  const [detailShowing, setDetailShowing] = useState(false);

  const detailToggleHandler = () => {
    setDetailShowing(prev => !prev);
  };

  return (
    <li className='bg-slate-200 text-black my-4 rounded-md overflow-hidden'>
      <div className=' flex items-center gap-3 px-6 py-3'>
        <h3 className='text-2xl'>
          Dao members get to submit proposals and vote!
        </h3>
        <button className='text-2xl' onClick={detailToggleHandler}>
          {detailShowing ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {detailShowing && (
        <div className='bg-slate-100 max-w-fit px-6 py-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          consectetur iste ex quos laudantium repellendus.
        </div>
      )}
    </li>
  );
};

export default BenefitList;
