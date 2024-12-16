import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import formSlice from "./formSlice";
import kitchenSlice from "./kitchenSlice";
import customerSlice from "./CustomerSlice";
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