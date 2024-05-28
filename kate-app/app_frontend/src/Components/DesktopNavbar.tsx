import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  useUser,
} from "@clerk/clerk-react";
import { MdAdd, MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { sanityClient } from "../sanityClient.ts";
const DesktopNavbar = ({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    // console.log("running use effect");
    if (isSignedIn) {
      const { imageUrl, fullName, id } = user;
      const newUserDocument = {
        _id: id,
        _type: "user",
        userName: fullName,
        image: imageUrl,
      };
      console.log("Creating new user");
      sanityClient
        .createIfNotExists(newUserDocument)
        .then(() => navigate("/"))
        .catch((err) => console.log("error in creating new user\n", err));
    }
  }, []);
  return (
    <div className="bg-neutral-900 flex items-center  w-full h-[70px] 2xl:h-[80px] px-4 gap-6">
      <div className="w-full flex items-center bg-black px-3 py-2 2xl:py-3 rounded-lg">
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
      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-white bg-[#ED7014] py-2 w-[70px] rounded-md text-sm">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            <div>
              <UserButton />
            </div>
            <Link
              to="/create-post"
              className="p-2 bg-black rounded-md border border-[#ED7014] hover:bg-[#ED7014] hover:text-black"
            >
              <MdAdd />
            </Link>
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default DesktopNavbar;
