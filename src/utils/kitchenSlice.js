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
      action?.payload?.forEach(x=>{
        let index = current(state).kitchenMenuList?.findIndex((item) => item.name === x.name);
        if (index == -1 )
        state.kitchenMenuList.push(x)
      })
      
    }
  },
});

export const { addKitchenList, addKitchen, addKitchenMenu } =
  kitchenSlice.actions;

export default kitchenSlice.reducer;
