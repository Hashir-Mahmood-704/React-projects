import { statItems } from "../utils/statsItems"
import { motion } from "framer-motion"

const Stats = () => {
  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col mt-[30px] lg:mt-0 items-center lg:flex-row gap-[20px] bg-[#1c1c13] text-white justify-evenly py-[25px] lg:py-[50px]"
    >
      {statItems.map((item) => (
        <div
          key={item.text1}
          className="flex flex-col items-center lg:items-start text-[14px] gap-[3px]"
        >
          <h2 className="font-bold text-[22px] lg:text-[25px]">
            {item.number}+
          </h2>
          <span className="font-semibold">{item.text1}</span>
          <span>{item.text2}</span>
        </div>
      ))}
    </motion.div>
  )
}

export default Stats
