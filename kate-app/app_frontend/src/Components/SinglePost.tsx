import { SanityPostResponseType, SanityUserResponseType } from "../Type"
import { sanityClient, sanityImageBuilder } from "../sanityClient"
import React, { useState } from "react"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { v4 } from "uuid"
import {
  IoBookmarkOutline,
  IoBookmark,
  IoHeartOutline,
  IoHeartSharp,
} from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import Spinner from "./Spinner"

const SinglePost = ({
  item,
  setFetchAllPostsAgain,
  userData,
}: {
  item: SanityPostResponseType
  setFetchAllPostsAgain: React.Dispatch<React.SetStateAction<number>>
  userData: SanityUserResponseType | null
}) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const alreadySaved = item.save?.find(
    (x) => x.referenceToUser._id === userData?._id
  )
  const alreadyLiked = item.like?.find(
    (x) => x.referenceToUser._id === userData?._id
  )

  function savePost(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    if (!userData) {
      navigate("/sign-in")
      return
    }
    if (!alreadySaved) {
      setLoading(true)
      sanityClient
        .patch(item._id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: v4(),
            userId: userData._id,
            referenceToUser: {
              _type: "referenceToUser",
              _ref: userData._id,
            },
          },
        ])
        .commit()
        .then(() => {
          setFetchAllPostsAgain((prev) => prev + 1)
          // setAlreadySaved(true)
          setLoading(false)
        })
        .catch((err) => {
          console.log("error in saving post\n", err)
          setLoading(false)
        })
    } else if (alreadySaved) {
      setLoading(true)
      const indexToRemove = item.save?.findIndex(
        (x) => x.referenceToUser._id === userData._id
      )
      sanityClient
        .patch(item._id)
        .unset([`save[${indexToRemove}]`])
        .commit()
        .then(() => {
          setFetchAllPostsAgain((prev) => prev + 1)
          setLoading(false)
        })
        .catch((err) => {
          console.log("error in unsaving post\n", err)
          setLoading(false)
        })
    }
  }

  function likePost(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    if (!userData) {
      navigate("/sign-in")
      return
    }
    if (!alreadyLiked) {
      setLoading(true)
      sanityClient
        .patch(item._id)
        .setIfMissing({ like: [] })
        .insert("after", "like[-1]", [
          {
            _key: v4(),
            userId: userData._id,
            referenceToUser: {
              _type: "referenceToUser",
              _ref: userData._id,
            },
          },
        ])
        .commit()
        .then(() => {
          setFetchAllPostsAgain((prev) => prev + 1)
          setLoading(false)
        })
        .catch((err) => {
          console.log("error in liking post\n", err)
          setLoading(false)
        })
    } else if (alreadyLiked) {
      setLoading(true)
      const indexToRemove = item.like?.findIndex(
        (x) => x.referenceToUser._id === userData._id
      )
      sanityClient
        .patch(item._id)
        .unset([`like[${indexToRemove}]`])
        .commit()
        .then(() => {
          setFetchAllPostsAgain((prev) => prev + 1)
          setLoading(false)
        })
        .catch((err) => {
          console.log("error in unliking post\n", err)
          setLoading(false)
        })
    }
  }

  function removePost(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    setLoading(true)
    sanityClient
      .delete(item._id)
      .then(() => {
        setFetchAllPostsAgain((prev) => prev + 1)
        setLoading(false)
      })
      .catch((err) => {
        console.log("error in deleting post\n", err)
        setLoading(false)
      })
  }

  return (
    <div
      onClick={() => navigate(`/post-detail/${item._id}`)}
      className="bg-neutral-900 pb-[10px] rounded-md relative mt-[25px]"
    >
      {loading && (
        <div className="bg-black/70 absolute top-0 left-0 z-20 w-full h-full flex justify-center items-center">
          <Spinner size={50} />
        </div>
      )}
      <img
        className="rounded-md"
        src={sanityImageBuilder(item.image.asset.url).width(600).url()}
        alt="image"
      />

      <div className="flex  flex-col mt-1 px-3">
        <div className="mt-1 mb-3 text-lg text-white capitalize">
          {item.title.length > 20
            ? `${item.title.slice(0, 20)} .....`
            : item.title}
        </div>
        <div className="flex justify-between w-full relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/user-profile/${item.referenceToUser._id}`)
            }}
          >
            <img
              src={item.referenceToUser.image}
              alt="user-image"
              className="w-[30px] rounded-full"
            />
            <p>{item.referenceToUser.userName}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-1 text-lg hover:scale-125"
              onClick={likePost}
            >
              {item.like?.length}
              {alreadyLiked ? (
                <IoHeartSharp size={20} />
              ) : (
                <IoHeartOutline size={20} />
              )}
            </button>
            <button
              className="flex items-center gap-1 hover:scale-125"
              onClick={savePost}
            >
              {alreadySaved ? (
                <IoBookmark size={20} />
              ) : (
                <IoBookmarkOutline size={20} />
              )}
            </button>
            {userData && item.referenceToUser._id === userData._id && (
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
    </div>
  )
}

export default SinglePost
