import { MdDelete } from "react-icons/md"
import { removeItem, updateItemQuantity } from "../features/userDataSlice"
import { useDispatch, useSelector } from "react-redux"
import { UserInitialStateType } from "../types"
import { sanityImageBuilder } from "../sanityClient"
import { useState } from "react"
type Props = {
  item: {
    productTitle: string
    productQuantity: number
    productImage: string
    productId: string
    productPrice: number
  }
}
const CartItem = ({ item }: Props) => {
  const dispatch = useDispatch()
  const { userData } = useSelector(
    (store: { user: UserInitialStateType }) => store.user
  )
  const [loading, setLoading] = useState(false)
  function updateQuantity(operation: "inc" | "dec") {
    if (userData) {
      dispatch(
        // @ts-ignore
        updateItemQuantity({
          operation: operation,
          productId: item.productId,
          userId: userData._id,
          setLoading: setLoading,
        })
      )
    }
  }
  return (
    <div
      key={item.productId}
      className={`relative mb-[10px] bg-gray-100 rounded-md overflow-hidden ${
        loading ? "opacity-[0.5] pointer-events-none" : "opacity-[1]"
      }`}
    >
      <div className="flex gap-[10px] w-full">
        {/* image */}
        <img
          src={sanityImageBuilder(item.productImage).url()}
          alt="image"
          className="w-[60px] h-[100px] lg:w-[80px]  object-cover"
        />

        {/* details */}
        <div className="w-full flex flex-col justify-between items-start text-gray-500 text-[14px] lg:text-[14px]">
          <h1 className="font-semibold mt-[2px]">{item.productTitle}</h1>
          <div className="flex justify-between w-full items-center mb-[7px]">
            <p className="font-semibold">${item.productPrice}</p>
            <div className="flex gap-[10px] items-center mr-[8px]">
              <span
                onClick={() => {
                  if (item.productQuantity > 1) updateQuantity("dec")
                }}
                className="rounded-full bg-gray-300  h-[25px] w-[25px] flex justify-center items-center cursor-pointer"
              >
                -
              </span>
              <span className="w-[20px] text-center font-bold">
                {item.productQuantity}
              </span>
              <span
                onClick={() => updateQuantity("inc")}
                className="rounded-full bg-gray-300  h-[25px] w-[25px] flex justify-center items-center cursor-pointer"
              >
                +
              </span>
            </div>
          </div>
        </div>
      </div>

      {userData && (
        <span
          className="absolute top-[3px] right-[4px] cursor-pointer"
          onClick={() =>
            dispatch(
              // @ts-ignore
              removeItem({
                userId: userData._id,
                productId: item.productId,
                setLoading: setLoading,
              })
            )
          }
        >
          <MdDelete size={22} />
        </span>
      )}
    </div>
  )
}

export default CartItem
