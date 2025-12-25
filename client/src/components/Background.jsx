import React from 'react';
import "../style.css";

const Background = ({image}) => {
    return (
        <>
          <img
            src={image}
            alt=""
            decoding="async"
            className="pointer-events-none absolute inset-0 -z-50 h-full w-full object-cover object-top blur-[6px]"
          />
          <div className="pointer-events-none absolute inset-0 -z-30 bg-linear-to-b from-transparent via-transparent to-black" />
          <div className="pointer-events-none absolute inset-0 -z-30 bg-linear-to-t from-transparent via-transparent to-fc" />
          <div className="pointer-events-none absolute inset-0 -z-40 bg-black/20" />
        </>
      );
}

export default Background