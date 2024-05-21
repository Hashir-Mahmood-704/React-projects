import { SanityPostResponseType } from "../Type"
import Masonry from "react-masonry-css"
import SinglePost from "./SinglePost"

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1400: 4,
  1200: 3,
  1000: 2,
  500: 1,
}

const MasonryLayout = ({
  allPosts,
  setFetchAllPostsAgain,
}: {
  allPosts: SanityPostResponseType[]
  setFetchAllPostsAgain: React.Dispatch<React.SetStateAction<number>>
}) => {
  return (
    <Masonry className="flex gap-[10px]" breakpointCols={breakpointColumnsObj}>
      {allPosts.map((item) => (
        <SinglePost
          key={item._id}
          item={item}
          setFetchAllPostsAgain={setFetchAllPostsAgain}
        />
      ))}
    </Masonry>
  )
}

export default MasonryLayout
