import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PiSignIn } from 'react-icons/pi'
import { IoIosPerson, IoIosLock } from 'react-icons/io'
import cherry from "../assets/images/cherry.png";
import { IoMdAlert } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { FaLock } from "react-icons/fa";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(user);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-red-500/77">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-linear-to-br from-rose-500/90 via-pink-500/90 to-red-500/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-rose-400/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <img
                src={cherry}
                alt="Pit Pika"
                className="w-12 h-12 scale-125"
              />
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Sign Up Here
              </h1>
            </div>
            <p
              ref={errRef}
              className={
                errMsg ? "text-red-400 text-sm mb-2" : "text-rose-100 text-sm"
              }
              aria-live="assertive"
            >
              {errMsg || "Sign up to get started on your Pit Pika account"}
            </p>
          </div>

          {/* Register Form */}
          <form className="space-y-6" autoComplete="off">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white mb-2"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoIosPerson className="h-5 w-5 text-rose-200" />
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none z-10">
                  {validName ? (
                    <FaCheck className="h-5 w-5 text-green-400" />
                  ) : user && !validName ? (
                    <MdCancel className="h-5 w-5 text-red-700" />
                  ) : null}
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  ref={userRef}
                  autoComplete="off"
                  autoCorrect="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  className="block w-full pl-10 pr-10 py-3 border border-rose-300/50 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-rose-200/70 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-200"
                  placeholder="Create your unique username"
                />
              </div>
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName
                    ? "text-red-300 text-xs mt-2 flex items-center gap-1"
                    : "sr-only"
                }
              >
                <IoMdAlert className="h-4 w-4" />4 to 24 characters. Must begin
                with a letter. Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-rose-200" />
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none z-10">
                  {validPwd ? (
                    <FaCheck className="h-5 w-5 text-green-400" />
                  ) : pwd && !validPwd ? (
                    <MdCancel className="h-5 w-5 text-red-700" />
                  ) : null}
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  className="block w-full pl-10 pr-10 py-3 border border-rose-300/50 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-rose-200/70 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-200"
                  placeholder="Create your unique password"
                />
              </div>
              <p
                id="pwdnote"
                className={
                  pwdFocus && pwd && !validPwd
                    ? "text-red-300 text-xs mt-2 flex items-center gap-1"
                    : "sr-only"
                }
              >
                <IoMdAlert className="h-4 w-4" />8 to 24 characters. Must
                include uppercase and lowercase letters, a number and a special
                character. Allowed special characters: !, #, $, %.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register