import { useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { IoSend } from "react-icons/io5"
import { v4 } from "uuid"
import { useNavigate } from "react-router-dom"
import { SanityPostDetailsResponseType } from "../Type"
import { sanityClient } from "../sanityClient"

const CommentSection = ({
  postDetailedData,
}: {
  postDetailedData: SanityPostDetailsResponseType
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
    setAddingCommentLoading(true)
    sanityClient
      .patch(postDetailedData._id)
      .setIfMissing({ comments: [] })
      .insert("after", "comments[-1]", [
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
      .then(() => {})
  }
  return (
    <div className="px-[10px] text-center pb-[10px]">
      <p className="mt-[10px]">Comments</p>

      <div className="w-full flex justify-center mt-2 bg-black items-center rounded-lg">
        <input
          type="text"
          className="bg-transparent w-full p-2 outline-none"
          placeholder="Add comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button className="mr-[10px]" onClick={addComment}>
          <IoSend size={20} />
        </button>
      </div>
    </div>
  )
}

export default CommentSection
