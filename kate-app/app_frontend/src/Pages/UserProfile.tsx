import { useParams } from "react-router-dom";
import { SanityPostResponseType, SanityUserResponseType } from "../Type.ts";
import bgImage from "../assets/social-media.jpg";
import { useEffect, useMemo, useState } from "react";
import MasonryLayout from "../Components/MasonryLayout.tsx";
import React from "react";
import { sanityClient } from "../sanityClient.ts";
import { userQuery } from "../Utils/SanityQueries.ts";

function filterPosts(
  option: "created" | "liked" | "saved",
  allPosts: SanityPostResponseType[],
  userId: string | undefined,
): SanityPostResponseType[] | [] {
  let posts: SanityPostResponseType[] = [];
  if (option === "liked") {
    posts = allPosts.filter(
      (post) =>
        post.like &&
        post.like.length > 0 &&
        post.like.filter((elem) => elem.referenceToUser._id === userId),
    );
  } else if (option === "saved") {
    posts = allPosts.filter(
      (post) =>
        post.save &&
        post.save.length > 0 &&
        post.save.filter((elem) => elem.referenceToUser._id === userId),
    );
  } else if (option === "created") {
    posts = allPosts.filter((post) => post.referenceToUser._id === userId);
  }
  return posts;
}

const UserProfile = ({
  allPosts,
  setFetchAllPostsAgain,
  userData,
}: {
  allPosts: SanityPostResponseType[];
  setFetchAllPostsAgain: React.Dispatch<React.SetStateAction<number>>;
  userData: SanityUserResponseType | null;
}) => {
  const [toDisplay, setToDisplay] = useState<"created" | "liked" | "saved">(
    "created",
  );
  const [userProfileData, setUserProfileData] =
    useState<SanityUserResponseType | null>();
  const { userId } = useParams();
  const posts = useMemo(
    () => filterPosts(toDisplay, allPosts, userId),
    [toDisplay, allPosts, userId],
  );

  useEffect(() => {
    if (userId) {
      const query: string = userQuery(userId);
      sanityClient
        .fetch(query)
        .then((doc) => setUserProfileData(doc[0]))
        .catch((err) =>
          console.log("Error in fetching user profile data\n", err),
        );
    }
  }, [userId]);
  return (
    <div className="flex flex-col items-center -mt-[25px]">
      <div className="flex flex-col items-center w-full md:w-[50%] 2xl:w-[65%]">
        <div className="w-full relative">
          <img src={bgImage} alt="image" className="w-full" />
          <div
            id="circle"
            className="absolute bottom-[-80px] left-1/2 -translate-x-[50%] bg-neutral-900 w-[120px] h-[120px] rounded-full flex flex-col items-center justify-center"
          >
            <img
              src={userProfileData?.image}
              alt="user-image"
              className="w-[50px] rounded-full"
            />
            <p>{userProfileData?.userName}</p>
          </div>
        </div>
        <div className="mt-[120px] w-full flex justify-center gap-[20px]">
          <button
            onClick={() => setToDisplay("created")}
            className={`${toDisplay === "created" ? "bg-[#ED7014] text-white" : "bg-neutral-900 text-[#ED7014]"} w-[100px] rounded-md py-2`}
          >
            Created
          </button>
          {userData && userData._id === userId && (
            <div className="flex gap-[20px]">
              <button
                onClick={() => setToDisplay("liked")}
                className={`${toDisplay === "liked" ? "bg-[#ED7014] text-white" : "bg-neutral-900 text-[#ED7014]"} w-[100px] rounded-md py-2`}
              >
                Liked
              </button>
              <button
                onClick={() => setToDisplay("saved")}
                className={`${toDisplay === "saved" ? "bg-[#ED7014] text-white" : "bg-neutral-900 text-[#ED7014]"} w-[100px] rounded-md py-2`}
              >
                Saved
              </button>
            </div>
          )}
        </div>
      </div>

      {/*posts section*/}
      {posts.length > 0 ? (
        <div className="w-full border border-dashed border-[#ED7014] px-4 pb-4 mt-[50px]">
          <MasonryLayout
            allPosts={posts}
            setFetchAllPostsAgain={setFetchAllPostsAgain}
            userData={userData}
          />
        </div>
      ) : (
        <p className="mt-[30px] font-semibold text-xl">
          This user has no {toDisplay} posts
        </p>
      )}
    </div>
  );
};

export default UserProfile;
