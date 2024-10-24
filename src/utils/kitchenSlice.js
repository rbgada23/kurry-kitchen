import { createSlice } from "@reduxjs/toolkit";

const kitchenSlice = createSlice({
  name: "kitchen",
  initialState: {
    kitchenList : null,
    kitchenObj : null,
    kitchenMenuList : null
  },
  reducers: {
    addKitchenList: (state, action) => {
      state.kitchenList = action.payload;
    },
    addKitchen: (state, action) => {
      state.kitchenObj = action.payload;
    },
    addKitchenMenu: (state, action) => {
      state.kitchenMenuList = action.payload;
    }
  },
});

export const { addKitchenList,addKitchen,addKitchenMenu } = kitchenSlice.actions;

export default kitchenSlice.reducer;