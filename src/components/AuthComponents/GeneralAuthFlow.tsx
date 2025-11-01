import GeneralSignUp from "@/publicpages/GeneralSignUp";
import React, { useEffect, useState } from "react";
import TwoStepVerification from "./TwoStepVerification";
import EnterVerificationCode from "./EnterVerificationCode";

type GeneralSignUpProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
};

const GeneralSignUpCmp =
  GeneralSignUp as React.ComponentType<GeneralSignUpProps>;

const GeneralAuthFlow: React.FC = () => {

      useEffect(()=>{
      document.title = `Register User | ${import.meta.env.VITE_APP_NAME}`
    }, [])
  
  const [step, setStep] = useState<number>(() => {
    const savedStep = localStorage.getItem("auth_step");
    return savedStep ? parseInt(savedStep) : 1;
  });

  const [userEmail, setUserEmail] = useState<string>(() => {
    return localStorage.getItem("auth_email") || "";
  });

  // Save current step and email to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("auth_step", step.toString());
  }, [step]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem("auth_email", userEmail);
    }
  }, [userEmail]);

  //  Cleanup function — only called when signup flow is finished
  const handleResetFlow = () => {
    localStorage.removeItem("auth_step");
    localStorage.removeItem("auth_email");
    setStep(1);
    setUserEmail("");
  };

  return (
    <div className="transition-all duration-500 ease-in-out">
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
          handleResetFlow={handleResetFlow} //  pass it down
        />
      )}
    </div>
  );
};

export default GeneralAuthFlow;
