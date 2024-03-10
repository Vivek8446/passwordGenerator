import { useState, useCallback,useEffect, useRef } from 'react'
import { FaClipboard } from "react-icons/fa";

// import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  //useCallback hook
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+={}[]~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password)
  },[password])

useEffect(() => {
  passwordGenerator()
}, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
    <div className='mx-6'>

      <div className="w-full max-w-md m-auto  mt-48 shadow-md rounded-lg px-4 py-3 my-8  text-orange-500 bg-gray-800 text-center">
        <h1 className='text-white text-center text-2xl'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 my-3">
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly={true}
            ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
           className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'><FaClipboard /></button>
        </div>
        <div className=" text-lg gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={38} value={length} className='cursor-pointer '
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className='text-gray-500'>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Symbols</label>
          </div>
        </div>
      </div>
    </div>
    <div className='text-white text-center inset-x-0 bottom-0 absolute mb-5'>
    Made by Vivek
    </div>
    </>
  )
}

export default App
