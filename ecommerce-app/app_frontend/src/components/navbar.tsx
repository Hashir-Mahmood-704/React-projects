// import { IoIosArrowDown } from "react-icons/io"
import { Link } from "react-router-dom"
import { IoSearch } from "react-icons/io5"
import { BsCart } from "react-icons/bs"
import { FaRegHeart } from "react-icons/fa"
import Cart from "./cart"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { closeCart, openCart } from "../features/uiSlice"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react"
import { GoSignOut } from "react-icons/go"
import { UiInitialStateType } from "../types"

const Navbar = () => {
  const { viewCart } = useSelector(
    (store: { ui: UiInitialStateType }) => store.ui
  )
  const dispatch = useDispatch()
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
          <Link to="/products/all">All</Link>
          <Link to="/products/men">Men</Link>
          <Link to="/products/women">Women</Link>
          <Link to="/products/kids">Kids</Link>
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
          <IoSearch />
          {/* <BsPerson /> */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-white bg-[#2879fe] text-[16px] p-2 rounded-md">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <FaRegHeart />
            <div className="relative" onClick={() => dispatch(openCart())}>
              <BsCart />
              <span className="absolute text-[12px] bg-[#2879fe] w-[20px] h-[20px] rounded-full text-white flex justify-center items-center -top-[10px] -right-[10px]">
                0
              </span>
            </div>
            <SignOutButton>
              <GoSignOut />
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
      {viewCart && (
        <div
          onClick={() => dispatch(closeCart())}
          className="bg-transparent fixed top-0 left-0 right-0 bottom-0 h-full z-50 "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute z-50 right-[15px] top-[80px]"
          >
            <Cart />
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
