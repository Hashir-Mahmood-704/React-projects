import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import MobileNavbar from "../components/MobileNavbar"

const Layout = () => {
  return (
    <div>
      <Navbar />
      <MobileNavbar />
      <Outlet />
    </div>
  )
}

export default Layout
