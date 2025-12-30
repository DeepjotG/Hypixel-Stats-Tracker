import React from 'react'
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <>
      <form className="relative z-10 flex justify-center -mt-[100px]">
        <div className="relative w-[47%]">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-pink-200/90 text-lg z-20" />
          <input
            type="search"
            className="    
            w-full h-11 pl-10 pr-3
            rounded-lg
            bg-rose-400/30 backdrop-blur-md
            border-2 border-rose-400/70
            text-white placeholder-pink-100/80
            outline-none
            shadow-[0_0_15px_rgba(244,63,94,0.4)]
            transition-all duration-300
            focus:border-pink-200/50 focus:bg-pink-200/20 focus:shadow-[0_0_25px_rgba(251,207,232,0.3)]"
            placeholder="Enter player username..."
          />
        </div>
      </form>
    </>
  );
};

export default SearchBar