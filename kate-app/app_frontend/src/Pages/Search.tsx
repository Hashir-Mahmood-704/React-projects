import { SanityPostResponseType, SanityUserResponseType } from "../Type";
import { Link } from "react-router-dom";
import MasonryLayout from "../Components/MasonryLayout";
import React from "react";

const Search = ({
  allPosts,
  setFetchAllPostsAgain,
  searchText,
  userData,
}: {
  allPosts: SanityPostResponseType[];
  setFetchAllPostsAgain: React.Dispatch<React.SetStateAction<number>>;
  searchText: string;
  userData: SanityUserResponseType | null;
}) => {
  const searchedPosts = allPosts.filter(
    (post) =>
      post.category.toLowerCase().includes(searchText) ||
      post.title.toLowerCase().includes(searchText) ||
      post.about.toLowerCase().includes(searchText),
  );
  if (allPosts.length === 0)
    return (
      <div className="flex flex-col items-center gap-[20px] mt-[250px] md:mt-[100px]">
        <p className="text-xl text-center">You currently have no posts!</p>
        <Link
          to="/create-post"
          className="bg-[#ED7014] text-white py-2 px-3 rounded-md"
        >
          Create post
        </Link>
      </div>
    );
  else if (searchedPosts.length === 0)
    return (
      <div className="flex flex-col items-center gap-[20px] mt-[250px]  md:mt-[100px]">
        <p className="text-xl text-center">No such posts found!</p>
        <Link
          to="/create-post"
          className="bg-[#ED7014] text-white py-2 px-3 rounded-md"
        >
          Create some posts
        </Link>
      </div>
    );
  return (
    <div>
      <MasonryLayout
        userData={userData}
        allPosts={searchedPosts}
        setFetchAllPostsAgain={setFetchAllPostsAgain}
      />
    </div>
  );
};

export default Search;
