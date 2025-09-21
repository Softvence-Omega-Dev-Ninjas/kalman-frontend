import ProfessionalInfoForm from "./tradeComponents/ProfessionalInfo/ProfessionalInfoForm"
import StepProgressBar from "./tradeComponents/resuable/StepProgressBar"

const ProfessionalInfo = () => {
  return (
    <div>
       <StepProgressBar
                title="Professional Information"
                step={2}
                totalSteps={8}
                progress={35}
            />

             <div className="bg-[#EFF2F7] min-h-screen py-16">
                <ProfessionalInfoForm />
            </div>
    </div>
  )
}

export default ProfessionalInfo
