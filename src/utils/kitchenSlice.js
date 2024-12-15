import { createSlice, current } from "@reduxjs/toolkit";

const kitchenSlice = createSlice({
  name: "kitchen",
  initialState: {
    kitchenList: null,
    kitchenObj: null,
    kitchenMenuList: [],
  },
  reducers: {
    addKitchenList: (state, action) => {
      state.kitchenList = action.payload;
    },
    addKitchen: (state, action) => {
      state.kitchenObj = action.payload;
    },
    addKitchenMenu: (state, action) => {
      action?.payload?.forEach(x => {
        let index = current(state).kitchenMenuList?.findIndex((item) => item.name === x.name);
        if (index == -1)
          state.kitchenMenuList.push(x)
      })

    },
     // New Reducer to remove an item
     removeKitchenMenu: (state, action) => {
      state.kitchenMenuList = state.kitchenMenuList.filter(
        (item) => item._id !== action.payload._id
      );
    },
  },
});

export const { addKitchenList, addKitchen, addKitchenMenu,removeKitchenMenu } =
  kitchenSlice.actions;

export default kitchenSlice.reducer;
