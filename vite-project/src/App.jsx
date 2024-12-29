import { useEffect, useState, useCallback, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeChars, setIncludeChars] = useState(false);
  const passwordRef = useRef(null);

  const copyToClipboard = () => {
    alert("Password copied to clipboard");
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  };

  const generatePassword = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQESTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "01234567890123456789";
    let special = "!@#$%^&*()_+";

    if (includeChars) str += special;
    if (includeNumbers) str += numbers;

    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(random);
    }

    setPassword(password);
  }, [includeNumbers, includeChars, length]);

  useEffect(generatePassword, [includeNumbers, includeChars, length]);

  return (
    <div className="flex w-full flex-col mr-32 items-center p-8 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">
        🔑 Random Password Generator
      </h1>
      <div className="bg-slate-400 p-6 rounded-lg shadow-lg w-96">
        <div className="mb-4 text-xl font-normal">
          <label className="block font-semibold mb-1">
            Password Length: {length}
          </label>
          <input
            type="range"
            min={6}
            max={18}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="mb-4 text-xl">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="includeNumbers"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="mr-2"
            />
            Include Numbers
          </label>
        </div>
        <div className="mb-4 text-xl">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="includeChars"
              onChange={() => setIncludeChars(!includeChars)}
              className="mr-2"
            />
            Include Characters
          </label>
        </div>

          <input type="text" value={password} readOnly className= "bg-gray-700 mt-8  rounded-md w-full p-3 text-center text-white text-2xl break-all" ref={passwordRef}>
           
          </input>
        {/* </div> */}
        <button
          onClick={copyToClipboard}
          className="w-full bg-blue-500 text-white py-2 mt-8 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Copy
        </button>
      </div>
    </div>
  );
}
export default App;
