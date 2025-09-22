import PaymentForm from "./tradeComponents/PaymentTerms/PaymentForm"
import StepProgressBar from "./tradeComponents/resuable/StepProgressBar"

const PaymentTerms = () => {
  return (
    <div>
      <StepProgressBar
                title="Payment Terms"
                step={6}
                totalSteps={8}
                progress={80}
            />

            <div className="bg-[#EFF2F7]  py-16">
              <PaymentForm/>
            </div>
    </div>
  )
}

export default PaymentTerms
