import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length,setLength] = useState(8)
  const [numbersAllowed,setnumbersAllowed] = useState(false)
  const [charAllowed,setcharAllowed] = useState(false)

  const [password,setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass =''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(numbersAllowed) str += '1234567890'
    if(charAllowed) str += '!@#$%^&*()*+,-./:;<=>?@[]{}'

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)
  },[length,numbersAllowed,charAllowed])

  
useEffect(() => {
  generatePassword()
},[length,numbersAllowed,charAllowed])

const copyToClipboard = () => {
  window.navigator.clipboard.writeText(password)
  passwordRef.current.select()
}



  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='Generated Password' readOnly ref={passwordRef}/>
        <button onClick={copyToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={6} max={20} value={length} className='cursorz-pointer' onChange={(e) => setLength(e.target.value)} name=''/>
          <label htmlFor='length'>Length: {length}</label>
        </div>
      
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' 
          defaultChecked={numbersAllowed}
          onChange={() => {
            setnumbersAllowed((prev) => !prev)
          }}
          name=''/>
          
          <label htmlFor='number'>Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type='checkbox' 
          defaultChecked={charAllowed}
          onChange={() => {
            setcharAllowed((prev) => !prev)
          }}
          name=''/>
          
          <label htmlFor='number'>Characters</label>
        </div>
        </div>
    </div>
  )
}

export default App
