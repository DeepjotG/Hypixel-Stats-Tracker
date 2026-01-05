import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PiSignIn } from 'react-icons/pi'
import { IoIosPerson, IoIosLock } from 'react-icons/io'
import cherry from "../assets/images/cherry.png";

const USER_REGEX = /^[a-zA-z][a-zA-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}/;


const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() =>{
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(user);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])


  return (
    <>
        <p ref={errRef} className={errMsg ? "text-red-400 text-sm" : 
        "text-rose-100 text-sm"} aria-live="assertive">{errMsg || "Sign in to your Pit Pika account"}</p>
        <h1>Sign Up Here</h1>
        <form>
            <label htmlFor='username'> 
                Username: 
            </label>

            <input
                type="text"
                id="username"
                ref={userRef}
                autoCorrect='off'
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}


            />

        </form>


    </>
  );
}

export default Register