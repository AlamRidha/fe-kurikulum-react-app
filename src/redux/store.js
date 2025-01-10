import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// check data when first created
// console.log("Oncreate store : ", store.getState());

// check data in store is change
// store.subscribe(() => {
//   console.log("Store change : ", store.getState());
// });

export default store;
