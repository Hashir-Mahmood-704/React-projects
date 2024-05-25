import { useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { IoSend } from "react-icons/io5"
import { v4 } from "uuid"
import { useNavigate } from "react-router-dom"
import { SanityPostDetailsResponseType } from "../Type"
import { sanityClient } from "../sanityClient"
import SingleComment from "./SingleComment"
import Spinner from "./Spinner"

const CommentSection = ({
  postDetailedData,
  setFetchDetailsAgain,
}: {
  postDetailedData: SanityPostDetailsResponseType
  setFetchDetailsAgain: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [commentText, setCommentText] = useState("")
  const { isSignedIn, user } = useUser()
  const [addingCommentLoading, setAddingCommentLoading] = useState(false)
  const navigate = useNavigate()
  function addComment() {
    if (!isSignedIn) {
      navigate("/sign-in")
      return
    }
    if (!commentText) {
      return
    }
    setAddingCommentLoading(true)
    sanityClient
      .patch(postDetailedData._id)
      .setIfMissing({ comments: [] })
      .insert("before", "comments[-1]", [
        {
          _key: v4(),
          comment: commentText,
          referenceToUser: {
            _type: "referenceToUser",
            _ref: user.id,
          },
        },
      ])
      .commit()
      .then(() => {
        setAddingCommentLoading(false)
        setFetchDetailsAgain((prev) => prev + 1)
        console.log("comment added")
      })
      .catch((err) => {
        console.log("Error in adding comment\n", err)
        setAddingCommentLoading(false)
      })
  }
  return (
    <div className="px-[10px] text-center pb-[10px]">
      <p>Comments</p>
      <div className="w-full h-[40px] flex justify-center mt-2 bg-black items-center rounded-lg">
        <input
          type="text"
          className="bg-transparent w-full p-2 outline-none"
          placeholder="Add comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button className="mx-[10px]" onClick={addComment}>
          {!addingCommentLoading ? <IoSend size={20} /> : <Spinner size={30} />}
        </button>
      </div>
      <div className="flex flex-col gap-[5px]">
        {!postDetailedData.comments ? (
          <div>
            <p>This post have no comments currently!</p>
          </div>
        ) : (
          <div className="mt-[20px] flex flex-col gap-[10px] overflow-y-auto max-h-[300px]">
            {postDetailedData.comments.map((item) => (
              <SingleComment key={item._key} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentSection
