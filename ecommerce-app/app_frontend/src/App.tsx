import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Product from "./pages/Product"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import MobileNavbar from "./components/mobileNavbar"
import { useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
import { useDispatch } from "react-redux"
import { fetchUserData } from "./features/userDataSlice"

const Layout = () => {
  return (
    <div className="font-poppins">
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="lg:hidden">
        <MobileNavbar />
      </div>
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products/:id", element: <Products /> },
      { path: "/product/:id", element: <Product /> },
    ],
  },
])

const App = () => {
  const { isSignedIn, user } = useUser()
  const dispatch = useDispatch()
  useEffect(() => {
    if (isSignedIn) {
      console.log("Running app file useEffect, fetching user data")
      // @ts-ignore
      dispatch(fetchUserData({ id: user.id, username: user.fullName }))
    }
  }, [isSignedIn])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
