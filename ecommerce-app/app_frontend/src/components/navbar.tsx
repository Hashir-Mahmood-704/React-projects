import { Link } from "react-router-dom"
import { IoSearch } from "react-icons/io5"
import { BsCart } from "react-icons/bs"
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
import { UiInitialStateType, UserInitialStateType } from "../types"
import { AnimatePresence, motion } from "framer-motion"

const Navbar = () => {
  const { viewCart } = useSelector(
    (store: { ui: UiInitialStateType }) => store.ui
  )
  const { userData } = useSelector(
    (store: { user: UserInitialStateType }) => store.user
  )

  const dispatch = useDispatch()
  return (
    <motion.div
      className="flex justify-between h-[80px] items-center px-[20px] relative"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Left */}

      <div className="flex gap-[25px]">
        <div className="flex gap-[25px]">
          <motion.span whileHover={{ scale: 1.2 }}>
            <Link to="/products/all">All</Link>
          </motion.span>
          <motion.span whileHover={{ scale: 1.2 }}>
            <Link to="/products/men">Men</Link>
          </motion.span>
          <motion.span whileHover={{ scale: 1.2 }}>
            <Link to="/products/women">Women</Link>
          </motion.span>
          <motion.span whileHover={{ scale: 1.2 }}>
            <Link to="/products/kids">Kids</Link>
          </motion.span>
        </div>
      </div>

      {/* Center */}
      <motion.div
        whileHover={{ color: "#0124" }}
        className="text-[30px] absolute left-[50%] -translate-x-[60%] h-full flex items-center"
      >
        <Link to="/">MyStore</Link>
      </motion.div>

      {/* Right */}
      <div className="flex gap-[25px] items-center ">
        {/* Links */}
        <motion.div
          whileHover={{ scale: 1.3 }}
          className="flex items-center gap-[25px]"
        >
          <Link to="/">Homepage</Link>
        </motion.div>
        {/* Icons */}
        <div className="flex gap-[15px] items-center text-[#5c5c5c] cursor-pointer text-[18px]">
          <motion.span whileHover={{ scale: 1.4 }}>
            <Link to="/search">
              <IoSearch />
            </Link>
          </motion.span>
          {/* <BsPerson /> */}
          <SignedOut>
            <SignInButton mode="modal">
              <motion.button
                whileHover={{ scale: 1.3 }}
                className="text-white bg-[#2879fe] text-[16px] p-2 rounded-md"
              >
                Sign in
              </motion.button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <motion.div
              whileHover={{ scale: 1.3 }}
              className="relative"
              onClick={() => dispatch(openCart())}
            >
              <BsCart />
              <span className="absolute text-[12px] bg-[#2879fe] w-[20px] h-[20px] rounded-full text-white flex justify-center items-center -top-[10px] -right-[10px]">
                {userData?.cart?.length}
              </span>
            </motion.div>

            <SignOutButton>
              <motion.span whileHover={{ scale: 1.4 }}>
                <GoSignOut color="#2879fe" />
              </motion.span>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
      <AnimatePresence>
        {viewCart && (
          <motion.div
            key="cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCart())}
            className="bg-transparent fixed top-0 left-0 right-0 bottom-0 h-full z-50 "
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute z-50 right-[15px] top-[80px]"
            >
              <Cart />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Navbar
