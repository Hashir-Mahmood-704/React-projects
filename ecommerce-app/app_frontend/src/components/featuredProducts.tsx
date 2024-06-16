import { ProductsInitialStateType, SanityProductResponceType } from "../types"
import ProductCard from "./productCard"
import Spinner from "./spinner"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"

const FeaturedProducts = ({ type }: { type: "isFeatured" | "isTrending" }) => {
  const { allProducts, status } = useSelector(
    (store: { products: ProductsInitialStateType }) => store.products
  )
  let featuredProducts: SanityProductResponceType[] = []
  if (allProducts) {
    featuredProducts = allProducts
      .filter((item) => item[type] === true)
      .slice(0, 4)
  }
  return (
    <motion.div
      initial={{ x: 200, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="my-[30px] mx-[20px] lg:my-[80px] lg:mx-[80px]"
    >
      {/* top */}
      <div className="flex flex-col text-center justify-between items-center">
        <h1 className="flex-[1] text-[18px] lg:text-[22px] 2xl:text-[26px] font-semibold">
          {type === "isTrending" ? "Trending" : "Featured"} Products
        </h1>
        <p className="flex-[2] text-gray-600 mt-[4px] text-[12px] 2xl:text-[18px] lg:text-[15px] text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Exercitationem reprehenderit commodi quas assumenda eaque sit. Numquam
          itaque sunt rem doloribus nesciunt voluptas voluptates enim quod, hic,
          nisi recusandae sed sint.
        </p>
      </div>

      {/* bottom */}
      <div className="mt-[20px] lg:mt-[50px]">
        {status === "loading" ? (
          <div className="flex justify-center items-center my-[100px]">
            <Spinner height="100" width="100" />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-[20px] md:gap-[30px] lg:gap-[50px] ">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((item) => (
                <ProductCard key={item._id} item={item} />
              ))
            ) : (
              <div className="text-center">There are no featued products</div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default FeaturedProducts
