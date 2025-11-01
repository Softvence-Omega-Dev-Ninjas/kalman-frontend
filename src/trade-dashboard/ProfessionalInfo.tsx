import { useEffect } from "react";
import ProfessionalInfoForm from "./tradeComponents/ProfessionalInfo/ProfessionalInfoForm";
import StepProgressBar from "./tradeComponents/resuable/StepProgressBar";

const ProfessionalInfo = () => {

      useEffect(()=>{
                document.title = `Professional Info | ${import.meta.env.VITE_APP_NAME}`
              }, [])

  return (
    <div>
      <StepProgressBar
        title="Professional Information"
        step={2}
        totalSteps={8}
        progress={35}
      />

      <div className="bg-[#EFF2F7] min-h-screen py-8">
        <ProfessionalInfoForm />
      </div>
    </div>
  );
};

export default ProfessionalInfo;
