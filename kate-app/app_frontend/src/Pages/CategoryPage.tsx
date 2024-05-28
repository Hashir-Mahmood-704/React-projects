import { SanityPostResponseType, SanityUserResponseType } from "../Type";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MasonryLayout from "../Components/MasonryLayout";
import React from "react";

const CategoryPage = ({
  allPosts,
  setFetchAllPostsAgain,
  userData,
}: {
  allPosts: SanityPostResponseType[];
  setFetchAllPostsAgain: React.Dispatch<React.SetStateAction<number>>;
  userData: SanityUserResponseType | null;
}) => {
  const { categoryName } = useParams();
  const categoryPosts = allPosts.filter(
    (post) => post.category === categoryName,
  );
  if (categoryPosts.length === 0)
    return (
      <div className="flex flex-col items-center gap-[20px] mt-[170px]">
        <p className="text-xl text-center">
          You currently have no posts of this category!
        </p>
        <Link
          to="/create-post"
          className="bg-[#ED7014] text-white py-2 px-3 rounded-md hover:bg-amber-700"
        >
          Create some posts
        </Link>
      </div>
    );
  return (
    <div>
      <MasonryLayout
        allPosts={categoryPosts}
        setFetchAllPostsAgain={setFetchAllPostsAgain}
        userData={userData}
      />
    </div>
  );
};

export default CategoryPage;
