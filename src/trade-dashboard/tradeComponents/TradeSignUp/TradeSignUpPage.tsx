import { useEffect, useState } from "react";


import TradeSignUp from "@/trade-dashboard/TradeSignUp";
import TradeTwoStepVerification from "../TradeLogin/TradeTwoStepVerification";
import TradeEnterVerificationCode from "../TradeLogin/TradeEnterVerificationCode";

const TradeSignUpPage: React.FC = () => {

      useEffect(()=>{
                document.title = `Trade SignUp | Stavbar`
              }, [])

const [step, setStep] = useState(1);
const [email, setEmail] = useState<string | null>(null);

  return (
    <div className=" bg-white flex items-start">
      <div className="max-w-7xl w-full mx-auto px-6 py-8">
        {
            step === 1 && <TradeSignUp step={step} setStep={setStep} setEmail={setEmail} />
        }
        {
            step === 2 && <TradeTwoStepVerification step={step} setStep={setStep} email={email} />
        }
        {
            step === 3 && <TradeEnterVerificationCode email={email} />
        }
      </div>
    </div>
  );
};

export default TradeSignUpPage;
