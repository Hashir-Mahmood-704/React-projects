import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useRef } from "react"
import { sliderData } from "../utils/data"
import SliderCard from "./SliderCard"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"

const MySlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    variableWidth: true,
  }
  let sliderRef = useRef(null)
  const next = () => {
    sliderRef.slickNext()
  }
  const previous = () => {
    sliderRef.slickPrev()
  }
  return (
    <div className="container w-full mx-auto md:p-[20px] ">
      <Slider
        ref={(slider) => {
          sliderRef = slider
        }}
        {...settings}
      >
        {sliderData.map((item, key) => (
          <SliderCard key={key} {...item} />
        ))}
      </Slider>
      <div className="flex items-center gap-[20px] mt-[20px]">
        <span
          onClick={previous}
          className="p-2 rounded-full bg-black text-white text-[16px] md:text-[20px]"
        >
          <FaAngleLeft/>
        </span>
        <button onClick={next} className="p-2 rounded-full bg-black text-white text-[16px] md:text-[20px]">
          <FaAngleRight />
        </button>
      </div>
    </div>
  )
}

export default MySlider
