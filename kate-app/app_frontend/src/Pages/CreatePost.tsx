import { useUser, SignInButton } from "@clerk/clerk-react"
import { IoCloudUpload } from "react-icons/io5"
import { useState } from "react"
import { sanityClient } from "../sanityClient"
import { SanityImageAssetDocument } from "@sanity/client"
import Spinner from "../Components/Spinner"
import { useNavigate } from "react-router-dom"
import { MdDelete } from "react-icons/md"
import { categories } from "../Utils/data"

const CreatePost = () => {
  const [fieldError, setFieldError] = useState(false)
  const [title, setTitle] = useState("")
  const [about, setAbout] = useState("")
  const [category, setCategory] = useState("other")
  const [wrongImageType, setWrongImageType] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageAsset, setImageAsset] = useState<SanityImageAssetDocument | null>(
    null
  )
  const navigate = useNavigate()
  const { isSignedIn, user } = useUser()
  function uploadImage(e: any) {
    const selectedFile = e.target.files[0]
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setWrongImageType(false)
      setLoading(true)
      sanityClient.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          setImageAsset(document)
          setLoading(false)
        })
        .catch((err) => console.log("error in upload image", err))
    } else {
      setWrongImageType(true)

      setTimeout(() => {
        setWrongImageType(false)
      }, 2000)
    }
  }
  function uploadPost() {
    if (!title || !about || !category || !imageAsset?._id) {
      setFieldError(true)
      setTimeout(() => {
        setFieldError(false)
      }, 2000)
      return
    }
    setLoading(true)
    const newPostDocument = {
      _type: "post",
      title: title,
      about: about,
      category: category,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      },
      userId: user?.id,
      referenceToUser: {
        _type: "referenceToUser",
        _ref: user?.id,
      },
    }
    console.log(newPostDocument)
    sanityClient
      .create(newPostDocument)
      .then(() => {
        setLoading(false)
        navigate("/")
      })
      .catch((err) => console.log("error in post creation\n", err))
  }
  return (
    <div className="flex justify-center items-center">
      {!isSignedIn ? (
        <div className="flex flex-col items-center gap-[40px]">
          <p className="text-xl font-medium mt-[150px]">
            You need to sign-in first
          </p>
          <SignInButton mode="modal">
            <button className="text-white bg-[#ED7014] py-2 px-3 rounded-md text-sm">
              Sign in
            </button>
          </SignInButton>
        </div>
      ) : (
        <div className="flex items-center flex-col gap-[40px] ">
          <h1 className="text-2xl font-semibold mt-[50px]">Create new post</h1>
          <div className="bg-neutral-900 flex p-3 rounded-lg  w-[300px] h-[545px]  lg:h-[310px] lg:w-[720px]">
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-[30px]">
                <div className="w-[280px] lg:w-[380px]">
                  {!imageAsset ? (
                    <label className="p-2 flex flex-col justify-center items-center border border-dashed border-[#ED7014] w-full h-full">
                      <input
                        type="file"
                        className="w-0 h-0"
                        onChange={uploadImage}
                      />
                      <IoCloudUpload size={35} />
                      <p className="mt-2">Click to upload</p>
                      <p className="text-white/60 text-sm mt-[60px] text-center">
                        Upload JPG, SVG, JPEG, <br /> PNG less then 20MB
                      </p>
                    </label>
                  ) : (
                    <div className="w-full h-full">
                      <img
                        src={imageAsset.url}
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute bottom-[20px] right-[16px] p-3 rounded-full bg-neutral-900 border-2 border-[#ED7014] text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                        onClick={() => setImageAsset(null)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="title"
                    className="bg-black py-2 px-3 rounded-md outline-none w-[280px]"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    name="title"
                    className="bg-black py-2 px-3 rounded-md outline-none w-[280px]"
                    placeholder="What is this post about?"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                  <div>
                    <label>Select category:</label>
                    <br />
                    <select
                      name="category"
                      className="bg-black p-1 w-[70%] mt-2 outline-none border-none"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="other">other</option>
                      {categories
                        .slice(0, categories.length - 1)
                        .map((item, index) => (
                          <option
                            className="text-sm"
                            key={index}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="md:mt-3">
                    <p>Your info:</p>
                    <div className="mt-2 flex items-center gap-2">
                      <img
                        src={user.imageUrl}
                        alt="user-image"
                        className="w-[40px] rounded-full"
                      />
                      <p className="text-white">{user.fullName}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-6">
            {!loading && (
              <button
                onClick={uploadPost}
                className="bg-[#ED7014] text-white rounded-full py-2 px-4"
              >
                Upload Post
              </button>
            )}
            {wrongImageType && (
              <p className="font-semibold text-red-600 text-xl">
                Wrong file type, upload image only!
              </p>
            )}
            {fieldError && (
              <p className="font-semibold text-red-600 text-xl">
                All fields must be filled!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CreatePost
