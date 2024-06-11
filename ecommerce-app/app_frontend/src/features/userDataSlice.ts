import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { sanityClient } from "../sanityClient"
import { UserInitialStateType } from "../types"

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

const initialState: UserInitialStateType = {
  userData: null,
  status: "idle",
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
  },
})

export default userSlice.reducer
