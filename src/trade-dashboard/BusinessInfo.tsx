import { useEffect } from "react"
import BusinessInfoForm from "./BusinessInfoForm"
import StepProgressBar from "./tradeComponents/resuable/StepProgressBar"

const BusinessInfo = () => {
  
      useEffect(()=>{
                document.title = `Buisness Info | Stavbar`
              }, [])

  return (
    <div>
      <StepProgressBar
                title="Business Details"
                step={3}
                totalSteps={8}
                progress={40}
            />
            <div className="bg-[#EFF2F7] min-h-screen py-16">
                <BusinessInfoForm/>
            </div>
    </div>
  )
}

export default BusinessInfo
