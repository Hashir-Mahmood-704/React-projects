import { useEffect } from "react"
import { Link } from "react-router-dom"
import { IoMdMenu } from "react-icons/io"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { IoIosCloseCircle, IoMdHeartEmpty } from "react-icons/io"
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
import { UiInitialStateType } from "../types"

const MobileNavbar = () => {
  const { viewCart, viewOptions, viewSidebar } = useSelector(
    (store: { ui: UiInitialStateType }) => store.ui
  )
  const dispatch = useDispatch()
  useEffect(() => {
    if (viewCart || viewOptions) {
      // Disable background scrolling
      document.body.style.overflow = "hidden"
    } else {
      // Enable background scrolling
      document.body.style.overflow = "auto"
    }

    // Clean up the effect when the component unmounts
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [viewCart, viewOptions])

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
      {viewSidebar && (
        // cover
        <div
          onClick={() => dispatch(closeSidebar())}
          className="z-[100] h-screen w-screen overflow-y-hidden fixed bg-black/50 left-0 top-0 bottom-0"
        >
          {/* container */}
          <div
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
              <h3 className="font-semibold mb-[6px]">Pages</h3>
              <Link to="/">
                <span onClick={() => dispatch(closeSidebar())}>Home</span>
              </Link>
              <Link to="/">
                <span onClick={() => dispatch(closeSidebar())}>About</span>
              </Link>
              <Link to="/">
                <span onClick={() => dispatch(closeSidebar())}>Contact</span>
              </Link>
            </div>

            {/* Categories */}
            <div className="flex flex-col items-center gap-[5px] text-[24px] mt-[50px]">
              <h3 className="font-semibold mb-[6px]">Categories</h3>
              <Link to="/">
                <span onClick={() => dispatch(closeSidebar())}>Women</span>
              </Link>
              <Link to="/">
                <span onClick={() => dispatch(closeSidebar())}>Men</span>
              </Link>
              <Link to="/">
                <span onClick={() => dispatch(closeSidebar())}>Children</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Option */}
      {viewOptions && (
        <div
          onClick={() => dispatch(closeOptions())}
          className="z-[100] h-screen w-screen fixed bg-transparent left-0 top-0 bottom-0"
        >
          <div className="flex flex-col items-center absolute px-[14px] w-fit right-[20px] top-[50px] bg-white border border-black text-[24px] gap-[20px] py-[10px] rounded-md">
            <IoSearchOutline />
            <SignedIn>
              <IoMdHeartEmpty />
              <div
                className="relative"
                onClick={() => {
                  dispatch(closeOptions())
                  dispatch(openCart())
                }}
              >
                <BsCart />
                <span className="absolute text-[12px] bg-[#2879fe] w-[20px] h-[20px] rounded-full text-white flex justify-center items-center -top-[10px] -right-[10px]">
                  0
                </span>
              </div>
              <SignOutButton>
                <GoSignOut />
              </SignOutButton>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <GoSignIn />
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      )}

      {viewCart && (
        <div
          onClick={() => dispatch(closeCart())}
          className="z-[100] h-screen w-screen fixed bg-transparent left-0 top-0 bottom-0"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-[60px] right-[15px] z-50"
          >
            <Cart />
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileNavbar
