import { SanityPostResponseType } from "../Type"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import MasonryLayout from "../Components/MasonryLayout"
import React from "react";

const CategoryPage = ({
  allPosts,
  setFetchAllPostsAgain,
}: {
  allPosts: SanityPostResponseType[]
  setFetchAllPostsAgain: React.Dispatch<React.SetStateAction<number>>
}) => {
  const { categoryName } = useParams()
  const categoryPosts = allPosts.filter(
    (post) => post.category === categoryName
  )
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
    )
  else if (categoryPosts.length === 0)
    return (
      <div className="flex flex-col items-center gap-[20px] mt-[250px]  md:mt-[100px]">
        <p className="text-xl text-center">
          You currently have no posts of this category!
        </p>
        <Link
          to="/create-post"
          className="bg-[#ED7014] text-white py-2 px-3 rounded-md"
        >
          Create some posts
        </Link>
      </div>
    )
  return (
    <div>
      <MasonryLayout
        allPosts={categoryPosts}
        setFetchAllPostsAgain={setFetchAllPostsAgain}
      />
    </div>
  )
}

export default CategoryPage
