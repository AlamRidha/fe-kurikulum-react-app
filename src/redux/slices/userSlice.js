import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.status = true;
    },
    logoutUser: (state, action) => {
      state.user = null;
      state.status = false;
    },
  },
});

// export for function/ actions
export const { loginUser, logoutUser } = userSlice.actions;

// get user data from store
export const userSelect = (state) => state.user.user;

// export for reducer
export default userSlice.reducer;
