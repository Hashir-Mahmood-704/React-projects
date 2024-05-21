import { SignedIn, SignInButton, SignedOut, useUser } from "@clerk/clerk-react"
import { NavLink } from "react-router-dom"
import { categories } from "../Utils/data"
const DesktopSidebar = () => {
  const { user } = useUser()
  return (
    <div className="bg-neutral-900 h-screen w-[250px] 2xl:w-[300px] flex flex-col pt-2 justify-between">
      <p className="font-semibold text-2xl pl-4 bg-black p-1 2xl:text-3xl 2xl:p-2 2xl:pl-5">
        KATE
      </p>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "border-r-[4px] border-[#ED7014]  hover:bg-[#ED7014] hover:text-black p-1 2xl:p-2"
            : " hover:bg-[#ED7014] hover:text-black p-1 2xl:p-2"
        }
        to="/"
      >
        <span className="pl-4 2xl:text-lg">Home</span>
      </NavLink>
      <div className="flex flex-col gap-5  items-start">
        <p className="text-white text-lg 2xl:text-xl pl-4">
          Explore Categories
        </p>
        <div className="flex flex-col gap-[14px] 2xl:gap-[22px] w-full">
          {categories.map((category, index) => (
            <NavLink
              to={`category/${category.name}`}
              className={({ isActive }) =>
                isActive
                  ? "relative flex items-center gap-3 border-r-[4px] border-[#ED7014] w-full p-1 hover:bg-[#ED7014] hover:text-black"
                  : "relative flex items-center gap-4 w-full  hover:bg-[#ED7014] hover:text-black p-1"
              }
              key={index}
            >
              <img
                src={category.image}
                alt="image"
                className="rounded-full w-[30px] h-[30px] 2xl:w-[40px] 2xl:h-[40px] object-cover ml-2"
              />
              <span className="text-sm 2xl:text-lg absolute left-[55px] 2xl:left-[65px]">
                {category.name}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="bg-[#ED7014] text-white">
        <SignedIn>
          <NavLink to={`user-profile/${user?.id}`}>
            <div className="flex items-center gap-3 p-2 2xl:text-xl">
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
            <button className="text-white h-full py-2 px-3 rounded-md text-sm w-full 2xl:text-lg">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  )
}

export default DesktopSidebar
