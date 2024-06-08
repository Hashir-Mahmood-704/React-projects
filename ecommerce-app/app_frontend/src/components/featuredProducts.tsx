import { data } from "../data"
import ProductCard from "./productCard"

const FeaturedProducts = ({ type }: { type: string }) => {
  return (
    <div className="my-[30px] mx-[20px] lg:my-[80px] lg:mx-[80px]">
      {/* top */}
      <div className="flex flex-col text-center justify-between items-center">
        <h1 className="flex-[1] text-[18px] lg:text-[22px] 2xl:text-[26px] font-semibold">
          {type.toUpperCase()} Products
        </h1>
        <p className="flex-[2] text-gray-600 mt-[4px] text-[12px] 2xl:text-[18px] lg:text-[15px] text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Exercitationem reprehenderit commodi quas assumenda eaque sit. Numquam
          itaque sunt rem doloribus nesciunt voluptas voluptates enim quod, hic,
          nisi recusandae sed sint.
        </p>
      </div>

      {/* bottom */}
      <div className="flex flex-wrap justify-center gap-[20px] md:gap-[30px] lg:gap-[50px] mt-[20px] lg:mt-[50px]">
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default FeaturedProducts
