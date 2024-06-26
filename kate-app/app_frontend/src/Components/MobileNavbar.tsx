import {
  SignedIn,
  SignInButton,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { categories } from "../Utils/data";
import { MdAdd, MdOutlineSearch } from "react-icons/md";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SanityUserResponseType } from "../Type.ts";

const MobileNavbar = ({
  searchText,
  setSearchText,
  userData,
}: {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  userData: SanityUserResponseType | null;
}) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full fixed top-0 z-50 bg-black">
      <div className="flex justify-between items-center rounded-t-md w-full h-[60px] px-4 bg-neutral-900">
        <div className="cursor-pointer" onClick={() => setOpenSidebar(true)}>
          <GiHamburgerMenu size={20} />
        </div>
        <Link to="/" className="font-semibold text-xl tracking-widest">
          KATE
        </Link>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-white bg-[#ED7014] py-2 px-3 rounded-md text-sm">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            <div onClick={() => setOpenSidebar(false)}>
              <UserButton />
            </div>
            <Link
              onClick={() => setOpenSidebar(false)}
              to="/create-post"
              className="p-2 bg-neutral-900 rounded-md absolute top-[130px] right-[15px]"
            >
              <MdAdd />
            </Link>
          </div>
        </SignedIn>
      </div>
      <div className="py-4 pb-5 bg-black flex justify-center">
        <div className="w-[95%] flex items-center bg-neutral-900 px-3 py-2 2xl:py-4 rounded-lg">
          <MdOutlineSearch className="text-[20px] 2xl:text-[30px]" />
          <input
            onFocus={() => navigate("search")}
            placeholder="Search posts"
            type="text"
            className="w-full bg-transparent outline-none px-2 2xl:text-xl"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed h-screen w-full z-20 top-0 left-0 bg-black/60"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-900 h-full w-[80%] flex flex-col pt-2 justify-between border-2 border-black"
          >
            <div className="flex justify-between items-center mt-2">
              <p className="font-semibold text-2xl pl-3">KATE</p>
              <button className="mr-4" onClick={() => setOpenSidebar(false)}>
                <IoMdCloseCircle size={25} />
              </button>
            </div>
            <NavLink
              onClick={() => setOpenSidebar(false)}
              className={({ isActive }) =>
                isActive ? "border-r-[4px] border-[#ED7014] p-1" : "p-1"
              }
              to="/"
            >
              <span className="pl-3 font-semibold text-xl">Home</span>
            </NavLink>
            <div className="flex flex-col gap-[14px] -mt-[20px] items-start">
              <p className="text-white pl-3 my-3 text-[18px]">
                Explore Categories
              </p>
              <div className="flex flex-col gap-4  w-full">
                {categories.map((category, index) => (
                  <NavLink
                    onClick={() => setOpenSidebar(false)}
                    to={`category/${category.name}`}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 border-r-[4px] border-[#ED7014] w-full p-1"
                        : "flex items-center gap-4 w-full p-1"
                    }
                    key={index}
                  >
                    <img
                      src={category.image}
                      alt="image"
                      className="rounded-full w-[40px] h-[40px] object-cover ml-3"
                    />
                    <span className="text-base">{category.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="bg-[#ED7014] text-white p-2">
              <SignedIn>
                {userData && (
                  <NavLink
                    onClick={() => setOpenSidebar(false)}
                    to={`user-profile/${userData._id}`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        className="w-[35px] rounded-full"
                        src={userData.image}
                        alt="user-image"
                      />
                      <span>{userData.userName}</span>
                    </div>
                  </NavLink>
                )}
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
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
