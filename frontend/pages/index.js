import Head from "next/head";
import Image from "next/image";
import Hero from "../components/Hero";
import Cards from "../components/NFT/Cards";

export default function Home() {
  return (
    <div className=''>
      <div className='px-10 h-screen scroll-smooth'>
        <Hero />
      </div>
      <div id='nft-section'>
        <Cards />
      </div>
    </div>
  );
}
