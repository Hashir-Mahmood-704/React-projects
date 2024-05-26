import React, { useState, useEffect } from "react";
import { sanityClient } from "../sanityClient.ts";
import { fetchAllPosts } from "../Utils/SanityQueries.ts";
import { Outlet } from "react-router-dom";
import { SanityPostResponseType } from "../Type.ts";
import Spinner from "../Components/Spinner.tsx";

const CommonDataSharedLayout = ({
  setAllPosts,
  fetchAllPostsAgain,
}: {
  setAllPosts: React.Dispatch<React.SetStateAction<SanityPostResponseType[]>>;
  fetchAllPostsAgain: number;
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    sanityClient
      .fetch(fetchAllPosts)
      .then((data) => {
        setLoading(false);
        setAllPosts(data);
      })
      .catch((err) => console.log("error in fetching posts\n", err));
  }, [fetchAllPostsAgain]);
  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-[200px]">
          <Spinner />
          <p className="text-2xl mt-4">Fetching posts...</p>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};
export default CommonDataSharedLayout;
