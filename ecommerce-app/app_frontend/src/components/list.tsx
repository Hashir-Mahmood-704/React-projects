import ProductCard from "./productCard"
import { SanityProductResponceType } from "../types"

const List = ({ products }: { products: SanityProductResponceType[] }) => {
  return (
    <div className="flex justify-center gap-[15px] sm:gap-[30px] flex-wrap">
      {products.map((item) => (
        <ProductCard key={item._id} item={item} />
      ))}
    </div>
  )
}

export default List
