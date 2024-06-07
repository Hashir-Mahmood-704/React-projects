import { GrLinkNext, GrLinkPrevious } from "react-icons/gr"
import { useState } from "react"

const data = [
  "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1600",
]

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  function prevSlide() {
    setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1)
  }
  function nextSlide() {
    setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1)
  }
  return (
    <div className="w-screen h-[calc(100vh-300px)] lg:h-[calc(100vh-100px)] relative overflow-hidden">
      {/* container */}
      <div
        className="w-[300vw] flex h-full duration-1000 transition-all ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        <img
          src={data[0]}
          alt="image"
          className="w-screen h-full object-cover"
        />
        <img
          src={data[1]}
          alt="image"
          className="w-screen h-full object-cover"
        />
        <img
          src={data[2]}
          alt="image"
          className="w-screen h-full object-cover"
        />
      </div>
      {/* icons */}
      <div className="absolute flex gap-[10px] lg:text-[20px] bottom-[40px] lg:bottom-[60px] left-0 right-0 justify-center">
        <div
          className="border bg-white border-black rounded-lg lg:w-[50px] lg:h-[50px] h-[40px] w-[40px] flex justify-center items-center cursor-pointer"
          onClick={prevSlide}
        >
          <GrLinkPrevious />
        </div>
        <div
          className="cursor-pointer border bg-white rounded-lg border-black h-[40px] w-[40px] lg:w-[50px] lg:h-[50px] flex justify-center items-center"
          onClick={nextSlide}
        >
          <GrLinkNext />
        </div>
      </div>
    </div>
  )
}

export default Slider
