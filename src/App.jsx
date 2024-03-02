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

  useEffect(() => {
    passwordGenrator();
  }, [length, isNumber, isChar]);

  const handleLength = (e) => setLength(e.target.value);

  const handleCopy = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <div className="main-container">
      <div className="container">
        <a
          href="https://github.com/isagarjaiswal/passwordgenrator"
          target="_blank"
          className="source-code"
        >
          Source Code
        </a>
        <div className="header">
          <input
            type="text"
            ref={passwordRef}
            readOnly
            value={password}
            className="password-input"
          />

          <button className="copy-button " onClick={handleCopy}>
            Copy
          </button>
        </div>
        <div className="footer">
          <div>
            <input
              onChange={handleLength}
              type="range"
              className="range-input"
              min="6"
              defaultValue={8}
              max="50"
            />
            <span>Length : {length}</span>
          </div>
          <div>
            <input
              type="checkbox"
              id="char"
              value={isChar}
              className="checkbox-input"
              onClick={(e) => setIsChar((prev) => !prev)}
            />
            <label htmlFor="char">Char</label>
            <input
              type="checkbox"
              className="checkbox-input"
              id="number"
              value={isNumber}
              onClick={(e) => setIsNumber((prev) => !prev)}
            />
            <label htmlFor="number">Number</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
