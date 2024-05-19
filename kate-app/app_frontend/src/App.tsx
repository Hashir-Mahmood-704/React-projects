import { Routes, Route } from "react-router-dom"
import SharedLayout from "./Pages/SharedLayout"
import UserProfile from "./Pages/UserProfile"
import CategoryPage from "./Pages/CategoryPage"
import CreatePost from "./Pages/CreatePost"
import Search from "./Pages/Search"

const App = () => {
  return (
    <div className="font-poppins">
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="user-profile/:userId" element={<UserProfile />} />
          <Route path="category/:categoryName" element={<CategoryPage />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
