export const sanityUserFetchingQuery = (id: string) =>
  `*[_type == "user" && _id == "${id}"]{_id, username}`
