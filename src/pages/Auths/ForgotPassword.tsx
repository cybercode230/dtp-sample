import React, { useState, useEffect } from "react";
import Button from "../../components/buttons/buttons";
import LogoModule from "../../sections/NavBar/modules/LogoModule";

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Email/Phone, 2: OTP, 3: Reset Password, 4: Success
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (step !== 2 || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) setCanResend(true);
  }, [timeLeft]);

  const sendOtp = () => {
    if (!emailOrPhone) {
      alert("Please enter your email or phone number.");
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setStep(2);
    setTimeLeft(300);
    setCanResend(false);
    console.log("OTP sent:", code);
    alert(`OTP sent to ${emailOrPhone}`);
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) setStep(3);
    else alert("Invalid OTP, please try again.");
  };

  const resetPassword = () => {
    if (!newPassword || newPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    setStep(4);
  };

  const resendOtp = () => {
    sendOtp();
    alert("A new OTP has been sent.");
  };

  const progressPercentage = () => ((step - 1) / 3) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      {/* Logo */}
      <div className="mb-10 w-full flex justify-center">
        <LogoModule
          data={{
            src: "/assets/ict_chamber_1.jpeg",
            title: "ICT Chamber Help Center",
            subtitle: "Digital Transformation Platform Support",
          }}
          align="center"
        />
      </div>

      {/* Form content without card */}
      <div className="w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Forgot Password
        </h2>

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Email or Phone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-green-700 text-base"
            />
            <Button label="Send OTP" variant="primary" onClick={sendOtp} className="py-3 text-base" />
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <p className="text-gray-600 text-center text-base">
              Enter the 6-digit code sent to <strong>{emailOrPhone}</strong>
            </p>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full text-center text-xl tracking-widest focus:outline-none focus:border-green-700"
              placeholder="******"
            />
            <div className="flex justify-between items-center text-sm font-medium text-gray-600">
              <span>
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
              </span>
              <button
                onClick={resendOtp}
                disabled={!canResend}
                className={`${canResend ? "text-green-700" : "text-gray-400"} font-semibold`}
              >
                Resend OTP
              </button>
            </div>
            <Button label="Verify OTP" variant="primary" onClick={verifyOtp} className="py-3 text-base" />
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full text-base focus:outline-none focus:border-green-700"
            />
            <Button label="Reset Password" variant="primary" onClick={resetPassword} className="py-3 text-base" />
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-4 items-center">
            <p className="text-green-700 font-semibold text-center text-base">
              🎉 Your password has been reset successfully!
            </p>
            <Button label="Go to Sign In" variant="primary" onClick={() => setStep(1)} className="py-3 text-base" />
          </div>
        )}

        {/* Bottom Progress Bar */}
        <div className="mt-6 h-2 w-full bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-2 bg-[#2e2e2e] transition-all duration-300"
            style={{ width: `${progressPercentage()}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
