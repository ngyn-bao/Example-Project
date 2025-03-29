import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import nguoiDungSlice from "./slices/nguoiDungSlice.js";
import skillSlice from "./slices/skillSlice.js";

export const store = configureStore({
  reducer: { authSlice, nguoiDungSlice, skillSlice },
});
