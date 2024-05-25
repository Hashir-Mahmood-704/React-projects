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
  const [fetchDetailsAgain, setFetchDetailsAgain] = useState(1)
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
  }, [fetchDetailsAgain])

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
        <p className="text-2xl mt-4">Fetching details...</p>
      </div>
    )
  else if (!postDetailedData) return <div>No data found!</div>
  return (
    <div className="flex justify-center">
      {/* container  */}
      <div className="w-full md:w-[55%] 2xl:w-[65%]">
        {/* image , buttons and loader */}
        <div className=" relative">
          {processing && (
            <div className="absolute left-0 right-0 bottom-0 top-0 bg-black/70 flex justify-center items-center">
              <Spinner />
            </div>
          )}
          {/* image */}
          <img
            src={sanityImageBuilder(postDetailedData.image.asset.url).url()}
            alt="image"
            className=" object-cover rounded-md w-full"
          />
          {/* buttons */}
          {!processing && (
            <div className="flex md:flex-col gap-[15px] absolute text-[20px] md:text-[25px] left-0  md:left-[102%] md:top-0">
              <button
                className="flex gap-[5px] items-center hover:scale-125"
                onClick={likePost}
              >
                {alreadyLiked ? <IoHeartSharp /> : <IoHeartOutline />}
                <span>
                  {postDetailedData.like ? postDetailedData.like.length : 0}
                </span>
              </button>
              <button className="hover:scale-125" onClick={savePost}>
                {alreadySaved ? <IoBookmark /> : <IoBookmarkOutline />}
              </button>
              <button
                className="text-red-600 hover:scale-125"
                onClick={removePost}
              >
                <RiDeleteBin6Fill />
              </button>
            </div>
          )}
        </div>
        {/* details */}
        <div className=" bg-neutral-900 mt-[50px] md:mt-[20px]  rounded-md p-4 flex flex-col gap-[10px]">
          <p className="font-semibold text-lg md:text-xl">
            Title:
            <span className="text-white text-xl md:text-2xl capitalize ml-[7px]">
              {postDetailedData.title}
            </span>
          </p>
          <p className="text-base md:text-lg font-semibold">
            About:
            <span className="text-white text-lg md:text-xl capitalize ml-[7px]">
              {postDetailedData.about}
            </span>
          </p>
          <div className="flex items-center gap-[10px]">
            <img
              src={postDetailedData.referenceToUser.image}
              alt="image"
              className="w-[30px] md:w-[40px] rounded-full"
            />
            <span className="text-white font-semibold">
              {postDetailedData.referenceToUser.userName}
            </span>
          </div>
        </div>

        {/* comments */}
        <div className="mt-[50px] md:mt-[20px] bg-neutral-900 pt-[10px]">
          <CommentSection
            setFetchDetailsAgain={setFetchDetailsAgain}
            postDetailedData={postDetailedData}
          />
        </div>
      </div>
    </div>
  )
}

export default PostDetail
