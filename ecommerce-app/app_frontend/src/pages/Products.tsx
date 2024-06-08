import List from "../components/list"
import { useParams } from "react-router-dom"
import { useState } from "react"

const Products = () => {
  const id = parseInt(useParams().id as string)
  const [maxValue, setMaxValue] = useState("1000")
  const [sort, setSort] = useState<string | null>(null)
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
              value={1}
            />
            <label htmlFor="check-1">Shoes</label>
          </div>
          <div className="mb-[3px] flex items-center gap-[6px]">
            <input
              className="w-[16px] h-[16px]"
              type="checkbox"
              name="check-2"
              value={2}
            />
            <label htmlFor="check-2">Skirts</label>
          </div>
          <div className="mb-[3px] flex items-center gap-[6px]">
            <input
              className="w-[16px] h-[16px]"
              type="checkbox"
              name="check-3"
              value={3}
            />
            <label htmlFor="check-3">Coats</label>
          </div>
        </div>

        {/* Slide section */}
        <div className="mb-[30px]">
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
        <img
          src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="image"
          className="w-full h-[320px] object-cover mb-[50px] hidden sm:block"
        />
        <List categoryId={id} maxPrice={maxValue} sort={sort} />
      </div>
    </div>
  )
}

export default Products
