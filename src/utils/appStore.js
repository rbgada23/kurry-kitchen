import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import formSlice from "./formSlice";
import kitchenSlice from "./kitchenSlice";



const appStore = configureStore({
    reducer : {
        user : userReducer,
        form : formSlice,
        kitchen : kitchenSlice
    }
});

export default appStore;