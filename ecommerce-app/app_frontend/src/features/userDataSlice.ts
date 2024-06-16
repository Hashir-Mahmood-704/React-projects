import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { sanityClient } from "../sanityClient"
import { UserInitialStateType, CartType } from "../types"

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async ({ id, username }: { id: string; username: string }) => {
    const newUserDoc = {
      _type: "user",
      _id: id,
      username: username,
    }
    const res = await sanityClient.createIfNotExists(newUserDoc)
    return res
  }
)

export const addProductToCart = createAsyncThunk(
  "user/addProductToCart",
  async ({
    _key,
    userId,
    productId,
    productTitle,
    productImage,
    productQuantity,
    productPrice,
  }: {
    _key: string
    userId: string
    productId: string
    productImage: string
    productQuantity: number
    productTitle: string
    productPrice: number
  }) => {
    const userData = await sanityClient.getDocument(userId)
    // @ts-ignore
    const cart: CartType = userData.cart || []
    const itemIndex = cart.findIndex((item) => item.productId === productId)
    if (itemIndex === -1) {
      // item does not exists
      try {
        const res = await sanityClient
          .patch(userId)
          .setIfMissing({ cart: [] })
          .insert("before", "cart[-1]", [
            {
              _key,
              productId,
              productImage,
              productQuantity,
              productTitle,
              productPrice,
            },
          ])
          .commit()
        return res
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        console.log("Item already exists, updating quantity")
        // @ts-ignore
        const updatedItem = userData.cart[itemIndex]
        updatedItem.productQuantity =
          updatedItem.productQuantity + productQuantity
        const res = await sanityClient
          .patch(userId)
          .set({ [`cart[${itemIndex}]`]: updatedItem })
          .commit()
        return res
      } catch (error) {
        console.log(error)
      }
    }
  }
)

export const removeItem = createAsyncThunk(
  "user/removeItem",
  async ({
    userId,
    productId,
    setLoading,
  }: {
    userId: string
    productId: string
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  }) => {
    setLoading(true)
    const userData = await sanityClient.getDocument(userId)
    // @ts-ignore
    const cart: CartType = userData.cart
    const targetProductIndex = cart.findIndex(
      (item) => item.productId === productId
    )
    const res = await sanityClient
      .patch(userId)
      .unset([`cart[${targetProductIndex}]`])
      .commit()
    setLoading(false)
    // console.log(res)
    return res
  }
)

export const updateItemQuantity = createAsyncThunk(
  "user/updateItemQuantity",
  async ({
    operation,
    productId,
    userId,
    setLoading,
  }: {
    operation: "dec" | "inc"
    userId: string
    productId: string
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  }) => {
    setLoading(true)
    const userData = await sanityClient.getDocument(userId)
    // @ts-ignore
    const cart: CartType = userData.cart
    const itemIndex = cart.findIndex((item) => item.productId === productId)
    const targetProduct = cart[itemIndex]
    targetProduct.productQuantity = targetProduct.productQuantity + 1
    try {
      if (operation === "inc") {
        const res = await sanityClient
          .patch(userId)
          .inc({ [`cart[${itemIndex}].productQuantity`]: 1 })
          .commit()
        // console.log(res)
        setLoading(false)
        return res
      } else {
        const res = await sanityClient
          .patch(userId)
          .dec({ [`cart[${itemIndex}].productQuantity`]: 1 })
          .commit()
        // console.log(res)
        setLoading(false)
        return res
      }
    } catch (error) {
      console.log(error)
    }
  }
)

export const resetCart = createAsyncThunk(
  "user/resetCart",
  async ({ userId }: { userId: string }) => {
    try {
      const res = await sanityClient.patch(userId).set({ cart: [] }).commit()
      return res
    } catch (error) {
      console.log(error)
    }
  }
)

export const initialState: UserInitialStateType = {
  userData: null,
  status: "idle",
  cartStatus: "idle",
  cartItemStatus: "idle",
  error: false,
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeed"
        state.userData = action.payload
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.status = "failed"
        state.error = true
      })
      .addCase(addProductToCart.pending, (state) => {
        state.cartStatus = "loading"
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.cartStatus = "succeed"
        // @ts-ignore
        state.userData = action.payload
      })
      .addCase(addProductToCart.rejected, (state) => {
        state.cartStatus = "failed"
      })
      .addCase(removeItem.pending, (state) => {
        state.cartItemStatus = "loading"
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.cartItemStatus = "succeed"
        // @ts-ignore
        state.userData = action.payload
      })
      .addCase(removeItem.rejected, (state) => {
        state.cartItemStatus = "failed"
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        // @ts-ignore
        state.userData = action.payload
      })
      .addCase(resetCart.fulfilled, (state, action) => {
        // @ts-ignore
        state.userData = action.payload
      })
  },
})

export default userSlice.reducer
