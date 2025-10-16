import GeneralSignUp from "@/publicpages/GeneralSignUp";
import React, { useState } from "react";
import TwoStepVerification from "./TwoStepVerification";
import EnterVerificationCode from "./EnterVerificationCode";
// import EnterVerificationCode from "./EnterVerificationCode";

type GeneralSignUpProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
};

const GeneralSignUpCmp =
  GeneralSignUp as React.ComponentType<GeneralSignUpProps>;

const GeneralAuthFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");

  return (
    <>
      {step === 1 && (
        <GeneralSignUpCmp setStep={setStep} setUserEmail={setUserEmail} />
      )}

      {step === 2 && userEmail && (
        <TwoStepVerification step={step} setStep={setStep} email={userEmail} />
      )}

      {step === 3 && (
        <EnterVerificationCode
          email={userEmail}
          step={step}
          setStep={setStep}
        />
      )}
    </>
  );
};

export default GeneralAuthFlow;
