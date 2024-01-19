import React, { useState } from "react";
import OtpInput from "./OtpInput";

function PhoneOtpLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleInputNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    //phone validations
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone number");
      return;
    }
    //show otp field
    setShowOtpInput(true);
  };
  const handleOtpSubmit = (otp) => {
    console.log("sign in successful", otp);
  };
  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handleInputNumber}
            placeholder="Enter Phone Number"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          Enter OTP sent to {phoneNumber}
          <OtpInput length={4} onOtpSubmit={handleOtpSubmit} />
        </div>
      )}
    </div>
  );
}

export default PhoneOtpLogin;
