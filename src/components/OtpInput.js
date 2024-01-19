import React, { useState, useEffect, useRef } from "react";
import "../App.css";

function OtpInput({ length = 4, onOtpSubmit = () => {} }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleInputCahnge = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    //submit trigger
    const combineOtp = newOtp.join("");
    if (combineOtp.length === length) {
      onOtpSubmit(combineOtp);
    }
    // move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
      //   inputRefs.current[otp.indexOf("")].focus();
    }
  };
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div>
      {otp.map((el, index) => {
        return (
          <input
            type="text"
            value={el}
            ref={(input) => (inputRefs.current[index] = input)}
            key={index}
            onChange={(e) => handleInputCahnge(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otpInput"
          />
        );
      })}
    </div>
  );
}
export default OtpInput;
