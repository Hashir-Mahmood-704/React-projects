import { useState } from "react"
import { Link } from "react-router-dom"
import { IoMdMenu } from "react-icons/io"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { IoIosCloseCircle } from "react-icons/io"
import { IoSearchOutline } from "react-icons/io5"
import { BsPerson, BsCart } from "react-icons/bs"
import { FaRegHeart } from "react-icons/fa"

const MobileNavbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const [openOptions, setopenOptions] = useState(false)
  return (
    <div className="relative border items-center border-black h-[60px] flex justify-between px-[10px]">
      {/* hamburger */}
      <span
        onClick={() => setOpenSidebar(true)}
        className="text-[30px] cursor-pointer"
      >
        <IoMdMenu />
      </span>

      {/* center title */}
      <Link to="/">
        <span className="text-[22px] font-semibold">My Shop</span>
      </Link>

      {/* options */}
      <span
        onClick={() => setopenOptions(true)}
        className="text-[25px] cursor-pointer"
      >
        <HiOutlineDotsVertical />
      </span>

      {/* Sidebar */}
      {openSidebar && (
        // cover
        <div
          onClick={() => setOpenSidebar(false)}
          className="z-[100] h-screen w-screen overflow-y-hidden fixed bg-black/50 left-0 top-0 bottom-0"
        >
          {/* container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="h-full bg-white w-[80%] flex flex-col justify-center items-center relative"
          >
            {/* close button */}
            <span
              onClick={() => setOpenSidebar(false)}
              className="mt-[10px] text-[35px] absolute right-[12px] top-0"
            >
              <IoIosCloseCircle />
            </span>

            {/* Pages */}
            <div className="flex flex-col items-center gap-[8px] text-[24px]">
              <h3 className="font-semibold mb-[6px]">Pages</h3>
              <Link to="/">
                <span onClick={() => setOpenSidebar(false)}>Home</span>
              </Link>
              <Link to="/">
                <span onClick={() => setOpenSidebar(false)}>About</span>
              </Link>
              <Link to="/">
                <span onClick={() => setOpenSidebar(false)}>Contact</span>
              </Link>
            </div>

            {/* Categories */}
            <div className="flex flex-col items-center gap-[5px] text-[24px] mt-[50px]">
              <h3 className="font-semibold mb-[6px]">Categories</h3>
              <Link to="/">
                <span onClick={() => setOpenSidebar(false)}>Women</span>
              </Link>
              <Link to="/">
                <span onClick={() => setOpenSidebar(false)}>Men</span>
              </Link>
              <Link to="/">
                <span onClick={() => setOpenSidebar(false)}>Children</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Option */}
      {openOptions && (
        <div
          onClick={() => setopenOptions(false)}
          className="z-[100] h-screen w-screen fixed bg-transparent left-0 top-0 bottom-0"
        >
          <div className="flex flex-col items-center absolute w-[60px] right-[20px] top-[50px] bg-white border border-black text-[22px] gap-[20px] py-[10px] rounded-md">
            <BsPerson />
            <IoSearchOutline />
            <FaRegHeart />
            <div className="relative">
              <BsCart />
              <span className="absolute text-[12px] bg-[#2879fe] w-[20px] h-[20px] rounded-full text-white flex justify-center items-center -top-[10px] -right-[10px]">
                0
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileNavbar