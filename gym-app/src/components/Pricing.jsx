import { useState } from "react"
import { yearlyPricingPlan, monthlyPricingPlan } from "../utils/data"
import PricingCard from "./PricingCard"

const Pricing = () => {
  const [plan, setplan] = useState("monthly")
const pricingPlan = plan === "monthly" ? monthlyPricingPlan : yearlyPricingPlan
  return (
    <div id="plans" className="pt-[120px] px-[20px] lg:px-[40px] mx-auto max-w-[1400px]  w-full">
      {/* top */}
      <div className="flex justify-between items-center relative">
        <p className="absolute text-[16px] font-medium text-gray-400 top-[-20px] left-[6px]">
          Pricing plan
        </p>
        <h3 className="font-bold text-[26px]  lg:text-[40px]">JOIN TODAY</h3>
        <div className="cursor-pointer w-[180px] h-[40px] font-medium flex items-center justify-between text-[14px] shadow-xl rounded-[8px]">
          <span
            onClick={() => setplan("monthly")}
            className={`flex-[1] h-full rounded-[8px] flex justify-center items-center ${
              plan === "monthly" ? "bg-black text-white" : "text-black"
            }`}
          >
            Monthly
          </span>
          <span
            onClick={() => setplan("yearly")}
            className={`flex-[1] h-full rounded-[8px] flex justify-center items-center
                ${plan === "yearly" ? "bg-black text-white" : "text-black"} `}
          >
            Yearly
          </span>
        </div>
      </div>

      {/* cards */}
      <div className="mt-[40px] flex flex-col lg:flex-row items-center gap-[25px] lg:gap-0 justify-between">
        {pricingPlan.map((item, key) => (
          <PricingCard key={key} item={item} index={key} plan={plan} />
        ))}
      </div>
    </div>
  )
}

export default Pricing
