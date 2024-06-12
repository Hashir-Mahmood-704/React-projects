import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { ProductsInitialStateType } from "../types"
import { sanityClient } from "../sanityClient"
import { allProductsQuery } from "../utils/sanityQueries"

const initialState: ProductsInitialStateType = {
  allProducts: null,
  targetProduct: null,
  status: "idle",
}

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const query = allProductsQuery
    const res = await sanityClient.fetch(query)
    return res
  }
)

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeed"
        state.allProducts = action.payload
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export default productsSlice.reducer
