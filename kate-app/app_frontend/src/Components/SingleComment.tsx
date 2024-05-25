type Props = {
  _key: string
  comment: string
  referenceToUser: {
    _id: string
    userName: string
    image: string
  }
}

const SingleComment = ({ comment, referenceToUser }: Props) => {
  return (
    <div className="w-full flex items-center gap-[20px]  bg-black rounded-md">
      <div className="border-r border-[#ED7014] flex flex-col items-center h-full justify-center py-2 px-3">
        <img
          src={referenceToUser.image}
          alt="userImage"
          className="w-[20px] rounded-full"
        />
        <span className="text-xs">
          {referenceToUser.userName.length > 15
            ? referenceToUser.userName.slice(0, 14)
            : referenceToUser.userName}
        </span>
      </div>
      <p className="w-full text-sm p-2">{comment}</p>
    </div>
  )
}

export default SingleComment
