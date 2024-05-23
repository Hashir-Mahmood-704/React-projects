import { Outlet } from "react-router-dom"
import MobileNavbar from "../Components/MobileNavbar"
import DesktopSidebar from "../Components/DesktopSidebar"
import DesktopNavbar from "../Components/DesktopNavbar"
import { useEffect, useState } from "react"
import { useAuth, useUser } from "@clerk/clerk-react"
import { sanityClient } from "../sanityClient"
import { fetchAllPosts } from "../Utils/SanityQueries"
import Spinner from "../Components/Spinner"
import { SanityPostResponseType } from "../Type"

const SharedLayout = ({
  setAllPosts,
  fetchAllPostsAgain,
  searchText,
  setSearchText,
}: {
  fetchAllPostsAgain: number
  setAllPosts: React.Dispatch<React.SetStateAction<SanityPostResponseType[]>>
  searchText: string
  setSearchText: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [loading, setLoading] = useState(false)
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  useEffect(() => {
    if (isSignedIn && user) {
      // console.log("signed in, sending request")
      const newUserDocument = {
        _id: user.id,
        _type: "user",
        userName: user.fullName,
        image: user.imageUrl,
      }
      sanityClient
        .createIfNotExists(newUserDocument)
        .then(() => {
          // console.log("successfully created new user\n")
        })
        .catch((err) => console.log("error occurred\n", err))
    } else console.log("not signed in, not sending req")
  }, [isSignedIn])

  useEffect(() => {
    setLoading(true)
    sanityClient
      .fetch(fetchAllPosts)
      .then((data) => {
        setLoading(false)
        setAllPosts(data)
      })
      .catch((err) => console.log("error in fetching posts\n", err))
  }, [fetchAllPostsAgain])
  return (
    <div className="flex flex-col md:flex-row">
      {/* Mobile Layout */}
      <div className="flex md:hidden">
        <div className="h-[60px]" />
        <MobileNavbar searchText={searchText} setSearchText={setSearchText} />
      </div>
      {/* Desktop Layout */}
      <div className="hidden md:flex">
        <div className="min-w-[250px] 2xl:min-w-[300px] border" />
        <div className="fixed">
          <DesktopSidebar />
        </div>
      </div>

      <div className="w-full">
        <div className="hidden md:block">
          <div className=" left-[250px] 2xl:left-[300px] right-0 z-50 fixed">
            <DesktopNavbar
              searchText={searchText}
              setSearchText={setSearchText}
            />
          </div>
          <div className="w-full h-[60px]" />
        </div>

        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center mt-[200px]">
              <Spinner />
              <p className="text-2xl mt-4">Fetching posts...</p>
            </div>
          ) : (
            <div className="p-4 mt-[10px] md:mt-0  ">
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SharedLayout
