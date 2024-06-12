import { Link } from "react-router-dom"
import { SanityProductResponceType } from "../types"

const ProductCard = ({ item }: { item: SanityProductResponceType }) => {
  return (
    <Link to={`/product/${item._id}`}>
      <div className="w-[160px] lg:w-[220px] 2xl:w-[280px] flex flex-col gap-[8px] mb-[35px]">
        {/* image */}
        <div className="w-full h-[220px] lg:h-[320px] 2xl:h-[400px] overflow-hidden relative group">
          {item.isNew && (
            <span className="text-[12px] lg:text-[16px] top-[10px] left-[10px] z-30 absolute text-teal-600 bg-white px-[8px] py-[2px] rounded-md lg:px-[5px] lg:py-[3px]">
              New Season
            </span>
          )}
          <img
            src={item.image1}
            alt="product-img"
            className=" object-cover w-full h-full absolute z-10"
          />
          <img
            src={item.image2}
            alt="product-img"
            className="object-cover w-full h-full absolute group-hover:z-20"
          />
        </div>

        {/* title */}
        <h2 className="text-[14px] lg:text-[18px] font-bold ">{item.title}</h2>
        {/* prices */}
        <div className="flex gap-[10px] lg:gap-[20px] text-[14px] lg:text-[16px] -mt-[5px]">
          <h3 className="line-through text-gray-500">${item.oldPrice}</h3>
          <h3 className="font-semibold">${item.price}</h3>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
