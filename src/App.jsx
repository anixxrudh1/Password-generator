import { useState ,useCallback, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const[numberallowed, setNumberallowed] = useState(false);
  const [charactersallowed, setCharactersallowed] = useState(false);
  const[Password, setPassword] = useState("")
  const passwordRef = useRef(null);

  const generatePassword = useCallback(()=>{
    let pass="";
    let string="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numberallowed){
      string+="0123456789";
    }
    if(charactersallowed){
      string+="!@#$%^&*()_+~`|}{[]:;?><,./-=";
    }

    for(let i=0;i<length;i++){
      let char =Math.floor(Math.random()*string.length);
      pass+=string.charAt(char);
    }
    setPassword(pass);


  } ,[length,numberallowed,charactersallowed])

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(Password);
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4'>
      <div className='max-w-md w-full rounded-2xl px-8 py-8 text-white bg-gradient-to-br from-slate-700 to-slate-800 shadow-2xl border border-slate-600'>
        
        <h1 className='text-4xl font-bold text-center py-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
          Password Generator
        </h1>

        {/* Password Display & Copy */}
        <div className='flex gap-2 mb-6'>
          <input 
            type="text"
            readOnly 
            ref={passwordRef}
            value={Password}
            placeholder='Click Generate to create password'
            className='bg-slate-900 w-full text-center text-xl rounded-lg py-3 border-2 border-slate-600 focus:border-blue-500 focus:outline-none text-cyan-300 font-mono'
          />
          <button 
            onClick={copyPasswordToClipboard}
            className='bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-lg shrink-0 hover:from-blue-600 hover:to-blue-700 cursor-pointer font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105'
          >
            Copy
          </button>
        </div>

        {/* Options Section */}
        <div className='bg-slate-900 rounded-lg p-5 mb-6 border border-slate-600'>
          <h2 className='text-sm font-bold text-slate-300 uppercase tracking-wider mb-4'>Options</h2>
          
          {/* Length Slider */}
          <div className='mb-5'>
            <div className='flex justify-between items-center mb-3'>
              <label className='text-sm font-semibold text-slate-200'>Password Length</label>
              <span className='text-2xl font-bold text-cyan-400'>{length}</span>
            </div>
            <input 
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className='w-full h-2 bg-slate-700 rounded-lg cursor-pointer appearance-none accent-blue-500'
            />
            <div className='flex justify-between text-xs text-slate-400 mt-2'>
              <span>6</span>
              <span>100</span>
            </div>
          </div>

          {/* Checkboxes */}
          <div className='space-y-3'>
            <label className='flex items-center gap-3 cursor-pointer group'>
              <input 
                type="checkbox"
                id="numbers"
                defaultChecked={numberallowed}
                onChange={() => setNumberallowed(!numberallowed)}
                className='w-5 h-5 rounded cursor-pointer accent-blue-500'
              />
              <span className='text-sm font-medium text-slate-200 group-hover:text-blue-300 transition-colors'>Include Numbers (0-9)</span>
            </label>

            <label className='flex items-center gap-3 cursor-pointer group'>
              <input 
                type="checkbox"
                id="characters"
                defaultChecked={charactersallowed}
                onChange={() => setCharactersallowed(!charactersallowed)}
                className='w-5 h-5 rounded cursor-pointer accent-blue-500'
              />
              <span className='text-sm font-medium text-slate-200 group-hover:text-blue-300 transition-colors'>Include Special Characters (!@#$%)</span>
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <button 
          onClick={generatePassword}
          className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg hover:from-green-600 hover:to-emerald-700 cursor-pointer font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 uppercase tracking-wide'
        >
          ⚡ Generate Password
        </button>
      </div>
    </div>
  ) 
}

export default App
