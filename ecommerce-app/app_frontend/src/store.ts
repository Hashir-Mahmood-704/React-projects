import { configureStore } from "@reduxjs/toolkit"
import userDataReducer from "./features/userDataSlice"
import uiReducer from "./features/uiSlice"
import productsSlice from "./features/productsSlice"

export const store = configureStore({
  reducer: {
    user: userDataReducer,
    ui: uiReducer,
    products: productsSlice,
  },
})
