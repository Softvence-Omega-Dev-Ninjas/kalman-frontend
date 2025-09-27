import { useState } from "react";
import LogInComponent from "../components/AuthComponents/LogInComponent";
import TwoStepVerification from "../components/AuthComponents/TwoStepVerification";
import EnterVerificationCode from "../components/AuthComponents/EnterVerificationCode";

const GeneralLogin: React.FC = () => {
const [step, setStep] = useState(1);
  return (
    <div className=" bg-white flex items-start">
      <div className="max-w-7xl w-full mx-auto px-6 py-8">
        {
            step === 1 && <LogInComponent step={step} setStep={setStep} />
        }
        {
            step === 2 && <TwoStepVerification step={step} setStep={setStep} />
        }
        {
            step === 3 && <EnterVerificationCode />
        }
      </div>
    </div>
  );
};

export default GeneralLogin;
