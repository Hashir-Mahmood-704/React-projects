import { Outlet } from "react-router-dom";
import MobileNavbar from "../Components/MobileNavbar.tsx";
import DesktopSidebar from "../Components/DesktopSidebar.tsx";
import DesktopNavbar from "../Components/DesktopNavbar.tsx";
import React, { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { sanityClient } from "../sanityClient.ts";

const SharedLayout = ({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  useEffect(() => {
    if (isSignedIn && user) {
      // console.log("signed in, sending request")
      const newUserDocument = {
        _id: user.id,
        _type: "user",
        userName: user.fullName,
        image: user.imageUrl,
      };
      sanityClient
        .createIfNotExists(newUserDocument)
        .then(() => {
          // console.log("successfully created new user\n")
        })
        .catch((err) => console.log("error occurred\n", err));
    } else console.log("not signed in, not sending req");
  }, [isSignedIn]);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Mobile SharedLayout */}
      <div className="flex md:hidden">
        <div className="h-[60px]" />
        <MobileNavbar searchText={searchText} setSearchText={setSearchText} />
      </div>
      {/* Desktop SharedLayout */}
      <div className="hidden md:flex">
        {/* <div className="min-w-[250px] 2xl:min-w-[300px]" /> */}
        <div className="fixed">
          <DesktopSidebar />
        </div>
      </div>

      <div className="w-full">
        <div className="hidden md:block">
          <div className="left-[250px] 2xl:left-[300px] right-0 z-50 fixed">
            <DesktopNavbar
              searchText={searchText}
              setSearchText={setSearchText}
            />
          </div>
        </div>

        <div className="p-4 mt-[55px] md:ml-[250px] 2xl:ml-[300px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SharedLayout;
