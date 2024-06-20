import { whyUsData } from "../utils/data"
import { FaClock } from "react-icons/fa6"
import { PiBoxingGloveBold } from "react-icons/pi"
import { FaDumbbell } from "react-icons/fa"
import { HiCurrencyDollar } from "react-icons/hi"
import { motion } from "framer-motion"

const WhyUsItem = ({ item, index }) => {
  let icon
  if (index === 0) icon = <PiBoxingGloveBold />
  else if (index === 1) icon = <FaDumbbell />
  else if (index === 2) icon = <HiCurrencyDollar />
  else if (index === 3) icon = <FaClock />

  return (
    <div id="whyus" className="flex gap-[10px] items-start w-[300px]">
      <div className="min-w-[35px] h-[35px] text-[20px] flex justify-center items-center bg-[#1c1c13] rounded-full text-white">
        {icon}
      </div>
      <div>
        <h3 className="text-[#1c1c13] font-bold text-[18px]">{item.label}</h3>
        <p className="text-[14px] text-gray-400 mt-[5px]">{item.description}</p>
      </div>
    </div>
  )
}

const WhyUs = () => {
  return (
    <motion.div
      // initial={{ opacity: 0 }}
      // whileInView={{ opacity: 1 }}
      // transition={{ duration: 1, delay: 0.1 }}
      className="pt-[100px] px-[20px] lg:px-[40px] max-w-[1400px] mx-auto"
      id="whyus"
    >
      {/* top */}
      <div>
        <h1 className="font-bold text-[30px] lg:text-[40px] text-center">
          Why Choose Us
        </h1>
        <p className="text-[14px] my-[20px] lg:text-[16px] text-gray-500 text-center lg:w-[80%] mx-auto">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore
          molestias fugit, iste repudiandae adipisci necessitatibus ullam
          placeat. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Nihil repellat magnam, quo quidem autem quisquam dolores recusandae
          distinctio voluptatibus? Maxime voluptatibus
        </p>
      </div>

      {/* bottom */}
      <div className="flex flex-col items-center lg:flex-row mt-[100px]">
        {/* left */}
        <div className="flex-[1.5]  justify-center flex gap-[40px] flex-wrap">
          {whyUsData.map((item, index) => (
            <WhyUsItem key={item.label} item={item} index={index} />
          ))}
        </div>
        {/* right */}
        <div className="flex-[1] gap-[15px] flex mt-[30px] lg:mt-0">
          {/* left */}
          <div>
            <motion.img
              whileHover={{ y: -20 }}
              src="/us-1.jpg"
              alt="image"
              className="w-[200px] h-[140px] object-cover rounded-[30px] mb-[10px] cursor-pointer"
            />
            <motion.img
              whileHover={{ y: 20 }}
              src="/us-2.jpg"
              alt="image"
              className="w-[200px] h-[140px] object-cover rounded-[30px] cursor-pointer"
            />
          </div>

          {/* right */}

          <motion.img
            whileHover={{ y: -20 }}
            src="/us-3.jpg"
            alt="image"
            className="w-[200px] h-[280px] object-cover rounded-[30px] cursor-pointer"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default WhyUs
