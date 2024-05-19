import { Outlet } from "react-router-dom"
import MobileNavbar from "../Components/MobileNavbar"
import DesktopSidebar from "../Components/DesktopSidebar"
import DesktopNavbar from "../Components/DesktopNavbar"
import { useEffect, useState } from "react"
import { useAuth, useUser } from "@clerk/clerk-react"
import { sanityClient } from "../sanityClient"

const SharedLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  useEffect(() => {
    if (isSignedIn && user) {
      console.log("signed in, sending request")
      const newUserDocument = {
        _id: user.id,
        _type: "user",
        userName: user.fullName,
        image: user.imageUrl,
      }
      sanityClient
        .createIfNotExists(newUserDocument)
        .then(() => console.log("successfully created new user\n"))
        .catch((err) => console.log("error occurred\n", err))
    } else console.log("not signed in, not sending req")
  }, [isSignedIn])

  return (
    <div className="flex flex-col md:flex-row">
      {/* Mobile Layout */}
      <div className="flex md:hidden">
        <MobileNavbar
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
      </div>
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <DesktopSidebar />
      </div>
      <div className="w-full">
        <div className="hidden md:block">
          <DesktopNavbar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default SharedLayout
