import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { useState } from "react";
import SignIn from "./Pages/Sign-in";
import SharedLayout from "./Pages/SharedLayout.tsx";
import CommonDataSharedLayout from "./Pages/CommonDataSharedLayout.tsx";
import { SanityPostResponseType } from "./Type.ts";
import CategoryPage from "./Pages/CategoryPage";
import Search from "./Pages/Search.tsx";
import PostDetail from "./Pages/PostDetail.tsx";
import UserProfile from "./Pages/UserProfile.tsx";
import CreatePost from "./Pages/CreatePost.tsx";

const App = () => {
  const [allPosts, setAllPosts] = useState<SanityPostResponseType[]>([]);
  const [fetchAllPostsAgain, setFetchAllPostsAgain] = useState(1);
  const [searchText, setSearchText] = useState("");
  return (
    <div className="font-poppins">
      <Routes>
        <Route
          path="/"
          element={
            <SharedLayout
              searchText={searchText}
              setSearchText={setSearchText}
            />
          }
        >
          <Route
            path="*"
            element={
              <CommonDataSharedLayout
                fetchAllPostsAgain={fetchAllPostsAgain}
                setAllPosts={setAllPosts}
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
              path="search"
              element={
                <Search
                  allPosts={allPosts}
                  setFetchAllPostsAgain={setFetchAllPostsAgain}
                  searchText={searchText}
                />
              }
            />
            <Route
              path="user-profile/:userId"
              element={
                <UserProfile
                  setFetchAllPostsAgain={setFetchAllPostsAgain}
                  allPosts={allPosts}
                />
              }
            />
          </Route>
          <Route
            path="post-detail/:postId"
            element={
              <PostDetail setFetchAllPostsAgain={setFetchAllPostsAgain} />
            }
          />
          <Route
            path="create-post"
            element={
              <CreatePost setFetchAllPostsAgain={setFetchAllPostsAgain} />
            }
          />
          <Route path="sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
