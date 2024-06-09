// import { IoIosArrowDown } from "react-icons/io"
import { Link } from "react-router-dom"
import { IoSearchOutline } from "react-icons/io5"
import { BsPerson, BsCart } from "react-icons/bs"
import { FaRegHeart } from "react-icons/fa"
import Cart from "./cart"
import { useState } from "react"

const Navbar = () => {
  const [openCart, setOpenCart] = useState(false)
  return (
    <div className="flex justify-between h-[80px] items-center px-[20px] relative">
      {/* Left */}
      <div className="flex gap-[25px]">
        {/* image and dropdown */}
        {/* <div className="flex items-center">
          <img src="/en.png" alt="image" />
          <IoIosArrowDown />
        </div> */}

        {/* 2nd dropdown */}
        {/* <div className="flex items-center">
          <span>USD</span>
          <IoIosArrowDown />
        </div> */}

        {/* Links */}
        <div className="flex gap-[25px]">
          <Link to="/products/1">Women</Link>
          <Link to="/products/2">Men</Link>
          <Link to="/products/3">Children</Link>
        </div>
      </div>

      {/* Center */}
      <div className="text-[30px] absolute left-[50%] -translate-x-[60%] h-full flex items-center">
        <Link to="/">MyStore</Link>
      </div>

      {/* Right */}
      <div className="flex gap-[25px] items-center ">
        {/* Links */}
        <div className="flex items-center gap-[25px]">
          <Link to="/">Homepage</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          {/* <Link to="/">Stores</Link> */}
        </div>
        {/* Icons */}
        <div className="flex gap-[15px] items-center text-[#5c5c5c] cursor-pointer text-[18px]">
          <IoSearchOutline />
          <BsPerson />
          <FaRegHeart />
          <div
            className="relative"
            onClick={() => setOpenCart((prev) => !prev)}
          >
            <BsCart />
            <span className="absolute text-[12px] bg-[#2879fe] w-[20px] h-[20px] rounded-full text-white flex justify-center items-center -top-[10px] -right-[10px]">
              0
            </span>
          </div>
        </div>
      </div>
      {openCart && (
        <div className="absolute z-50 right-[15px] top-[80px]">
          <Cart setOpenCart={setOpenCart} />
        </div>
      )}
    </div>
  )
}

export default Navbar
