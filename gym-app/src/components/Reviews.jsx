import MySlider from "./Slider"
import { useState } from "react"
import ReviewPopup from "./ReviewPopup"

const Reviews = () => {
  const [openPopup, setOpenPopup] = useState(false)
  return (
    <div
      id="review"
      className="pt-[120px] px-[20px] lg:px-[40px] max-w-[1400px] mx-auto w-full"
    >
      {/* top */}
      <div className="flex justify-between items-center relative">
        <p className="absolute text-[16px] font-medium text-gray-400 top-[-20px] left-[6px]">
          Reviews
        </p>
        <h3 className="font-bold text-[26px]  lg:text-[40px]">FROM YOU</h3>
        <button
          onClick={() => setOpenPopup(true)}
          className="bg-black font-semibold py-3 px-4 rounded-[12px] text-white"
        >
          + Give Review
        </button>
      </div>

      {/* bottom */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-[20px] mt-[80px] h-[560px] lg:h-[320px]  w-full overflow-hidden">
        {/* left */}
        <div className="min-w-[370px] relative h-[250px] ">
          <img
            src="/face-1.jpg"
            alt="face-1"
            className="rounded-full w-[120px] h-[120px] object-cover absolute top-0 left-0"
          />
          <img
            src="/face-2.jpg"
            alt="face-2"
            className="rounded-full w-[100px] h-[100px] object-cover absolute top-[15px] right-[80px]"
          />
          <img
            src="/face-3.jpg"
            alt="face-3"
            className="rounded-full w-[140px] h-[140px] object-cover absolute bottom-0 left-[70px]"
          />
          <img
            src="/face-4.jpg"
            alt="face-4"
            className="rounded-full w-[100px] h-[100px] object-cover absolute bottom-0 right-[40px]"
          />
        </div>

        {/* right */}
        <div className="h-[250px] w-full">
          <MySlider />
        </div>
      </div>
      {openPopup && (
        <div
          onClick={() => setOpenPopup(false)}
          className="fixed flex justify-center items-center w-screen h-screen bg-black/70 z-50 top-0 left-0"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ReviewPopup setOpenPopup={setOpenPopup} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Reviews
