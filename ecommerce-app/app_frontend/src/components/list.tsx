import { data } from "../data"
import ProductCard from "./productCard"

type Props = {
  categoryId: number
  maxPrice: string
  sort: string | null
}

const List = ({ categoryId, maxPrice, sort }: Props) => {
  return (
    <div className="flex justify-between flex-wrap">
      {data.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default List
