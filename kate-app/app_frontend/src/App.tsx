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
  const [allPosts, setAllPosts] = useState<SanityPostResponseType[]>([])
  const [fetchAllPostsAgain, setFetchAllPostsAgain] = useState(1)
  const [searchText, setSearchText] = useState("")
  return (
    <div className="font-poppins hide-scrollbar">
      <Routes>
        <Route
          path="/"
          element={
            <SharedLayout
              setAllPosts={setAllPosts}
              fetchAllPostsAgain={fetchAllPostsAgain}
              searchText={searchText}
              setSearchText={setSearchText}
            />
          }
        >
          <Route
            index
            element={
              <div className="flex">
                <Home
                  allPosts={allPosts}
                  setFetchAllPostsAgain={setFetchAllPostsAgain}
                />
              </div>
            }
          />
          <Route
            path="category/:categoryName"
            element={
              <CategoryPage
                allPosts={allPosts}
                setFetchAllPostsAgain={setFetchAllPostsAgain}
              />
            }
          />
          <Route
            path="/search"
            element={
              <Search
                allPosts={allPosts}
                setFetchAllPostsAgain={setFetchAllPostsAgain}
                searchText={searchText}
              />
            }
          />
          <Route path="user-profile/:userId" element={<UserProfile />} />
          <Route
            path="/create-post"
            element={
              <CreatePost setFetchAllPostsAgain={setFetchAllPostsAgain} />
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
