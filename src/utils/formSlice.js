import { createSlice } from "@reduxjs/toolkit";
import { CUSTOMER } from "./constants";

const formSlice = createSlice({
  name: "loginForm",
  initialState: {
    isSellerForm : CUSTOMER
  },
  reducers: {
    toogleFormSelection: (state,action) => {
      state.isSellerForm = action.payload;
    }
  },
});

export const { toogleFormSelection } = formSlice.actions;

export default formSlice.reducer;

