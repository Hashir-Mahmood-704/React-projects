import { useState } from "react"
import { FaCartArrowDown } from "react-icons/fa6"
import { CiHeart } from "react-icons/ci"
import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react"
import { useSelector } from "react-redux"
import { ProductsInitialStateType, SanityProductResponceType } from "../types"
import { useParams } from "react-router-dom"

const Product = () => {
  const [selectedImage, setselectedImage] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const { allProducts, status } = useSelector(
    (store: { products: ProductsInitialStateType }) => store.products
  )
  const { id } = useParams()
  let productDetails: SanityProductResponceType | undefined = undefined
  if (allProducts) {
    productDetails = allProducts.find((item) => item._id === id)
  }
  if (status === "loading")
    return <div className="text-center text-4xl">Loading...</div>
  else if (status === "succeed" && !productDetails)
    return <div className="text-4xl text-center">Product data not found!</div>
  else if (status === "succeed" && productDetails)
    return (
      <div className="py-[20px] px-[15px] lg:px-[50px] flex gap-[150px] flex-col lg:flex-row">
        {/* left */}
        <div className="flex-[1] flex lg:flex-row flex-col-reverse gap-[20px]">
          {/* small images */}
          <div className="flex-[1] flex lg:flex-col ">
            <img
              src={productDetails.image1}
              alt="image"
              onClick={() => setselectedImage(1)}
              className="w-full h-[160px] sm:h-[260px] lg:h-[160px] object-cover cursor-pointer"
            />
            <img
              src={productDetails.image2}
              alt="image"
              onClick={() => setselectedImage(2)}
              className="w-full h-[160px] sm:h-[260px] lg:h-[160px] mt-[10px] object-cover cursor-pointer"
            />
          </div>

          {/* big image */}
          <div className="flex-[4]">
            <img
              src={
                selectedImage === 1
                  ? productDetails.image1
                  : productDetails.image2
              }
              alt="main-image"
              className="w-full max-h-[450px] sm:max-h-[550px] lg:h-[550px] object-cover"
            />
          </div>
        </div>

        {/* right */}
        <div className="flex-[1] flex flex-col gap-[30px] items-start">
          <h1 className="text-[28px] font-semibold">{productDetails.title}</h1>
          <span className="text-[25px] text-[#2879fe] font-semibold">
            ${productDetails.price}
          </span>
          <p className="text-[16px] text-justify">
            {productDetails.description}
          </p>

          {/* qunatity button */}
          <SignedIn>
            <div className="flex items-center gap-[15px]">
              <button
                className="h-[50px] w-[50px] flex justify-center items-center border-none bg-gray-300"
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                <span>-</span>
              </button>
              <span className="w-[20px] text-center">{quantity}</span>
              <button
                className="h-[50px] w-[50px] flex justify-center items-center border-none bg-gray-300"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <span>+</span>
              </button>
            </div>

            {/* add item button */}

            <button className="w-[200px] p-[10px] bg-[#2879fe] text-white flex items-center justify-center border-none gap-[15px]">
              <FaCartArrowDown size={20} />
              Add to Cart
            </button>

            {/* more buttons */}

            <div className="flex gap-[5px] items-center text-[#2879fe] text-[18px]">
              <CiHeart size={25} />
              Add to whishlist
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-white bg-[#2879fe] text-[16px] p-2 px-[20px] rounded-md">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    )
}

export default Product
