// import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { IoMdMenu } from "react-icons/io"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { IoIosCloseCircle } from "react-icons/io"
import { IoSearchOutline } from "react-icons/io5"
import { BsCart } from "react-icons/bs"
import { GoSignIn, GoSignOut } from "react-icons/go"
import Cart from "./cart"
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react"
import { useDispatch, useSelector } from "react-redux"
import {
  closeOptions,
  openOptions,
  openSidebar,
  closeSidebar,
  openCart,
  closeCart,
} from "../features/uiSlice"
import { UiInitialStateType, UserInitialStateType } from "../types"

const MobileNavbar = () => {
  const { viewCart, viewOptions, viewSidebar } = useSelector(
    (store: { ui: UiInitialStateType }) => store.ui
  )
  const { userData } = useSelector(
    (store: { user: UserInitialStateType }) => store.user
  )

  const dispatch = useDispatch()

  return (
    <div className="relative items-center h-[60px] flex justify-between px-[10px]">
      {/* hamburger */}
      <span
        onClick={() => dispatch(openSidebar())}
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
        onClick={() => dispatch(openOptions())}
        className="text-[25px] cursor-pointer"
      >
        <HiOutlineDotsVertical />
      </span>

      {/* Sidebar */}
      <AnimatePresence>
        {viewSidebar && (
          // cover
          <motion.div
            key="sidebar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeSidebar())}
            className="z-[100] h-screen w-screen overflow-y-hidden fixed bg-black/50 left-0 top-0 bottom-0"
          >
            {/* container */}
            <motion.div
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ duration: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="h-full bg-white w-[80%] flex flex-col justify-center items-center relative"
            >
              {/* close button */}
              <span
                onClick={() => dispatch(closeSidebar())}
                className="mt-[10px] text-[35px] absolute right-[12px] top-0"
              >
                <IoIosCloseCircle />
              </span>

              {/* Pages */}
              <div className="flex flex-col items-center gap-[8px] text-[24px]">
                <Link to="/">
                  <span onClick={() => dispatch(closeSidebar())}>Home</span>
                </Link>
              </div>

              {/* Categories */}
              <div className="flex flex-col items-center gap-[5px] text-[24px] mt-[50px]">
                <h3 className="font-semibold mb-[6px]">Categories</h3>
                <Link to="/products/all">
                  <span onClick={() => dispatch(closeSidebar())}>All</span>
                </Link>
                <Link to="/products/women">
                  <span onClick={() => dispatch(closeSidebar())}>Women</span>
                </Link>
                <Link to="/products/men">
                  <span onClick={() => dispatch(closeSidebar())}>Men</span>
                </Link>
                <Link to="/products/kids">
                  <span onClick={() => dispatch(closeSidebar())}>Children</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Option */}
      <AnimatePresence>
        {viewOptions && (
          <motion.div
            key="options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeOptions())}
            className="z-[100] h-screen w-screen fixed bg-transparent left-0 top-0 bottom-0"
          >
            <div className="flex flex-col items-center absolute px-[14px] w-fit right-[20px] top-[50px] bg-white border border-black text-[24px] gap-[20px] py-[10px] rounded-md">
              <IoSearchOutline />
              <SignedIn>
                <div
                  className="relative"
                  onClick={() => {
                    dispatch(closeOptions())
                    dispatch(openCart())
                  }}
                >
                  <BsCart />
                  <span className="absolute text-[12px] bg-[#2879fe] w-[20px] h-[20px] rounded-full text-white flex justify-center items-center -top-[10px] -right-[10px]">
                    {userData?.cart?.length}
                  </span>
                </div>
                <SignOutButton>
                  <GoSignOut color="#2879fe" />
                </SignOutButton>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <GoSignIn color="#2879fe" />
                </SignInButton>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart */}
      <AnimatePresence>
        {viewCart && (
          <motion.div
            key="cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCart())}
            className="z-[100] h-screen w-screen fixed bg-transparent left-0 top-0 bottom-0"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-[60px] right-[15px] z-50"
            >
              <Cart />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileNavbar
