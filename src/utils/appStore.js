import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import formSlice from "./formSlice";



const appStore = configureStore({
    reducer : {
        user : userReducer,
        form : formSlice
    }
});

export default appStore;