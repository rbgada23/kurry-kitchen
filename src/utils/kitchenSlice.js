import { createSlice } from "@reduxjs/toolkit";

const kitchenSlice = createSlice({
  name: "kitchen",
  initialState: {
    kitchenList : null,
  },
  reducers: {
    addKitchenList: (state, action) => {
      state.kitchenList = action.payload;
    }
  },
});

export const { addKitchenList } = kitchenSlice.actions;

export default kitchenSlice.reducer;