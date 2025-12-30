import React from 'react'
import woolgamesImage from "../assets/images/woolgames.png";
import Background from "./Background";
import SearchBar from './SearchBar';

const Homepage = () => {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden perspective-midrange">
        <Background image={woolgamesImage} />
        <h1 className="text-mc-4 relative z-10 pt-[120px] text-center bg-linear-to-b from-rose-300 via-pink-400 to-red-300 bg-clip-text text-transparent transform-gpu rotate-x-12 drop-shadow-[0_0_20px_rgba(125,211,252,0.6)]">
          Pit Pika
        </h1>
        <SearchBar />
      </div>
    </>
  );
}

export default Homepage