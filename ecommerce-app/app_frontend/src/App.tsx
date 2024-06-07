import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Product from "./pages/Product"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import MobileNavbar from "./components/mobileNavbar"

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
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
