import List from "../components/list"
import { useState } from "react"
import { useSelector } from "react-redux"
import { ProductsInitialStateType, SanityProductResponceType } from "../types"
import Spinner from "../components/spinner"

function filterProducts(
  products: SanityProductResponceType[],
  searchText: string,
  type: {
    showAll: boolean
    showShirts: boolean
    showPants: boolean
    showJackets: boolean
  },
  sort: "asc" | "desc" | null
): SanityProductResponceType[] {
  let resProducts: SanityProductResponceType[] = []
  const filters: string[] = []
  if (!searchText) {
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
      if (filters.length > 0) {
        resProducts = products.filter((item) =>
          filters.includes(item.productType)
        )
      }
    }
  } else {
    if (
      type.showAll ||
      (!type.showAll &&
        !type.showJackets &&
        !type.showPants &&
        !type.showShirts)
    ) {
      resProducts = products.filter((item) => {
        return (
          item.title.toLowerCase().includes(searchText.toLowerCase()) ||
          item.productType.toLowerCase().includes(searchText.toLowerCase()) ||
          item.category.toLowerCase().includes(searchText.toLowerCase())
        )
      })
    } else {
      if (type.showJackets) filters.push("jacket")
      if (type.showShirts) filters.push("shirt")
      if (type.showPants) filters.push("pant")
      if (filters.length > 0) {
        resProducts = products.filter(
          (item) =>
            (filters.includes(item.productType) &&
              item.title.toLowerCase().includes(searchText.toLowerCase())) ||
            item.productType.toLowerCase().includes(searchText.toLowerCase()) ||
            item.category.toLowerCase().includes(searchText.toLowerCase())
        )
      }
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
  } else {
    return resProducts
  }
}

const Products = () => {
  const [searchText, setSearchText] = useState("")
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
  if (allProducts) {
    productsData = filterProducts(allProducts, searchText, filter, sort)
  }

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
        {/* search */}
        <div className="flex justify-center mb-[50px]">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            type="text"
            className="w-full md:w-[70%] p-2 outline-none border border-gray-700 rounded-sm"
            placeholder="Search"
          />
        </div>
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
      </div>
    </div>
  )
}

export default Products
