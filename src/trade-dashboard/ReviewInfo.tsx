import { useEffect } from "react"
import StepProgressBar from "./tradeComponents/resuable/StepProgressBar"
import ReviewInfoForm from "./tradeComponents/ReviewInfo/ReviewInfoForm"


const ReviewInfo = () => {

      useEffect(()=>{
                document.title = `Review Info | Stavbar`
              }, [])

  return (
    <div>
      <StepProgressBar
                title="Review Your Information"
                step={8}
                totalSteps={8}
                progress={100}
            />

            <div className="bg-[#EFF2F7] min-h-screen py-16">
                <ReviewInfoForm/>
            </div>
    </div>
  )
}

export default ReviewInfo
