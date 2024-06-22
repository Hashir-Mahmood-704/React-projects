import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Exercises from "./pages/Exercises"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/exercises",
        element: <Exercises />,
      },
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
