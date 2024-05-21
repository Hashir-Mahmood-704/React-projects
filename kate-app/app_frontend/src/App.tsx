import { Routes, Route } from "react-router-dom"
import SharedLayout from "./Pages/SharedLayout"
import UserProfile from "./Pages/UserProfile"
import CategoryPage from "./Pages/CategoryPage"
import CreatePost from "./Pages/CreatePost"
import Search from "./Pages/Search"
import Home from "./Pages/Home"
import { useState } from "react"
import { SanityPostResponseType } from "./Type"

const App = () => {
  const [allPosts, setAllPosts] = useState<SanityPostResponseType[] | null>(
    null
  )
  const [fetchAllPostsAgain, setFetchAllPostsAgain] = useState(1)
  return (
    <div className="font-poppins">
      <Routes>
        <Route
          path="/"
          element={
            <SharedLayout
              setAllPosts={setAllPosts}
              fetchAllPostsAgain={fetchAllPostsAgain}
            />
          }
        >
          <Route
            index
            element={
              <Home
                allPosts={allPosts}
                setFetchAllPostsAgain={setFetchAllPostsAgain}
              />
            }
          />
          <Route path="category/:categoryName" element={<CategoryPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="user-profile/:userId" element={<UserProfile />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
