import { useEffect } from "react"
import CredentialsInfoForm from "./tradeComponents/Credentials/CredentialsInfoForm"
import StepProgressBar from "./tradeComponents/resuable/StepProgressBar"

const Credentials = () => {
      useEffect(()=>{
                document.title = `Credentials | Stavbar`
              }, [])

  return (
    <div>
        <StepProgressBar
                title="Credentials"
                step={5}
                totalSteps={8}
                progress={60}
            />
            <div className="bg-[#EFF2F7] min-h-screen py-16">
                <CredentialsInfoForm/>
            </div>
    </div>
  )
}

export default Credentials
