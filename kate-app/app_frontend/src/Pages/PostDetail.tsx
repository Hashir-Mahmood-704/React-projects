import { useParams } from "react-router-dom"
import Spinner from "../Components/Spinner"
import { useState, useEffect } from "react"
import { sanityClient, sanityImageBuilder } from "../sanityClient"
import { postDetailQuery } from "../Utils/SanityQueries"
import { SanityPostDetailsResponseType } from "../Type"
import { useAuth } from "@clerk/clerk-react"
import {
  IoBookmarkOutline,
  IoBookmark,
  IoHeartOutline,
  IoHeartSharp,
} from "react-icons/io5"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { v4 } from "uuid"
import CommentSection from "../Components/CommentSection"

const PostDetail = ({
  setFetchAllPostsAgain,
}: {
  setFetchAllPostsAgain: React.Dispatch<React.SetStateAction<number>>
}) => {
  const { postId } = useParams()
  const [postDetailedData, setPostDetailedData] =
    useState<SanityPostDetailsResponseType>()
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const { userId } = useAuth()
  const navigate = useNavigate()
  const alreadySaved = postDetailedData?.save?.find(
    (x) => x.referenceToUser._id === userId
  )
  const alreadyLiked = postDetailedData?.like?.find(
    (x) => x.referenceToUser._id === userId
  )
  useEffect(() => {
    if (postId) {
      setLoading(true)
      const query = postDetailQuery(postId)
      sanityClient
        .fetch(query)
        .then((data) => {
          setPostDetailedData(data[0])
          setLoading(false)
        })
        .catch((err) => {
          console.log("error in fetching post details data\n", err)
          setLoading(false)
        })
    }
  }, [])

  function savePost() {
    if (postDetailedData) {
      if (!alreadySaved) {
        setProcessing(true)
        sanityClient
          .patch(postDetailedData._id)
          .setIfMissing({ save: [] })
          .insert("after", "save[-1]", [
            {
              _key: v4(),
              userId: userId,
              referenceToUser: {
                _type: "referenceToUser",
                _ref: userId,
              },
            },
          ])
          .commit()
          .then(() => {
            setProcessing(false)
            setFetchAllPostsAgain((prev) => prev + 1)
          })
          .catch((err) => {
            console.log("error in saving post\n", err)
            setProcessing(false)
            setFetchAllPostsAgain((prev) => prev + 1)
          })
      } else if (alreadySaved) {
        setProcessing(true)
        const indexToRemove = postDetailedData.save?.findIndex(
          (x) => x.referenceToUser._id === userId
        )
        sanityClient
          .patch(postDetailedData._id)
          .unset([`save[${indexToRemove}]`])
          .commit()
          .then(() => {
            setProcessing(false)
            setFetchAllPostsAgain((prev) => prev + 1)
          })
          .catch((err) => {
            console.log("error in unsaving post\n", err)
            setProcessing(false)
          })
      }
    }
  }

  function likePost() {
    if (postDetailedData) {
      if (!alreadyLiked) {
        setProcessing(true)
        sanityClient
          .patch(postDetailedData._id)
          .setIfMissing({ like: [] })
          .insert("after", "like[-1]", [
            {
              _key: v4(),
              userId: userId,
              referenceToUser: {
                _type: "referenceToUser",
                _ref: userId,
              },
            },
          ])
          .commit()
          .then(() => {
            setProcessing(false)
            setFetchAllPostsAgain((prev) => prev + 1)
          })
          .catch((err) => {
            console.log("error in liking post\n", err)
            setProcessing(false)
          })
      } else if (alreadyLiked) {
        setProcessing(true)
        const indexToRemove = postDetailedData.like?.findIndex(
          (x) => x.referenceToUser._id === userId
        )
        sanityClient
          .patch(postDetailedData._id)
          .unset([`like[${indexToRemove}]`])
          .commit()
          .then(() => {
            setProcessing(false)
            setFetchAllPostsAgain((prev) => prev + 1)
          })
          .catch((err) => {
            console.log("error in unliking post\n", err)
            setProcessing(false)
          })
      }
    }
  }

  function removePost() {
    if (postDetailedData) {
      setProcessing(true)
      sanityClient
        .delete(postDetailedData._id)
        .then(() => {
          setFetchAllPostsAgain((prev) => prev + 1)
          setProcessing(false)
          navigate("/")
        })
        .catch((err) => {
          console.log("error in deleting post\n", err)
          setProcessing(false)
        })
    }
  }
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mt-[185px]">
        <Spinner />
        <p className="text-2xl mt-4">Fetching posts...</p>
      </div>
    )
  else if (!postDetailedData) return <div>No data found!</div>
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center  md:mt-[0px] mt-[85px]">
        <div className="flex flex-col items-center  p-4 rounded-md bg-neutral-900 relative">
          {processing && (
            <div className="flex justify-center items-center absolute bg-black/70 top-0 left-0 right-0 bottom-0">
              <Spinner />
            </div>
          )}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:min-w-[350px] md:min-h-[250px]">
              <img
                className="max-h-[350px] rounded-md w-[320px] md:w-full"
                src={sanityImageBuilder(postDetailedData.image.asset.url)
                  .width(450)
                  .url()}
                alt="image"
              />
            </div>
            <div className="flex flex-col gap-4 max-w-[200px]">
              <p className="text-2xl text-white flex">
                Title:
                <span
                  className="font-semibold text-[#ED7014] ml-2 capitalize w-full"
                  style={{ overflowWrap: "break-word" }}
                >
                  {postDetailedData.title}
                </span>
              </p>
              <p className="text-lg text-white">
                About:
                <span
                  className="font-semibold text-[#ED7014] ml-2 capitalize w-full"
                  style={{ overflowWrap: "break-word" }}
                >
                  {postDetailedData.about}
                </span>
              </p>
              <div>
                <p>Posted by:</p>
                <div
                  className="flex items-center gap-2 cursor-pointer mt-[10px]"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/user-profile/${userId}`)
                  }}
                >
                  <img
                    src={postDetailedData.referenceToUser.image}
                    alt="user-image"
                    className="w-[30px] rounded-full"
                  />
                  <p>{postDetailedData.referenceToUser.userName}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-[10px] mt-[20px]">
            <button
              className="flex items-center gap-1 text-lg hover:scale-125"
              onClick={likePost}
            >
              {postDetailedData.like?.length}
              {alreadyLiked ? (
                <IoHeartSharp size={30} />
              ) : (
                <IoHeartOutline size={30} />
              )}
            </button>
            <button
              className="flex items-center gap-1 hover:scale-125"
              onClick={savePost}
            >
              {alreadySaved ? (
                <IoBookmark size={30} />
              ) : (
                <IoBookmarkOutline size={30} />
              )}
            </button>

            {postDetailedData.referenceToUser._id === userId && (
              <button
                onClick={removePost}
                className="hover:scale-125 text-red-600"
              >
                <RiDeleteBin6Fill size={30} />
              </button>
            )}
          </div>
        </div>
        <div className="w-full  bg-neutral-900 mt-[15px]">
          <CommentSection postDetailedData={postDetailedData} />
        </div>
      </div>
    </div>
  )
}

export default PostDetail
