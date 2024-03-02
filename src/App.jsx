import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isChar, setIsChar] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const passwordRef = useRef(null);
  const passwordGenrator = useCallback(() => {
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    if (isChar) str += "!@#$%^&*";
    if (isNumber) str += "1234567890";
    let pass = "";
    for (let i = 1; i <= length; i++) {
      const ram = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(ram);
    }
    setPassword(pass);
  }, [length, isChar, isNumber, setPassword]);
  const handleLength = (e) => setLength(e.target.value);

  useEffect(() => {
    passwordGenrator();
  }, [length, isNumber, isChar]);
  const handleCopy = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <div className="main-container">
      <a href="">Source Code</a>
      <div className="container">
        <div className="header">
          <input type="text" ref={passwordRef} readOnly value={password} />
          <button onClick={handleCopy}>Copy</button>
        </div>
        <div className="footer">
          <input onChange={handleLength} type="range" min="6" max="50" />
          <span>Length :{length}</span>

          <input
            type="checkbox"
            id="char"
            value={isChar}
            onClick={(e) => setIsChar((prev) => !prev)}
          />
          <label htmlFor="char">Char</label>
          <input
            type="checkbox"
            id="number"
            value={isNumber}
            onClick={(e) => setIsNumber((prev) => !prev)}
          />
          <label htmlFor="number">Number</label>
        </div>
      </div>
    </div>
  );
};

export default App;
