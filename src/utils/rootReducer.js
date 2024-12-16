import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import formSlice from "./formSlice";
import kitchenSlice from "./kitchenSlice";
import customerSlice from "./CustomerSlice";

const appReducer = combineReducers({
    user: userReducer,
    form: formSlice,
    kitchen: kitchenSlice,
    customer: customerSlice,
});

// Root reducer to handle resetting state
const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        // Reset state to undefined, which resets all slices to their initial state
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
