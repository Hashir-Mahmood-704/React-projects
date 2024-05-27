import { SanityPostResponseType } from "../Type";
import Masonry from "react-masonry-css";
import SinglePost from "./SinglePost";
import React from "react";

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1400: 4,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({
  allPosts,
  setFetchAllPostsAgain,
}: {
  allPosts: SanityPostResponseType[];
  setFetchAllPostsAgain: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div>
      <Masonry
        className="flex gap-[10px] mt-[30px] md:mt-[0px]"
        breakpointCols={breakpointColumnsObj}
      >
        {allPosts.map((item) => (
          <SinglePost
            key={item._id}
            item={item}
            setFetchAllPostsAgain={setFetchAllPostsAgain}
          />
        ))}
      </Masonry>
    </div>
  );
};

export default MasonryLayout;
