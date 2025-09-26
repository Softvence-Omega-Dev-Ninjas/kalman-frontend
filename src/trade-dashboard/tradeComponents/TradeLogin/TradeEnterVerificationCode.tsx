import React, { useRef, useState } from "react";
import verifyCodeImg from "../../../assets/sample_images/enterCodeImg.png"
import { Link, useNavigate } from "react-router-dom";

const TradeEnterVerificationCode: React.FC = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState<string[]>(["", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const focusInput = (idx: number) => {
    const el = inputsRef.current[idx];
    if (el) el.focus();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) {
      const next = [...values];
      next[idx] = "";
      setValues(next);
      return;
    }

    // if user pasted multiple digits, distribute
    if (val.length > 1) {
      const chars = val.split("");
      const next = [...values];
      for (let i = 0; i < chars.length && idx + i < 4; i++)
        next[idx + i] = chars[i];
      setValues(next);
      const nextFocus = Math.min(3, idx + val.length);
      focusInput(nextFocus);
      return;
    }

    const next = [...values];
    next[idx] = val;
    setValues(next);
    if (idx < 3 && val) focusInput(idx + 1);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !values[idx] && idx > 0) {
      const prevIdx = idx - 1;
      const next = [...values];
      next[prevIdx] = "";
      setValues(next);
      focusInput(prevIdx);
    }
    if (e.key === "ArrowLeft" && idx > 0) focusInput(idx - 1);
    if (e.key === "ArrowRight" && idx < 3) focusInput(idx + 1);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!paste) return;
    const chars = paste.split("").slice(0, 4);
    const next = ["", "", "", ""];
    for (let i = 0; i < chars.length; i++) next[i] = chars[i];
    setValues(next);
    const focusIdx = Math.min(3, chars.length - 1);
    focusInput(focusIdx);
    e.preventDefault();
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = values.join("");
    if (code.length < 4) {
      alert("Please enter the 4-digit code");
      return;
    }
    navigate("/");
  };

  const handleResend = () => {
    // placeholder resend
    alert("Resend code requested");
  };

  return (
    <div className="min-h-screen bg-white flex items-start">
      <div className="max-w-7xl w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* left image */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[560px] rounded-xl overflow-hidden shadow-lg">
              <img
                src={verifyCodeImg}
                alt="verify"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

       
          <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center gap-5 text-center py-5">
            <h2 className="text-3xl md:text-4xl font-semibold text-black">
              Enter the verification code
            </h2>
            <p className="text-sm text-gray-500 mt-2 mb-6">
              Please enter the code we've sent to ****lq@gmail.com
            </p>

            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-center gap-3 mb-4">
                {[0, 1, 2, 3].map((i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputsRef.current[i] = el;
                    }}
                    value={values[i]}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    onPaste={handlePaste}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    className="w-12 h-12 rounded-md border border-gray-200 flex items-center justify-center text-lg font-medium text-center"
                    aria-label={`digit-${i + 1}`}
                  />
                ))}
              </div>

              <div className="text-sm text-gray-600 mb-4">
                Didn't get the code? Send again in{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-primary "
                >
                  Resend
                </button>
              </div>

             <Link to='/trade-person/personal-info'>
              <button
                type="submit"
                className="px-5 py-2 rounded-md text-white bg-primary w-full"
              >
                Confirm
              </button>
             </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeEnterVerificationCode;
