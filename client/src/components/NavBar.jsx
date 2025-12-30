import React from 'react'
import { MdLeaderboard } from "react-icons/md";
import { PiSignIn } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { IoIosHome } from "react-icons/io";
import cherry from "../assets/images/cherry.png";
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <nav className=' fixed top-0 left-0 right-0 z-50 bg-rose-500 text-white py-2 px-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-6'>
            <Link to="/" className='group font-bold ml-4 flex items-center gap-1'>
              <img src={cherry} alt="Pit Pika" className="w-10 h-10 scale-135 group-hover:scale-150 transition-all duration-200" />
              <span className="text-2xl group-hover:text-red-400 hover:scale-105 transition-all duration-200">Pit Pika</span>
            </Link>

            <ul className='flex items-center gap-20 ml-24'>
              <li>
                <Link to="/" className='flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-rose-400/70 hover:bg-rose-400/90 text-white font-medium transition-all duration-200 hover:scale-105 transform shadow-[0_0_10px_rgba(244,63,94,0.3)] hover:shadow-[0_0_15px_rgba(244,63,94,0.5)]'>
                  <IoIosHome className='text-lg' />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/leaderboards" className='flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-rose-400/70 hover:bg-rose-400/90 text-white font-medium transition-all duration-200 hover:scale-105 transform shadow-[0_0_10px_rgba(244,63,94,0.3)] hover:shadow-[0_0_15px_rgba(244,63,94,0.5)]'>
                  <MdLeaderboard className='text-lg'/>
                  <span>Leaderboards</span>
                </Link>
                 
              </li>
            </ul>
          </div>

          <div className='flex items-center gap-2'>
            <ul className='flex items-center gap-25 mr-30'>
              <li>
                <Link to="/about" className='flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-rose-400/70 hover:bg-rose-400/90 text-white font-medium transition-all duration-200 hover:scale-105 transform shadow-[0_0_10px_rgba(244,63,94,0.3)] hover:shadow-[0_0_15px_rgba(244,63,94,0.5)]'>
                  <HiOutlineQuestionMarkCircle className='text-lg' />
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" className='flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-rose-400/70 hover:bg-rose-400/90 text-white font-medium transition-all duration-200 hover:scale-105 transform shadow-[0_0_10px_rgba(244,63,94,0.3)] hover:shadow-[0_0_15px_rgba(244,63,94,0.5)]'>
                  <IoMdSettings className='text-lg' />
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className='flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-400/70 hover:bg-rose-400/90 text-white font-medium transition-all duration-200 hover:scale-105 transform shadow-[0_0_10px_rgba(244,63,94,0.3)] hover:shadow-[0_0_15px_rgba(244,63,94,0.5)]'>
                    <PiSignIn className='text-lg' />
                    <span>Sign In</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar