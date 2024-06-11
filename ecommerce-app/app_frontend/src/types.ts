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
