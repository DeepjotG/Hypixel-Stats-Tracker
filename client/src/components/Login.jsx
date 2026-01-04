import React from 'react'
import { Link } from 'react-router-dom'
import { PiSignIn } from 'react-icons/pi'
import { IoIosPerson, IoIosLock } from 'react-icons/io'
import cherry from "../assets/images/cherry.png";

const Login = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-red-500/77">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-linear-to-br from-rose-500/90 via-pink-500/90 to-red-500/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-rose-400/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <img src={cherry} alt="Pit Pika" className="w-12 h-12 scale-125" />
              <h2 className="text-4xl font-bold text-white drop-shadow-lg">
                Welcome Back
              </h2>
            </div>
            <p className="text-rose-100 text-sm">Sign in to your Pit Pika account</p>
          </div>

          {/* Login Form */}
          <form className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoIosPerson className="h-5 w-5 text-rose-200" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  className="block w-full pl-10 pr-3 py-3 border border-rose-300/50 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-rose-200/70 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoIosLock className="h-5 w-5 text-rose-200" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full pl-10 pr-3 py-3 border border-rose-300/50 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-rose-200/70 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-rose-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-rose-200 hover:text-white transition-colors duration-200">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-linear-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transform hover:scale-105 transition-all duration-200"
            >
              <PiSignIn className="h-5 w-5" />
              <span>Sign In</span>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-rose-100">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-white hover:text-rose-200 transition-colors duration-200 underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login