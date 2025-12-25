import React from 'react'
import woolgamesImage from "../assets/images/woolgames.png";
import Background from "./Background";
import SearchBar from './SearchBar';

const Homepage = () => {
  return (
    <>
        <div className="relative min-h-screen overflow-hidden perspective-midrange">
            <Background image={woolgamesImage} />
            <h1 className="text-mc-4 relative z-10 pt-[120px] text-center text-white transform-gpu rotate-x-12"> Jeff's Pit </h1>
            <SearchBar/>
        </div> 
    </>
  )
}

export default Homepage