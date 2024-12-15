import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import formSlice from "./formSlice";
import kitchenSlice from "./kitchenSlice";
import customerSlice from "./customerSlice";
import rootReducer from "./rootReducer";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        form: formSlice,
        kitchen: kitchenSlice,
        customer: customerSlice,
    },
    reducer: rootReducer,
});

export default appStore;