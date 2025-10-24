import { useState } from "react";
import TradeLogInComponent from "./tradeComponents/TradeLogin/TradeLoginComponent";

const TradeLogin: React.FC = () => {
const [step, setStep] = useState(1);
  return (
    <div className=" bg-white flex items-start">
      <div className="max-w-7xl w-full mx-auto px-6 py-8">

                  <TradeLogInComponent step={step} setStep={setStep} />
  
      </div>
    </div>
  );
};

export default TradeLogin;
