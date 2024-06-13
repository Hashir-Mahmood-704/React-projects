import { IoIosCloseCircle } from "react-icons/io"
import { closeCart } from "../features/uiSlice"
import { useDispatch, useSelector } from "react-redux"
import { UserInitialStateType } from "../types"
import CartItem from "./cartItem"

const Cart = () => {
  const dispatch = useDispatch()
  const { userData, status } = useSelector(
    (store: { user: UserInitialStateType }) => store.user
  )
  let total: number = 0
  userData?.cart?.forEach((item) => {
    total = total + item.productQuantity * item.productPrice
  })

  return (
    <div className="max-h-[75vh] overflow-y-scroll flex flex-col flex-start gap-[20px] bg-white border border-black w-[280px]  sm:w-[400px] p-[12px] lg:p-[20px] relative">
      <div
        className="absolute right-[15px] top-[16px] lg:right-[18px] lg:top-[20px] w-fit cursor-pointer text-[20px] lg:text-[25px]"
        onClick={() => dispatch(closeCart())}
      >
        <IoIosCloseCircle />
      </div>
      {status === "succeed" &&
        userData &&
        (!userData.cart || userData.cart.length < 1) && (
          <div className="text-center text-[18px]">Your cart is empty!</div>
        )}
      {status === "succeed" &&
        userData &&
        userData.cart &&
        userData.cart.length > 0 && (
          <div>
            <h1 className="font-semibold text-[18px] lg:text-[20px]">
              Products in your cart
            </h1>
            {userData.cart.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}

            {/* total */}
            <div className="flex w-full justify-between gap-[10px] text-[#2879fe] font-bold lg:text-[18px]">
              <span>SUBTOTAL</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex flex-col items-start gap-[10px]">
              <button className="px-[8px] py-[4px] text-[16px] lg:text-[18px] lg:px-[10px] lg:py-[6px] bg-[#2879fe] text-white">
                Proceed to checkout
              </button>
              <span className="text-red-600 font-semibold text-[14px] cursor-pointer">
                Rest Card
              </span>
            </div>
          </div>
        )}
    </div>
  )
}

export default Cart
