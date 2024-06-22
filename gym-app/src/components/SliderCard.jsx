import { IoIosStar } from "react-icons/io"
import { FaDumbbell } from "react-icons/fa6"

const SliderCard = ({ name, stars, message }) => {
  const starArray = [0, 1, 2, 3, 4]
  return (
    <div className="border border-black rounded-[15px] p-[7px] md:p-[15px] flex flex-col items-start gap-[10px] w-[300px] md:w-[450px] mr-[20px] md:mr-[30px] relative">
      <h3 className="font-semibold text-[20px] md:text-[25px]">{name}</h3>
      <div className="flex gap-[5px] items-center">
        {starArray.map((_, index) => (
          <IoIosStar
            key={index}
            className={`${
              index < stars ? "text-black" : "text-gray-300"
            } text-[15px] md:text-[20px]`}
          />
        ))}
      </div>
      <p className="text-gray-800 text-[14px] md:text-[16px]">{message}</p>
      <FaDumbbell className="text-black absolute right-[15px] top-[15px] text-[20px] md:text-[25px]" />
    </div>
  )
}

export default SliderCard
