import { data } from "../data"
import { MdDelete } from "react-icons/md"
import { IoIosCloseCircle } from "react-icons/io"

const items = data
const Cart = ({
  setOpenCart,
}: {
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <div className="max-h-[75vh] overflow-y-scroll flex flex-col flex-start gap-[20px] bg-white border border-black w-[280px]  sm:w-[400px] p-[12px] lg:p-[20px] relative">
      <div
        className="absolute right-[15px] top-[16px] lg:right-[18px] lg:top-[20px] w-fit cursor-pointer text-[20px] lg:text-[25px]"
        onClick={() => setOpenCart(false)}
      >
        <IoIosCloseCircle />
      </div>
      <h1 className="font-semibold text-[18px] lg:text-[20px]">
        Products in your cart
      </h1>
      {items.map((item) => (
        <div key={item.id} className="flex justify-between border pr-[3px]">
          <div className="flex gap-[10px]">
            {/* image */}
            <img
              src={item.img}
              alt="image"
              className="w-[60px] h-[80px] lg:w-[80px] lg:h-full object-cover"
            />

            {/* details */}
            <div className="flex flex-col justify-between items-start text-gray-500 text-[14px] lg:text-[16px]">
              <h1 className="font-semibold mt-[2px]">{item.title}</h1>
              <p className="font-semibold -mt-[]">1 x ${item.price}</p>
            </div>
          </div>
          <MdDelete size={22} />
        </div>
      ))}

      {/* total */}
      <div className="flex w-full justify-between gap-[10px] text-[#2879fe] font-bold lg:text-[18px]">
        <span>SUBTOTAL</span>
        <span>$123</span>
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
  )
}

export default Cart
