import { SanityPostResponseType } from "../Type"
import { sanityClient, sanityImageBuilder } from "../sanityClient"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/clerk-react"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { v4 } from "uuid"
import {
  IoBookmarkOutline,
  IoBookmark,
  IoHeartOutline,
  IoHeartSharp,
} from "react-icons/io5"
import Spinner from "./Spinner"

const SinglePost = ({
  item,
  setFetchAllPostsAgain,
}: {
  item: SanityPostResponseType
  setFetchAllPostsAgain: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false)
  const [alreadySaved, setAlreadySaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const { userId, isSignedIn } = useAuth()
  useEffect(() => {
    if (item.save?.find((x) => x.referenceToUser._id === userId)) {
      console.log("this post is already saved by user")
      setAlreadySaved(true)
    } else {
      console.log("this post is not saved by user")
      setAlreadySaved(false)
    }
    if (item.like?.find((x) => x.referenceToUser._id === userId)) {
      console.log("this post is already liked by user")
      setAlreadyLiked(true)
    } else {
      console.log("this post is not liked by user")
      setAlreadyLiked(false)
    }
  }, [isSignedIn])

  function savePost() {
    if (!alreadySaved) {
      setLoading(true)
      sanityClient
        .patch(item._id)
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
          setFetchAllPostsAgain((prev) => prev + 1)
          setAlreadySaved(true)
          setLoading(false)
        })
        .catch((err) => console.log("error in saving post\n", err))
    } else if (alreadySaved) {
      setLoading(true)
      const indexToRemove = item.save?.findIndex(
        (x) => x.referenceToUser._id === userId
      )
      sanityClient
        .patch(item._id)
        .unset([`save[${indexToRemove}]`])
        .commit()
        .then(() => {
          setFetchAllPostsAgain((prev) => prev + 1)
          setAlreadySaved(false)
          setLoading(false)
        })
        .catch((err) => console.log("error in unsaving post\n", err))
    }
  }

  function likePost() {
    if (!alreadyLiked) {
      setLoading(true)
      sanityClient
        .patch(item._id)
        .setIfMissing({ like: [] })
        .insert("after", "like[-1]", [
          {
            _key: v4(),
            referenceToUser: {
              _type: "referenceToUser",
              _ref: userId,
            },
          },
        ])
        .commit()
        .then(() => {
          setFetchAllPostsAgain((prev) => prev + 1)
          setAlreadyLiked(true)
          setLoading(false)
        })
        .catch((err) => console.log("error in liking post\n", err))
    } else if (alreadyLiked) {
      setLoading(true)
      const indexToRemove = item.like?.findIndex(
        (x) => x.referenceToUser._id === userId
      )
      sanityClient
        .patch(item._id)
        .unset([`like[${indexToRemove}]`])
        .commit()
        .then(() => {
          setFetchAllPostsAgain((prev) => prev + 1)
          setAlreadyLiked(false)
          setLoading(false)
        })
        .catch((err) => console.log("error in unliking post\n", err))
    }
  }

  function removePost() {}

  return (
    <div className="bg-neutral-900 pb-[10px] rounded-md relative">
      {loading && (
        <div className="bg-black/70 absolute top-0 left-0 z-20 w-full h-full flex justify-center items-center">
          <Spinner size={50} />
        </div>
      )}
      <img
        className="rounded-md"
        src={sanityImageBuilder(item.image.asset.url).width(400).url()}
        alt="image"
      />

      <div className="flex justify-between items-center mt-3 px-3">
        <div className="flex items-center gap-2">
          <img
            src={item.referenceToUser.image}
            alt="user-image"
            className="w-[30px] rounded-full"
          />
          <p>{item.referenceToUser.userName}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-1 text-lg
            "
            onClick={likePost}
          >
            {item.like?.length}
            {alreadyLiked ? (
              <span className="hover:scale-125">
                <IoHeartSharp size={20} />
              </span>
            ) : (
              <span className="hover:scale-125">
                <IoHeartOutline size={20} />
              </span>
            )}
          </button>
          <button
            className="flex items-center gap-1 text-xl hover:scale-125"
            onClick={savePost}
          >
            {alreadySaved ? (
              <IoBookmark size={20} />
            ) : (
              <IoBookmarkOutline size={20} />
            )}
          </button>
          {item.referenceToUser._id === userId && (
            <button
              onClick={removePost}
              className="hover:scale-125 text-red-600"
            >
              <RiDeleteBin6Fill size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SinglePost
