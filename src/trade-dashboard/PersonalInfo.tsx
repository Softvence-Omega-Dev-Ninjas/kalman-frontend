import { useEffect } from "react"
import PersonalInfoForm from "./tradeComponents/PersonalInfo/PersonalInfoForm"
import StepProgressBar from "./tradeComponents/resuable/StepProgressBar"

const PersonalInfo = () => {

        useEffect(()=>{
                  document.title = `Personal Info | ${import.meta.env.VITE_APP_NAME}`
                }, [])

    return (
        <div>
            <StepProgressBar
                title="Personal Information"
                step={1}
                totalSteps={8}
                progress={20}
            />
            <div className="bg-[#EFF2F7] min-h-screen py-8">
                <PersonalInfoForm />
            </div>


        </div>
    )
}

export default PersonalInfo
