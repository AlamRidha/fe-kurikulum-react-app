import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import kurikulumReducer from "./slices/kurikulumSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    kurikulum: kurikulumReducer,
  },
});

// check data when first created
// console.log("Oncreate store : ", store.getState());

// check data in store is change
// store.subscribe(() => {
//   console.log("Store change : ", store.getState());
// });

export default store;
