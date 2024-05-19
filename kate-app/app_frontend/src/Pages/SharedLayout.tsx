import { Outlet } from "react-router-dom"
import MobileNavbar from "../Components/MobileNavbar"
import DesktopSidebar from "../Components/DesktopSidebar"
import DesktopNavbar from "../Components/DesktopNavbar"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/clerk-react"

const SharedLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const { isSignedIn, userId } = useAuth()
  useEffect(() => {
    if (isSignedIn) console.log(userId)
    else console.log("not signed in")
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
