import { MdOutlineVerified } from "react-icons/md"

const PricingCard = ({ item, index, plan }) => {
  const type = plan === "monthly" ? "Month" : "Year"
  return (
    <div
      className={`w-[300px] xl:w-[350px] h-[400px] text-gray-400 rounded-[12px] shadow-xl p-[20px] pb-[15px]  flex flex-col items-start justify-between border ${
        index === 1 ? "bg-[#1c1c13]" : "bg-white"
      }`}
    >
      <div
        className={`flex flex-col items-start gap-[10px] ${
          index === 1 ? "bg-[#1c1c13]" : "bg-white"
        }`}
      >
        <p className="text-[14px] font-medium">{item.type}</p>
        <p className="font-medium">
          <span
            className={`text-[35px] font-bold mr-[3px] ${
              index === 1 ? "text-white" : "text-black"
            }`}
          >
            ${item.price}
          </span>
          /{type}
        </p>
        <p className="text-[14px]">{item.description}</p>
        <div className="mt-[10px] flex flex-col gap-[6px]">
          {item.points.map((item, idx) => (
            <div key={idx} className="flex gap-[8px] items-start">
              <span className={` ${index === 1 ? "text-white" : "text-black"}`}>
                <MdOutlineVerified size={20} />
              </span>
              <span className="text-[13px]">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        className={`w-full h-[45px] rounded-[10px] text-center font-semibold ${
          index === 1 ? "bg-white text-black" : "text-white bg-black "
        }`}
      >
        Choose plan
      </button>
    </div>
  )
}

export default PricingCard
