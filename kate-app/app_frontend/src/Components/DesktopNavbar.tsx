import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react"
import { MdAdd, MdOutlineSearch } from "react-icons/md"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
const DesktopNavbar = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-neutral-900 flex items-center  w-full h-[60px] px-4 gap-6">
      <div className="w-full flex items-center bg-black px-3 py-2 rounded-lg">
        <MdOutlineSearch size={20} />
        <input
          onFocus={() => navigate("search")}
          placeholder="Search posts"
          type="text"
          className="w-full bg-transparent outline-none px-2 "
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
            <UserButton />
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
  )
}

export default DesktopNavbar
