export type SanityUserResponseType = {
  username: string
  _id: string
  _type: string
}

export type UserInitialStateType = {
  status: "idle" | "loading" | "succeed" | "failed"
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
  price: string
  isNew: boolean
  image1: string
  image2: string
  title: string
  _id: string
  _type: string
  isFeatured: boolean
  oldPrice: string
  description: string
  category: string
  productType: string
}

export type ProductsInitialStateType = {
  allProducts: null | SanityProductResponceType[]
  targetProduct: null | SanityProductResponceType
  status: "idle" | "loading" | "succeed" | "failed"
}
