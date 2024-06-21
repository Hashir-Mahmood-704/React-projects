import { GiBiceps } from "react-icons/gi"
import { IoMdClose } from "react-icons/io"

const PricingPopupCard = ({ setOpenPopup }) => {
  return (
    <div className="bg-white w-[340px] sm:w-[540px] h-[600px] sm:h-[580px] rounded-[15px] p-[15px] sm:p-[20px] flex flex-col relative">
      {/* top */}
      <div className="flex justify-between border-b pb-[15px]">
        <div className="flex gap-[25px] items-center">
          <span className="w-[40px] h-[40px] rounded-full text-white bg-black flex justify-center items-center">
            <GiBiceps size={20} />
          </span>
          <p className="text-black font-semibold text-[24px]">Join us Now!!</p>
        </div>
        <span className="text-black" onClick={() => setOpenPopup(false)}>
          <IoMdClose size={25} />
        </span>
      </div>
      {/* 1 2 3 */}
      <div className="flex items-center gap-[20px] w-[85%] mx-auto justify-center mt-[20px]">
        <div className="flex flex-col items-center gap-[5px]">
          <div className="w-[25px] h-[25px] bg-black text-white rounded-full flex justify-center items-center">
            1
          </div>
          <span className="text-[10px] text-nowrap">Basic Detail</span>
        </div>
        <div className="w-full border" />
        <div className="flex flex-col items-center gap-[5px]">
          <div className="w-[25px] h-[25px] bg-black text-white rounded-full flex justify-center items-center">
            2
          </div>
          <span className="text-[10px] text-nowrap">Membership Detail</span>
        </div>
        <div className="w-full border" />

        <div className="flex flex-col items-center  gap-[5px]">
          <div className="w-[25px] h-[25px] bg-black text-white rounded-full flex justify-center items-center">
            3
          </div>
          <span className="text-[10px]">Payment</span>
        </div>
      </div>

      <div className="mt-[30px] flex flex-col items-start text-black gap-[25px]">
        <h3 className="font-semibold text-[20px]">Basic Details</h3>
        <input
          type="text"
          placeholder="Enter name"
          className="bg-gray-200 outline-none rounded-[15px] p-[10px] w-[80%]"
        />
        <input
          type="text"
          placeholder="Enter phone no"
          className="bg-gray-200 outline-none rounded-[15px] p-[10px] w-[80%]"
        />
        <input
          type="text"
          placeholder="Enter email"
          className="bg-gray-200 outline-none rounded-[15px] p-[10px] w-[80%]"
        />
      </div>
      <div className="flex mt-[20px] justify-start text-black gap-[10px] flex-wrap sm:flex-nowrap">
        <input
          placeholder="Your gender"
          type="text"
          className="bg-gray-200 outline-none rounded-[15px] p-[10px] sm:w-full placeholder:text-center w-[100px]"
        />
        <input
          placeholder="Your age"
          type="text"
          className="bg-gray-200 outline-none rounded-[15px] p-[10px] sm:w-full placeholder:text-center w-[100px]"
        />
        <input
          placeholder="Your height"
          type="text"
          className="bg-gray-200 outline-none rounded-[15px] p-[10px] sm:w-full placeholder:text-center w-[100px]"
        />
        <input
          placeholder="Your weight"
          type="text"
          className="bg-gray-200 outline-none rounded-[15px] p-[10px] sm:w-full w-[100px] placeholder:text-center"
        />
      </div>

      <button
        onClick={() => setOpenPopup(false)}
        className="w-[95%] border absolute bottom-[12px] sm:bottom-[20px] left-0 right-0  mx-auto  h-[50px] sm:h-[60px] text-[20px] sm:text-[25px] font-semibold bg-black text-white rounded-[10px]"
      >
        Next
      </button>
    </div>
  )
}

export default PricingPopupCard
