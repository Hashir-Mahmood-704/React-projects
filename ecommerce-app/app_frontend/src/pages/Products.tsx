import List from "../components/list"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"
import { ProductsInitialStateType, SanityProductResponceType } from "../types"

function filterProducts(
  products: SanityProductResponceType[],
  category: string,
  type: {
    showAll: boolean
    showShirts: boolean
    showPants: boolean
    showJackets: boolean
  },
  sort: "asc" | "desc" | null
): SanityProductResponceType[] {
  console.log("function called")
  let resProducts: SanityProductResponceType[] = []
  const filters: string[] = []
  if (category === "all") {
    if (
      type.showAll ||
      (!type.showAll &&
        !type.showJackets &&
        !type.showPants &&
        !type.showShirts)
    ) {
      resProducts = products
    } else {
      if (type.showJackets) filters.push("jacket")
      if (type.showShirts) filters.push("shirt")
      if (type.showPants) filters.push("pant")
      resProducts = products.filter((item) =>
        filters.includes(item.productType)
      )
    }
  } else if (category === "men") {
    if (
      type.showAll ||
      (!type.showAll &&
        !type.showJackets &&
        !type.showPants &&
        !type.showShirts)
    ) {
      resProducts = products.filter((item) => item.category === "men")
    } else {
      if (type.showJackets) filters.push("jacket")
      if (type.showPants) filters.push("pant")
      if (type.showShirts) filters.push("shirt")
      resProducts = products.filter(
        (item) => item.category === "men" && filters.includes(item.productType)
      )
    }
  } else if (category === "women") {
    if (
      type.showAll ||
      (!type.showAll &&
        !type.showJackets &&
        !type.showPants &&
        !type.showShirts)
    ) {
      resProducts = products.filter((item) => item.category === "women")
    } else {
      if (type.showJackets) filters.push("jacket")
      if (type.showPants) filters.push("pant")
      if (type.showShirts) filters.push("shirt")
      resProducts = products.filter(
        (item) =>
          item.category === "women" && filters.includes(item.productType)
      )
    }
  } else if (category === "kids") {
    if (
      type.showAll ||
      (!type.showAll &&
        !type.showJackets &&
        !type.showPants &&
        !type.showShirts)
    ) {
      resProducts = products.filter((item) => item.category === "kids")
    } else {
      if (type.showJackets) filters.push("jacket")
      if (type.showPants) filters.push("pant")
      if (type.showShirts) filters.push("shirt")
      resProducts = products.filter(
        (item) => item.category === "kids" && filters.includes(item.productType)
      )
    }
  }
  if (sort === "asc") {
    const sortedProducts = [...resProducts].sort(
      (a, b) => (a.price as unknown as number) - (b.price as unknown as number)
    )
    return sortedProducts
  } else if (sort === "desc") {
    const sortedProducts = [...resProducts].sort(
      (a, b) => (b.price as unknown as number) - (a.price as unknown as number)
    )
    return sortedProducts
  } else return resProducts
}

const Products = () => {
  const { category } = useParams()
  // const [maxValue, setMaxValue] = useState("1000")
  const [filter, setFilter] = useState({
    showAll: true,
    showShirts: false,
    showPants: false,
    showJackets: false,
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
      <div className="flex-[1] mb-[40px] lg:sticky top-[0px] h-fit ">
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
              value="shirts"
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
              value="pants"
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
              value="jackets"
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
        </div>

        {/* Slide section */}
        {/* <div className="mb-[30px]">
          <h2 className="font-semibold text-[18px] mb-[6px]">
            Filter by Price
          </h2>
          <div className="text-[16px] flex items-center gap-[5px]">
            <span>0</span>
            <input
              type="range"
              min={"0"}
              max={"1000"}
              onChange={(e) => setMaxValue(e.target.value)}
            />
            <span>{maxValue}</span>
          </div>
        </div> */}

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
      </div>

      {/* right */}
      <div className="flex-[3]">
        <img
          src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="image"
          className="w-full h-[320px] object-cover mb-[50px] hidden sm:block"
        />
        {status === "loading" && (
          <div className="text-5xl text-center">Loading...</div>
        )}
        {status === "succeed" && (
          <div>
            {productsData.length > 1 ? (
              <List products={productsData} />
            ) : (
              <p className="text-center">No such products available!</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
