import { useEffect } from "react"
import BusinessDetailsForm from "./tradeComponents/BusinessDetails/BusinessDetailsForm"
import StepProgressBar from "./tradeComponents/resuable/StepProgressBar"


const BusinessDetails = () => {

      useEffect(()=>{
                document.title = `Business Details | Stavbar`
              }, [])

  return (
    <div>
        <StepProgressBar
                title="Business Details"
                step={7}
                totalSteps={8}
                progress={90}
            />

            <div className="bg-[#EFF2F7]  py-16">
                <BusinessDetailsForm/>
            </div>
    </div>
  )
}

export default BusinessDetails
