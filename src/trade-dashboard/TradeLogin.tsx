import { useState } from "react";
import TradeLogInComponent from "./tradeComponents/TradeLogin/TradeLoginComponent";
import TradeTwoStepVerification from "./tradeComponents/TradeLogin/TradeTwoStepVerification";
import TradeEnterVerificationCode from "./tradeComponents/TradeLogin/TradeEnterVerificationCode";

const TradeLogin: React.FC = () => {
const [step, setStep] = useState(1);
  return (
    <div className=" bg-white flex items-start">
      <div className="max-w-7xl w-full mx-auto px-6 py-8">
        {
            step === 1 && <TradeLogInComponent step={step} setStep={setStep} />
        }
        {
            step === 2 && <TradeTwoStepVerification step={step} setStep={setStep} />
        }
        {
            step === 3 && <TradeEnterVerificationCode/>
        }
      </div>
    </div>
  );
};

export default TradeLogin;
