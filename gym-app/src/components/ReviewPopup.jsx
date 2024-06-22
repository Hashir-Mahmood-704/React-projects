import { GiBiceps } from "react-icons/gi"
import { IoMdClose } from "react-icons/io"
import { useState } from "react"

const emojis = [
  "/emo-1.png",
  "/emo-2.png",
  "/emo-3.png",
  "/emo-4.png",
  "/emo-5.png",
]

const ReviewPopup = ({ setOpenPopup }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(2)
  return (
    <div className="bg-white w-[340px] sm:w-[540px] h-[540px] sm:h-[580px] rounded-[15px] p-[15px] sm:p-[20px] flex flex-col relative">
      {/* top */}
      <div className="flex justify-between border-b pb-[15px]">
        <div className="flex gap-[25px] items-center">
          <span className="w-[40px] h-[40px] rounded-full text-white bg-black flex justify-center items-center">
            <GiBiceps size={20} />
          </span>
          <p className="text-black font-semibold text-[24px]">Feedback</p>
        </div>
        <span className="text-black" onClick={() => setOpenPopup(false)}>
          <IoMdClose size={25} />
        </span>
      </div>

      {/* center */}
      <div className="mt-[20px] text-center">
        <p className="font-semibold text-[30px] sm:text-[35px] text-nowrap">How are you feeling?</p>
        <p className="text-gray-400 mt-[10px] text-[14px] sm:text-[16px]">
          Your input is valuable in Helping us better understand your need and
          tailor our services accordingly.
        </p>

        <div className="flex justify-evenly items-center gap-[10px] mt-[30px]">
          {emojis.map((item, idx) => (
            <div
              onClick={() => setSelectedEmoji(idx)}
              key={idx}
              className={`w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] flex justify-center items-center cursor-pointer rounded-full transition-all duration-500 ease-in-out ${
                selectedEmoji === idx ? "bg-black" : "bg-gray-200"
              }`}
            >
              <img
                src={item}
                alt="emojis"
                className={` p-1 object-cover transition-all duration-500 ease-in-out ${
                  selectedEmoji === idx
                    ? "w-[45px] h-[45px] sm:w-[70px] sm:h-[70px]"
                    : "sm:w-[50px] sm:h-[50px] w-[40px] h-[40px]"
                }`}
              />
            </div>
          ))}
        </div>

        <textarea
          className="border border-gray-500 rounded-[12px] w-[90%] h-[50%] mt-[20px] p-2"
          placeholder="Add a comment..."
        ></textarea>
      </div>

      <button
        onClick={() => setOpenPopup(false)}
        className="w-[90%] border absolute bottom-[12px] sm:bottom-[10px] left-0 right-0  mx-auto  h-[50px] sm:h-[55px] text-[20px] sm:text-[25px] font-semibold bg-black text-white rounded-[10px]"
      >
        Submit Now
      </button>
    </div>
  )
}

export default ReviewPopup
