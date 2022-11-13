import React from "react";
import BenefitList from "../components/BenefitList";

const DaoPage = () => {
  return (
    <main className=' mt-10'>
      <section className='text-center mb-16'>
        <div className=' max-w-3xl mx-auto mt-24'>
          <h2 className='font-bold text-3xl mb-8'>
            Join the Dao to help animals charity
          </h2>
          <p className='text-xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            rerum officia perferendis illo odit minima est amet aperiam
            consequatur error.
          </p>
        </div>
        <div className='mt-10'>
          <button className='font-bold bg-slate-200 text-black px-3 py-2 uppercase rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform'>
            Join our Dao
          </button>
        </div>
      </section>
      <section className='flex items-center justify-center flex-col mt-24'>
        <h2 className=' font-bold text-3xl'>Benefits of Joining the Dao</h2>
        <div className='my-10'>
          <ul>
            <BenefitList />
            <BenefitList />
            <BenefitList />
          </ul>
        </div>
      </section>
    </main>
  );
};

export default DaoPage;
