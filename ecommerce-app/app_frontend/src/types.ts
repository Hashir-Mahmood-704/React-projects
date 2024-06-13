export type CartType = {
  productTitle: string
  productQuantity: number
  productImage: string
  productId: string
  productPrice: number
}[]

export type SanityUserResponseType = {
  username: string
  _id: string
  _type: string
  cart?: CartType
}

export type UserInitialStateType = {
  status: "idle" | "loading" | "succeed" | "failed"
  cartStatus: "idle" | "loading" | "succeed" | "failed"
  cartItemStatus: "idle" | "loading" | "succeed" | "failed"
  error: boolean
  userData: null | SanityUserResponseType
}

export type UiInitialStateType = {
  viewSidebar: boolean
  viewOptions: boolean
  viewCart: boolean
}

export type SanityProductResponceType = {
  isTrending: boolean
  price: number
  isNew: boolean
  image1: string
  image2: string
  title: string
  _id: string
  _type: string
  isFeatured: boolean
  oldPrice: number
  description: string
  category: string
  productType: string
}

export type ProductsInitialStateType = {
  allProducts: null | SanityProductResponceType[]
  targetProduct: null | SanityProductResponceType
  status: "idle" | "loading" | "succeed" | "failed"
}
