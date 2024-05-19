import { SignedIn, SignInButton, SignedOut, useUser } from "@clerk/clerk-react"

import { NavLink } from "react-router-dom"
import { categories } from "../Utils/data"
const DesktopSidebar = () => {
  const { user } = useUser()
  return (
    <div className="bg-neutral-900 h-screen w-[16%] min-w-[250px] flex flex-col pt-2 justify-between">
      <p className="font-semibold text-2xl pl-4 bg-black p-1">KATE</p>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "border-r-[4px] border-[#ED7014] -mt-[15px] hover:bg-[#ED7014] hover:text-black p-1"
            : "-mt-[15px] hover:bg-[#ED7014] hover:text-black p-1"
        }
        to="/"
      >
        <span className="pl-4">Home</span>
      </NavLink>
      <div className="flex flex-col gap-5 -mt-[20px] items-start">
        <p className="text-white text-lg pl-4">Explore Categories</p>
        <div className="flex flex-col gap-[14px] w-full">
          {categories.map((category, index) => (
            <NavLink
              to={`category/${category.name}`}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 border-r-[4px] border-[#ED7014] w-full p-1"
                  : "flex items-center gap-4 w-full hover:bg-[#ED7014] hover:text-black p-1"
              }
              key={index}
            >
              <img
                src={category.image}
                alt="image"
                className="rounded-full w-[30px] h-[30px] object-cover ml-2"
              />
              <span className="text-sm">{category.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="bg-[#ED7014] text-white p-2">
        <SignedIn>
          <NavLink to={`user-profile/${user?.id}`}>
            <div className="flex items-center gap-3">
              <img
                className="w-[35px] rounded-full"
                src={user?.imageUrl}
                alt="user-image"
              />
              <span>{user?.fullName}</span>
            </div>
          </NavLink>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-white bg-[#ED7014] py-2 px-3 rounded-md text-sm w-full">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  )
}

export default DesktopSidebar
