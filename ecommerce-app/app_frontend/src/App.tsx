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
import { fetchAllProducts } from "./features/productsSlice"
import Search from "./pages/Search"

const Layout = () => {
  return (
    <div className="font-poppins">
      {/* const */}
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
      { path: "/products/:category", element: <Products /> },
      { path: "/product/:id", element: <Product /> },
      { path: "/search", element: <Search /> },
      // {path: "/allproducts", element: <AllProducts />}
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

  useEffect(() => {
    console.log("Running app file useEffect 2, fetching all products")
    // @ts-ignore
    dispatch(fetchAllProducts())
  }, [])
  return (
    <div className="overflow-hidden">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
