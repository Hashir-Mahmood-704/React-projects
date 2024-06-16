import List from "../components/list"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"
import { ProductsInitialStateType, SanityProductResponceType } from "../types"
import Spinner from "../components/spinner"
import { motion } from "framer-motion"

function filterProducts(
  products: SanityProductResponceType[],
  category: string,
  type: {
    showAll: boolean
    showShirts: boolean
    showPants: boolean
    showJackets: boolean
    showSuits: boolean
  },
  sort: "asc" | "desc" | null
): SanityProductResponceType[] {
  let resProducts: SanityProductResponceType[] = []
  const filters: string[] = []
  if (category === "all") {
    if (
      type.showAll ||
      (!type.showAll &&
        !type.showJackets &&
        !type.showSuits &&
        !type.showPants &&
        !type.showShirts)
    ) {
      resProducts = products
      // console.log(resProducts)
    } else {
      if (type.showJackets) filters.push("jacket")
      if (type.showShirts) filters.push("shirt")
      if (type.showPants) filters.push("pant")
      if (type.showSuits) filters.push("suit")
      console.log(filters)
      resProducts = products.filter((item) =>
        filters.includes(item.productType)
      )
      console.log(resProducts)
    }
  } else {
    if (
      type.showAll ||
      (!type.showAll &&
        !type.showJackets &&
        !type.showPants &&
        !type.showSuits &&
        !type.showShirts)
    ) {
      resProducts = products.filter((item) => item.category === category)
    } else {
      if (type.showJackets) filters.push("jacket")
      if (type.showShirts) filters.push("shirt")
      if (type.showPants) filters.push("pant")
      if (type.showSuits) filters.push("suit")
      resProducts = products.filter(
        (item) =>
          item.category === category && filters.includes(item.productType)
      )
    }
  }
  if (sort === "asc") {
    const sortedProducts = [...resProducts].sort((a, b) => a.price - b.price)
    return sortedProducts
  } else if (sort === "desc") {
    const sortedProducts = [...resProducts].sort((a, b) => b.price - a.price)
    return sortedProducts
  } else return resProducts
}

const Products = () => {
  const { category } = useParams()
  const [filter, setFilter] = useState({
    showAll: true,
    showShirts: false,
    showPants: false,
    showJackets: false,
    showSuits: false,
  })
  const [sort, setSort] = useState<"asc" | "desc" | null>(null)
  const { allProducts, status } = useSelector(
    (store: { products: ProductsInitialStateType }) => store.products
  )
  let productsData: SanityProductResponceType[] = []
  if (allProducts && category)
    productsData = filterProducts(allProducts, category, filter, sort)

  return (
    <div className="flex flex-col sm:flex-row px-[20px] lg:px-[50px] py-[30px]">
      {/* left */}
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex-[1] mb-[40px] lg:sticky top-[0px] h-fit "
      >
        {/* Checkboxes section */}
        <div className="mb-[30px] text-[16px]">
          <h2 className="font-semibold text-[18px] mb-[6px]">
            Product Categories
          </h2>
          <div className="mb-[3px] flex items-center gap-[6px]">
            <input
              className="w-[16px] h-[16px]"
              type="checkbox"
              name="check-1"
              // value="shirts"
              onClick={() =>
                setFilter({
                  ...filter,
                  showAll: false,
                  showShirts: !filter.showShirts,
                })
              }
            />
            <label htmlFor="check-1">Shirts</label>
          </div>
          <div className="mb-[3px] flex items-center gap-[6px]">
            <input
              className="w-[16px] h-[16px]"
              type="checkbox"
              name="check-2"
              // value="pants"
              onClick={() =>
                setFilter({
                  ...filter,
                  showAll: false,
                  showPants: !filter.showPants,
                })
              }
            />
            <label htmlFor="check-2">Pants</label>
          </div>
          <div className="mb-[3px] flex items-center gap-[6px]">
            <input
              className="w-[16px] h-[16px]"
              type="checkbox"
              name="check-3"
              // value="jackets"
              onClick={() =>
                setFilter({
                  ...filter,
                  showAll: false,
                  showJackets: !filter.showJackets,
                })
              }
            />
            <label htmlFor="check-3">Jackets</label>
          </div>
          <div className="mb-[3px] flex items-center gap-[6px]">
            <input
              className="w-[16px] h-[16px]"
              type="checkbox"
              name="check-2"
              // value="suits"
              onClick={() =>
                setFilter({
                  ...filter,
                  showAll: false,
                  showSuits: !filter.showSuits,
                })
              }
            />
            <label htmlFor="check-2">Suits</label>
          </div>
        </div>

        {/* Sortby section */}
        <div>
          <h2 className="font-semibold text-[18px] mb-[6px]">Sort By</h2>
          <div className="flex items-center gap-[5px]">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onClick={() => setSort("asc")}
              className="w-[16px] h-[16px]"
            />
            <label htmlFor="asc">Price (Lowest First)</label>
          </div>
          <div className="flex items-center gap-[5px]">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onClick={() => setSort("desc")}
              className="w-[16px] h-[16px]"
            />
            <label htmlFor="desc">Price (Highest First)</label>
          </div>
        </div>
      </motion.div>

      {/* right */}
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex-[3]"
      >
        <img
          src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="image"
          className="w-full h-[220px] object-cover mb-[50px] hidden sm:block"
        />
        {status === "loading" && (
          <div className="flex justify-center items-center py-[100px]">
            <Spinner height="100" width="100" />
          </div>
        )}
        {status === "succeed" && (
          <div>
            {productsData.length > 0 ? (
              <List products={productsData} />
            ) : (
              <p className="text-center">No such products available!</p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Products
