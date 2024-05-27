import { SanityPostResponseType } from "../Type";
import { Link } from "react-router-dom";
import MasonryLayout from "../Components/MasonryLayout";
import React from "react";

const Home = ({
  allPosts,
  setFetchAllPostsAgain,
}: {
  allPosts: SanityPostResponseType[];
  setFetchAllPostsAgain: React.Dispatch<React.SetStateAction<number>>;
}) => {
  if (allPosts.length === 0)
    return (
      <div className="flex flex-col items-center gap-[20px] mt-[170px]">
        <p className="text-xl">You currently have no posts!</p>
        <Link
          to="/create-post"
          className="bg-[#ED7014] hover:bg-amber-700 text-white py-2 px-3 rounded-md"
        >
          Create post
        </Link>
      </div>
    );
  return (
    <div>
      <MasonryLayout
        allPosts={allPosts}
        setFetchAllPostsAgain={setFetchAllPostsAgain}
      />
    </div>
  );
};

export default Home;
