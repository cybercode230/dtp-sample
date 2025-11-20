import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttons/buttons";
import LogoModule from "../../sections/NavBar/modules/LogoModule";

const VerifyAccount: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email input, 2: Enter OTP, 3: Success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
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
    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);
    setStep(2);
    setTimeLeft(300);
    setCanResend(false);
    console.log("Generated OTP:", otpCode);
    alert(`OTP sent to ${email}`);
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) setStep(3);
    else alert("Invalid OTP. Please try again.");
  };

  const resendOtp = () => {
    sendOtp();
    alert(`A new OTP has been sent to ${email}`);
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const finishVerification = () => {
    alert("Account verified successfully!");
    navigate("/");
  };

  const progressPercentage = () => ((step - 1) / 2) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      {/* Top Logo */}
      <div className="mb-8 w-full flex justify-center">
        <LogoModule
          data={{
            src: "/assets/ict_chamber_1.jpeg",
            title: "ICT Chamber Help Center",
            subtitle: "Digital Transformation Platform Support",
          }}
          align="center"
        />
      </div>

      <div className="w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Verify Your Account
        </h2>

        {/* Step Content */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <p className="text-gray-600 text-sm text-center mb-2">
              Enter your email to receive a 6-digit verification code.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-green-700 text-base"
            />
            <Button label="Send OTP" variant="primary" onClick={sendOtp} className="py-3 text-base" />
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <p className="text-gray-600 text-sm text-center">
              Enter the 6-digit code sent to <strong>{email}</strong>.
            </p>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full text-center text-lg tracking-widest focus:outline-none focus:border-green-700"
              placeholder="******"
            />
            <div className="flex justify-between items-center text-gray-600 text-sm">
              <span>Time left: {formatTime(timeLeft)}</span>
              {canResend && (
                <button
                  className="text-green-700 font-semibold hover:underline"
                  onClick={resendOtp}
                >
                  Resend OTP
                </button>
              )}
            </div>
            <Button label="Verify OTP" variant="primary" onClick={verifyOtp} className="py-3 text-base" />
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4 items-center">
            <p className="text-green-700 font-semibold text-center text-base">
              🎉 Your account has been verified successfully!
            </p>
            <Button label="Go to Dashboard" variant="primary" onClick={finishVerification} className="py-3 text-base" />
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

export default VerifyAccount;
