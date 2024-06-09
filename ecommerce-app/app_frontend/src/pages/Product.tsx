import { useState } from "react"
import { FaCartArrowDown } from "react-icons/fa6"
import { CiHeart } from "react-icons/ci"
import { FaBalanceScale } from "react-icons/fa"

const images = [
  "https://images.pexels.com/photos/9813635/pexels-photo-9813635.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/19501709/pexels-photo-19501709/free-photo-of-black-and-white-shot-of-a-young-woman-standing-outside-in-the-dark-and-looking-away.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
]

const Product = () => {
  const [selectedImage, setselectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  return (
    <div className="py-[20px] px-[15px] lg:px-[50px] flex gap-[50px] flex-col lg:flex-row">
      {/* left */}
      <div className="flex-[1] flex lg:flex-row flex-col-reverse gap-[10px]">
        {/* small images */}
        <div className="flex-[1] flex lg:flex-col ">
          <img
            src={images[0]}
            alt="image"
            onClick={() => setselectedImage(0)}
            className="w-full h-[160px] sm:h-[260px] lg:h-[160px] object-cover cursor-pointer"
          />
          <img
            src={images[1]}
            alt="image"
            onClick={() => setselectedImage(1)}
            className="w-full h-[160px] sm:h-[260px] lg:h-[160px] object-cover cursor-pointer"
          />
        </div>

        {/* big image */}
        <div className="flex-[4]">
          <img
            src={images[selectedImage]}
            alt="main-image"
            className="w-full max-h-[450px] sm:max-h-[550px] lg:max-h-[650px] object-cover"
          />
        </div>
      </div>

      {/* right */}
      <div className="flex-[1] flex flex-col gap-[30px] items-start">
        <h1>Title</h1>
        <span className="text-[25px] text-[#2879fe] font-semibold">$199</span>
        <p className="text-[16px] text-justify">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni dolor
          placeat sit tempore? Quia ad quae eaque reprehenderit! Quasi beatae et
          unde culpa, in repellat? Officiis nam dignissimos recusandae atque.
        </p>

        {/* qunatity button */}
        <div className="flex items-center gap-[15px]">
          <button
            className="h-[50px] w-[50px] flex justify-center items-center border-none bg-gray-300"
            onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
          >
            <span>-</span>
          </button>
          <span className="w-[20px] text-center">{quantity}</span>
          <button
            className="h-[50px] w-[50px] flex justify-center items-center border-none bg-gray-300"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            <span>+</span>
          </button>
        </div>

        {/* add item button */}
        <button className="w-[200px] p-[10px] bg-[#2879fe] text-white flex items-center justify-center border-none gap-[15px]">
          <FaCartArrowDown size={20} />
          Add to Cart
        </button>

        {/* more buttons */}
        <div className="flex gap-[50px] text-[#2879fe] text-[18px]">
          <div className="flex gap-[5px] items-center">
            <CiHeart size={25} />
            Add to whishlist
          </div>
          <div className="flex gap-[6px] items-center">
            <FaBalanceScale size={25} />
            Add to compare
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
