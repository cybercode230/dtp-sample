import React, { useState, useEffect } from "react";
import Button from "../../components/buttons/buttons";

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Email/Phone, 2: OTP, 3: Reset Password, 4: Success
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  // Countdown timer
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
    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setStep(2);
    setTimeLeft(300);
    setCanResend(false);

    // Normally send OTP via backend
    console.log("OTP sent:", code);
    alert(`OTP sent to ${emailOrPhone}`);
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setStep(3);
    } else {
      alert("Invalid OTP, please try again.");
    }
  };

  const resetPassword = () => {
    if (!newPassword || newPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    // Normally update password via backend
    setStep(4);
  };

  const resendOtp = () => {
    sendOtp();
    alert("A new OTP has been sent.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>

        {/* Step Indicators */}
        <div className="flex justify-between mb-6">
          {["Enter Contact", "Verify OTP", "New Password", "Complete"].map(
            (label, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    step - 1 >= index
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs text-gray-600">{label}</span>
              </div>
            )
          )}
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Email or Phone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-green-700"
            />
            <Button label="Send OTP" variant="primary" onClick={sendOtp} />
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <p className="text-gray-600 text-sm text-center">
              Enter the 6-digit code sent to {emailOrPhone}
            </p>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full text-center text-lg tracking-widest focus:outline-none focus:border-green-700"
              placeholder="******"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
              </span>
              <button
                onClick={resendOtp}
                disabled={!canResend}
                className={`text-sm font-semibold ${
                  canResend ? "text-green-700" : "text-gray-400"
                }`}
              >
                Resend OTP
              </button>
            </div>
            <Button label="Verify OTP" variant="primary" onClick={verifyOtp} />
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-green-700"
            />
            <Button label="Reset Password" variant="primary" onClick={resetPassword} />
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-4 items-center">
            <p className="text-green-700 font-semibold text-center">
              🎉 Your password has been reset successfully!
            </p>
            <Button label="Go to Sign In" variant="primary" onClick={() => setStep(1)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
