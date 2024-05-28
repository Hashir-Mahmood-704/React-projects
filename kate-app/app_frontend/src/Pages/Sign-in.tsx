import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  useEffect(() => {
    if (isSignedIn) {
      navigate("/");
      return;
    }
  }, [isSignedIn]);
  return (
    <div className="flex justify-center items-center mt-[200px]">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-[#ED7014] hover:bg-amber-700 text-white p-3 rounded-md font-semibold text-xl">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <p className="font-semibold text-xl">You are already signed in!</p>
      </SignedIn>
    </div>
  );
};

export default SignIn;
