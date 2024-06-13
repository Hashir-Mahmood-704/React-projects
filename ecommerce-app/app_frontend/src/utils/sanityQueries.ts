export const sanityUserFetchingQuery = (id: string) =>
  `*[_type == "user" && _id == "${id}"]{_id, username, cart}`

export const allProductsQuery =
  '*[_type == "product"]{isNew, image1, image2, title, _id, isFeatured, oldPrice, _type, isTrending, description, price, productType, category}'
