import { createSlice } from "@reduxjs/toolkit"
import { UiInitialStateType } from "../types"

const initialState: UiInitialStateType = {
  viewSidebar: false,
  viewOptions: false,
  viewCart: false,
}

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    openSidebar: (state) => {
      state.viewSidebar = true
    },
    closeSidebar: (state) => {
      state.viewSidebar = false
    },
    openCart: (state) => {
      state.viewCart = true
    },
    closeCart: (state) => {
      state.viewCart = false
    },
  },
})

export default uiSlice.reducer
export const { openCart, closeCart, closeSidebar, openSidebar } =
  uiSlice.actions
